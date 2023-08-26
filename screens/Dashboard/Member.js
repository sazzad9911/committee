import { useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native";
import { Menu } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { deletes, get } from "../../apis/multipleApi";
import MemberCard from "../../components/cart/MemberCard";
import Button from "../../components/main/Button";
import FloatingButton from "../../components/main/FloatingButton";
import Input from "../../components/main/Input";
import NoOption from "../../components/main/NoOption";
import loader from "../../data/loader";
import toast from "../../data/toast";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import HidableHeaderLayout from "../../layouts/HidableHeaderLayout";
import mainStyle from "../../styles/mainStyle";
const { width, height } = Dimensions.get("window");

export default function Member({ navigation, route }) {
  const isDark = useSelector((state) => state.isDark);
  const inset = useSafeAreaInsets();
  const colors = new AppColors(isDark);
  const textColor = colors.getTextColor();
  const backgroudColor = colors.getBackgroundColor();
  const isBn = useSelector((state) => state.isBn);
  const values = new AppValues(isBn);
  const searchText = values.getSearch();
  const comityListText = values.getHeadLines();
  const { comity, user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [allMember, setAllMember] = useState();
  const [sortedMember, setSortedMember] = useState();
  const [searchIp, setSearch] = useState("");
  const isFocused = useIsFocused();
  //console.log(comity.id);

  useEffect(() => {
    getMember();
  }, [isFocused]);
  const getMember = async () => {
    dispatch(loader.show());
    const res = await get(`/member/get-all/${comity.id}`, user.token);
    setAllMember(res.data.members);
    dispatch(loader.hide());
  };
  useEffect(() => {
    if (allMember) {
      setSortedMember(
        allMember.filter(
          (member) =>
            member.name?.toUpperCase().includes(searchIp?.toUpperCase()) ||
            member?.user?.name?.toUpperCase().includes(searchIp?.toUpperCase())
        )
      );
    }
  }, [allMember, searchIp]);

  return (
    <HidableHeaderLayout
      header={<Header searchIp={searchIp} setSearch={setSearch} />}
      component={
        <View>
          {sortedMember?.map((doc, i) => (
            <MemberCard
              //onPress={() => navigation?.navigate("AddMember")}
              onProfile={() =>
                navigation?.navigate("UserProfile", { data: doc })
              }
              onAdd={async () => {
                dispatch(loader.show());
                try {
                  await deletes(`/member/delete/${doc.id}`, user.token);
                  dispatch(loader.hide());
                  dispatch(toast.success("Member deleted"));
                  getMember()
                } catch (e) {
                  dispatch(loader.hide());
                  dispatch(toast.error("Request failed"));
                  console.error(e);
                }
              }}
              requested={doc.status === "Pending" ? true : false}
              accepted={doc.status != "Pending" ? true : false}
              key={i}
              name={doc.user ? doc.user.name : doc.name}
              url={doc.user ? doc.user.profilePhoto : doc.profilePhoto}
              borderColor={colors.getShadowColor()}
              backgroundColor={colors.getBackgroundColor()}
              textColor={colors.getTextColor()}
            />
          ))}
          {sortedMember?.length == 0 && (
            <NoOption title={"Ops!"} subTitle={"Member not found"} />
          )}
        </View>
      }
      bottom={
        <FloatingButton
          onPress={() => navigation.navigate("SelectMemberType")}
        />
      }
    />
  );
}
const Header = ({ searchIp, setSearch }) => {
  const ac = ["#1488CC", "#2B32B2"];
  const dc = ["#000", "#000"];
  const isDark = useSelector((state) => state.isDark);
  const inset = useSafeAreaInsets();
  const colors = new AppColors(isDark);
  const textColor = colors.getTextColor();
  const backgroudColor = colors.getBackgroundColor();
  const isBn = useSelector((state) => state.isBn);
  const values = new AppValues(isBn);
  const searchText = values.getSearch();
  const comityListText = values.getHeadLines();

  const search = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.11036 0.0408841C5.04858 0.326439 2.23492 2.29256 0.900663 5.06853C-0.124611 7.19849 -0.279105 9.62805 0.460591 11.8563C1.92126 16.2473 6.44838 18.8033 10.9849 17.7968C12.1834 17.53 13.3631 17.001 14.3088 16.3035L14.6084 16.0835L16.4858 17.956C17.5157 18.9858 18.438 19.8659 18.527 19.9127C18.7376 20.0251 19.2432 20.0298 19.4399 19.9221C19.6225 19.8238 19.8238 19.6225 19.9221 19.4399C20.0298 19.2433 20.0251 18.7377 19.9127 18.5271C19.8659 18.4381 18.9858 17.5159 17.9558 16.4861L16.0832 14.6089L16.3032 14.3093C18.2367 11.6878 18.555 8.0692 17.1225 5.09662C15.4699 1.67464 11.9259 -0.31489 8.11036 0.0408841ZM10.395 2.18489C13.1618 2.77473 15.2498 4.8766 15.8444 7.66662C15.9661 8.23305 15.9661 9.8153 15.8444 10.3677C15.5401 11.7487 14.8987 12.9377 13.9156 13.9161C12.4596 15.3766 10.5869 16.0788 8.5083 15.943C5.7555 15.7698 3.33979 13.902 2.42219 11.2478C2.14597 10.4566 2.07107 9.97447 2.07575 9.00077C2.07575 8.26113 2.09448 8.03175 2.17875 7.63385C2.46901 6.2997 3.06357 5.17152 3.98585 4.21655C4.50551 3.67352 4.95963 3.31307 5.55419 2.97134C6.27516 2.55471 7.27703 2.2083 8.08695 2.09595C8.60661 2.02573 9.87533 2.07254 10.395 2.18489Z" fill="${textColor}" fill-opacity="${
    isDark ? 1 : 0.4
  }"/>
  <path d="M8.68607 3.05098C8.41922 3.1446 8.28814 3.24759 8.14301 3.46293C8.03065 3.63145 8.0166 3.70167 8.0166 4.01999C8.0166 4.34768 8.03065 4.39917 8.15705 4.58642C8.37709 4.89538 8.61117 5.00305 9.17764 5.04518C9.73944 5.092 9.98756 5.14349 10.4136 5.30265C11.3499 5.65374 12.1786 6.43083 12.5999 7.34835C12.8153 7.81179 12.8995 8.15352 12.9557 8.76677C13.0119 9.38469 13.1196 9.63279 13.4192 9.84345C13.6018 9.96984 13.6533 9.98389 14.0044 9.98389C14.3555 9.98389 14.4117 9.96984 14.5849 9.84813C14.8799 9.64684 15.0156 9.33319 15.0156 8.86507C15.0156 8.08331 14.7675 7.07684 14.393 6.33252C14.0933 5.72864 13.7703 5.28861 13.2413 4.75963C12.2488 3.76252 11.069 3.19141 9.66453 3.03693C9.08869 2.9714 8.90143 2.97608 8.68607 3.05098Z" fill="${textColor}" fill-opacity="${
    isDark ? 1 : 0.4
  }"/>
  </svg>  
  `;
  return (
    <LinearGradient
      // Button Linear Gradient
      style={[
        {
          paddingHorizontal: 20,
          paddingTop: 20 + inset?.top,
          paddingBottom: 17,
        },
      ]}
      start={{ x: 0.2, y: 0 }}
      colors={!isDark ? ac : dc}>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
        }}>
        <Text
          style={{
            color: "#B0B0B0",
            fontSize: 16,
            fontWeight: "500",
          }}>
          {comityListText.totalMember}
          {"   "}
          <Text
            style={{
              fontSize: 20,
              fontWeight: "800",
              color: textColor,
            }}>
            2000
          </Text>
        </Text>
      </View>
      <Input
        value={searchIp}
        onChange={setSearch}
        leftIcon={<SvgXml xml={search} />}
        containerStyle={[
          {
            borderRadius: 30,
            paddingHorizontal: 15,
            minHeight: 40,
            borderWidth: 0,
          },
          mainStyle.mt12,
        ]}
        placeholder={searchText}
      />
    </LinearGradient>
  );
};

const plus = `<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5 0C4.99 0 0.5 4.49 0.5 10C0.5 15.51 4.99 20 10.5 20C16.01 20 20.5 15.51 20.5 10C20.5 4.49 16.01 0 10.5 0ZM14.5 10.75H11.25V14C11.25 14.41 10.91 14.75 10.5 14.75C10.09 14.75 9.75 14.41 9.75 14V10.75H6.5C6.09 10.75 5.75 10.41 5.75 10C5.75 9.59 6.09 9.25 6.5 9.25H9.75V6C9.75 5.59 10.09 5.25 10.5 5.25C10.91 5.25 11.25 5.59 11.25 6V9.25H14.5C14.91 9.25 15.25 9.59 15.25 10C15.25 10.41 14.91 10.75 14.5 10.75Z" fill="#737AFF"/>
</svg>
`;
