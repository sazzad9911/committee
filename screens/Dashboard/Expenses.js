import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { get } from "../../apis/multipleApi";
import ExpensesCart from "../../components/cart/ExpesesCart";
import Button from "../../components/main/Button";
import FloatingButton from "../../components/main/FloatingButton";
import NoOption from "../../components/main/NoOption";
import loader from "../../data/loader";
import { setScrollValue } from "../../data/setScrollValue";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";

export default function Expenses({ navigation,route }) {
  const ref = useRef();
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.isDark);
  const user = useSelector((state) => state.user);
  const comity = useSelector((state) => state.comity);
  const isBn = useSelector((state) => state.isBn);
  const values = new AppValues(isBn);
  const headlines = values.getDashboardHeadlines();
  const colors = new AppColors(isDark);
  const textColor = colors.getTextColor();
  const borderColor = colors.getBorderColor();
  const backgroundColor = colors.getBackgroundColor();
  const [data, setData] = useState();
  const isFocus = useIsFocused();
  const expenseDateSort = useSelector((state) => state.expenseDateSort);

  React.useEffect(() => {
    !data && dispatch(loader.show());
    const fetch = async () => {
      const res = await get(`/comity/expense/get/${comity.id}`, user.token);
      //console.log(res.data.expenses);
      dispatch(loader.hide());
      //console.log(sortDate);
      //setData([])
      setData(res.data.expenses);
      expenseDateSort&&setData(res.data.expenses.filter(exp => new Date(exp.date)>new Date(expenseDateSort)));
    };
    fetch();
  }, [isFocus,expenseDateSort]);
 
  return (
    <View style={{ flex: 1, backgroundColor: colors.getBackgroundColor() }}>
      <ScrollView scrollEventThrottle={16}>
        <View style={[mainStyle.pdH20, mainStyle.flexBox,data?.length===0&&{justifyContent:"center"}]}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "800",
              color: textColor,
              marginTop: 20,
              marginBottom: 14,
            }}>
            {headlines._latestExpenses}
          </Text>
          {data?.length!=0&&(<Button
            onPress={() => navigation?.navigate("AllExpenses")}
            style={{
              borderWidth: 0,
            }}
            Icon={() => <SvgXml xml={right}></SvgXml>}
            title={headlines._more}
          />)}
        </View>
        {data?.slice(0, 5).map((doc, i) => (
          <ExpensesCart
            key={i}
            isDark={isDark}
            textColor={textColor}
            borderColor={borderColor}
            data={doc}
            navigation={navigation}
          />
        ))}
        {data?.length == 0 && <NoOption title={isBn?"এখন পর্যন্ত কোন খরচের তালিকা যোগ করা হয়নি":"No expenses added"} />}

        <View style={{ height: 90 }} />
      </ScrollView>
      <FloatingButton onPress={() => navigation.navigate("AddExpenses")} />
    </View>
  );
}
const right = `<svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.991541 10.5649L0.992658 10.5658C1.14848 10.6946 1.33984 10.75 1.52179 10.75C1.71073 10.75 1.8968 10.6849 2.04436 10.5711L2.04444 10.5712L2.05093 10.5658L6.59914 6.80668C6.59945 6.80643 6.59976 6.80618 6.60007 6.80592C7.01573 6.46858 7.25 6.0018 7.25 5.49928C7.25 4.99427 7.00668 4.5287 6.60098 4.19338L2.05093 0.43275C1.75611 0.189083 1.28747 0.189083 0.992658 0.43275L0.992655 0.432746L0.991541 0.433678C0.844379 0.556753 0.75 0.734022 0.75 0.931146C0.75 1.12827 0.844379 1.30554 0.991541 1.42862L0.991538 1.42862L0.992658 1.42954L5.54271 5.19018C5.65725 5.28484 5.70321 5.39781 5.70321 5.49928C5.70321 5.60075 5.65725 5.71371 5.54271 5.80838L0.992658 9.56901L0.992655 9.56901L0.991541 9.56994C0.84438 9.69302 0.75 9.87029 0.75 10.0674C0.75 10.2645 0.844379 10.4418 0.991541 10.5649Z" fill="#A3A3A3" stroke="#A3A3A3" stroke-width="0.5"/>
</svg>
`;
