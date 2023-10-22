import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { get } from "../../apis/multipleApi";
import { FavoriteCategoryCart } from "../../components/cart/FavoriteCategory";
import { PopularCategoryCart } from "../../components/cart/PopularCategory";
import Input from "../../components/main/Input";
import NoOption from "../../components/main/NoOption";
import loader from "../../data/loader";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import HidableHeaderLayout from "../../layouts/HidableHeaderLayout";
import UserSubscriptionRoute from "../../routes/UserSubscriptionRoute";
import mainStyle from "../../styles/mainStyle";
import SubscriptionList from "./SubscriptionList";

const { width, height } = Dimensions.get("window");
export default function Subscription({ navigation }) {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const colors = new AppColors(isDark);
  const values = new AppValues(isBn);
  const backgroundColor = colors.getBackgroundColor();
  const textColor = colors.getTextColor();
  const [searchIp, setSearch] = useState("");
  return (
    <HidableHeaderLayout
      component={<Component navigation={navigation} searchIp={searchIp} />}
      header={
        <Header
          searchIp={searchIp}
          setSearch={setSearch}
          textColor={textColor}
          isDark={isDark}
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
          paddingTop: 24 + inset?.top,
          paddingBottom: 17,
        },
      ]}
      start={{ x: 0.2, y: 0 }}
      colors={!isDark ? ac : dc}
    >
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 24,
            fontWeight: "500",
          }}
        >
          {values.getValues().comityList}
          {"   "}
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
          mainStyle.mt24,
        ]}
        placeholder={isBn ? "খুঁজুন" : "Search"}
      />
    </LinearGradient>
  );
};
const Component = ({ navigation, searchIp }) => {
  const user = useSelector((state) => state.user);
  const isBn = useSelector((state) => state.isBn);
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const [sorted, setSorted] = useState([]);

  useEffect(() => {
    dispatch(loader.show());
    get("/auth/get-joined-comities", user.token)
      .then((res) => {
        setData(res.data.comities);
        setSorted(res.data.comities);
        dispatch(loader.hide());
      })
      .catch((err) => {
        dispatch(loader.hide());
        console.error(err.message);
      });
  }, [user]);

  useEffect(() => {
    if (searchIp) {
      setSorted(
        data.filter((d) =>
          d?.name?.toLowerCase().match(searchIp.toLocaleLowerCase())
        )
      );
    } else {
      setSorted(data);
    }
  }, [searchIp]);

  return (
    <View
      style={{
        paddingHorizontal: 14,
        paddingVertical: 12,
      }}
    >
      {sorted?.length > 1 && (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {sorted.map((doc, i) => (
            <PopularCategoryCart
              onPress={() => {
                navigation.navigate("Subscription List", { comityId: doc.id });
              }}
              comity={doc}
              style={{
                width: width / 2 - 26,
                marginVertical: 6,
                height: width / 2 - 26 + 35,
              }}
              key={i}
            />
          ))}
        </View>
      )}
      {sorted?.length === 1 &&
        sorted.map((doc, i) => (
          <FavoriteCategoryCart
            key={i}
            onPress={() => {
              navigation.navigate("Subscription List", { comityId: doc.id });
            }}
            containerStyle={{
              marginHorizontal: 6,
              width: width - 40,
            }}
            index={0}
            comity={doc}
          />
        ))}
      {sorted?.length === 0 && (
        <NoOption
          title={
            isBn
              ? searchIp
                ? "খুঁজে পাওয়া যাচ্ছে না"
                : "আপনি এখন পর্যন্ত কোন কমিটির সদস্য হননি"
              : searchIp
              ? "Not found"
              : "You are not a member of any comity"
          }
        />
      )}

      {/* <NoOption title={"You are not a member of comity"}/> */}
    </View>
  );
};
