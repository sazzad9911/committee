import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, ToastAndroid, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { deletes, get, post } from "../../apis/multipleApi";
import MemberCard from "../../components/cart/MemberCard";
import Input from "../../components/main/Input";
import NoOption from "../../components/main/NoOption";
import loader from "../../data/loader";
import toast from "../../data/toast";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import HidableHeaderLayout from "../../layouts/HidableHeaderLayout";
import mainStyle from "../../styles/mainStyle";

export default function AllMember({ navigation, route }) {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const ac = ["#1488CC", "#2B32B2"];
  const values = new AppValues(isBn);
  const headlines = values.getValues();
  const colors = new AppColors(isDark);
  const subscription = route?.params?.subscription;
  const data = route?.params?.data;
  const [allMember, setAllMember] = useState();
  const [sortedMember, setSortedMember] = useState();
  const isFocused = useIsFocused();
  const comity = useSelector((state) => state.comity);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [searchIp, setSearch] = useState("");
  const paid = route?.params?.paid;
  useEffect(() => {
    if (subscription) {
      getMember();
    } else {
      getRandomMember();
    }
    !allMember && dispatch(loader.show());
  }, [isFocused]);
  const getMember = async () => {
    //dispatch(loader.show());
    const res = await get(`/subs/get-members/${subscription}`, user.token);
    setAllMember(res.data.members);
    dispatch(loader.hide());
  };
  const getRandomMember = async () => {
    //dispatch(loader.show());
    const res = await get(`/member/get-random/${comity.id}`, user.token);
    setAllMember(res.data.users.filter((u) => u.id != user.user.id));
    //console.log(res.data.users[1]);
    dispatch(loader.hide());
  };
  useEffect(() => {
    if (allMember) {
      setSortedMember(
        allMember.filter(
          (member) =>
            member?.name?.toUpperCase().includes(searchIp?.toUpperCase()) ||
            member?.user?.name?.toUpperCase().includes(searchIp?.toUpperCase())
        )
      );
    }
  }, [allMember, searchIp]);

  return (
    <HidableHeaderLayout
      header={
        <Header
          searchIp={searchIp}
          onSearch={setSearch}
          onPress={() => navigation.goBack()}
          backgroundColor={colors.getSchemeColor()}
          textColor={colors.getTextColor()}
          isDark={isDark}
          schemeColor={colors.getBackgroundColor()}
        />
      }
      component={
        <View>
          {!subscription &&
            sortedMember?.map((doc, i) => (
              <MemberCard
                onAdd={async () => {
                  if (doc?.alreadyMember) {
                    //console.log(doc);
                    dispatch(loader.show());
                    return deletes(
                      `/member/delete/${doc.members[0].id}`,
                      user.token
                    )
                      .then((res) => {
                        dispatch(loader.hide());

                        dispatch(toast.success(isBn?"অনুরুধটি বাতিল করা হয়েছে":"Canceled member request"));
                        getRandomMember();
                      })
                      .catch((err) => {
                        dispatch(loader.hide());
                        dispatch(toast.error(err.response.data.msg));
                      });
                  }
                  navigation?.navigate("AddMember", { data: doc });
                  return;
                  //problem
                  dispatch(loader.show());
                  try {
                    await post(
                      `/member/request/send/${doc.id}`,
                      null,
                      user.token
                    );
                    dispatch(loader.hide());
                    dispatch(toast.success("Request sent successfully"));
                  } catch (err) {
                    dispatch(toast.error("Request failed"));
                    dispatch(loader.hide());
                    console.error(err.message);
                  }
                }}
                onProfile={() => {
                  //console.log(doc);
                  return;
                  navigation?.navigate("UserProfile", { data: doc });
                }}
                requested={doc?.alreadyMember ? true : false}
                key={i}
                name={doc.name}
                borderColor={colors.getShadowColor()}
                backgroundColor={colors.getBackgroundColor()}
                textColor={colors.getTextColor()}
              />
            ))}
          {subscription &&
            sortedMember?.map((doc, i) => (
              <MemberCard
                //onPress={() => navigation?.navigate("AddMember")}
                onProfile={() => {
                  if (!subscription) {
                    return;
                  }

                  //navigation?.navigate("UserProfile", { data: doc });
                }}
                onPress={async () => {
                  if (!subscription) {
                    return;
                  }
                  if (doc.status === "Accepted") {
                    navigation.navigate("AddMemberSubscription", {
                      data: doc,
                      subscriptionId: subscription,
                      paid: paid,
                      oldMember: true,
                    });
                  } else {
                    dispatch(toast.error("Request pending already"));
                  }
                }}
                onAdd={async () => {
                  dispatch(loader.show());
                  try {
                    await deletes(`/member/delete/${doc.id}`, user.token);
                    dispatch(loader.hide());
                    dispatch(toast.success("Member deleted"));
                    getMember();
                  } catch (e) {
                    dispatch(loader.hide());
                    dispatch(toast.error("Request failed"));
                    console.error(e);
                  }
                }}
                requested={
                  doc.status === "Pending" || doc?.alreadyMember ? true : false
                }
                accepted={doc.status != "Pending" ? true : false}
                key={i}
                name={doc.user ? doc.user.name : doc.name}
                url={doc.user ? doc.user.profilePhoto : doc.profilePhoto}
                borderColor={colors.getShadowColor()}
                backgroundColor={colors.getBackgroundColor()}
                textColor={colors.getTextColor()}
                offline={subscription && !doc.userId ? true : false}
              />
            ))}
          {sortedMember?.length == 0 && (
            <NoOption title={"Ops!"} subTitle={"Member not found"} />
          )}
        </View>
      }
    />
  );
}

const Header = ({
  backgroundColor,
  textColor,
  isDark,
  schemeColor,
  onPress,
  searchIp,
  onSearch,
}) => {
  const inset = useSafeAreaInsets();
  const isBn = useSelector((state) => state.isBn);
  const values = new AppValues(isBn);
  const headlines = values.getValues();
  const search = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.11036 0.0408841C5.04858 0.326439 2.23492 2.29256 0.900663 5.06853C-0.124611 7.19849 -0.279105 9.62805 0.460591 11.8563C1.92126 16.2473 6.44838 18.8033 10.9849 17.7968C12.1834 17.53 13.3631 17.001 14.3088 16.3035L14.6084 16.0835L16.4858 17.956C17.5157 18.9858 18.438 19.8659 18.527 19.9127C18.7376 20.0251 19.2432 20.0298 19.4399 19.9221C19.6225 19.8238 19.8238 19.6225 19.9221 19.4399C20.0298 19.2433 20.0251 18.7377 19.9127 18.5271C19.8659 18.4381 18.9858 17.5159 17.9558 16.4861L16.0832 14.6089L16.3032 14.3093C18.2367 11.6878 18.555 8.0692 17.1225 5.09662C15.4699 1.67464 11.9259 -0.31489 8.11036 0.0408841ZM10.395 2.18489C13.1618 2.77473 15.2498 4.8766 15.8444 7.66662C15.9661 8.23305 15.9661 9.8153 15.8444 10.3677C15.5401 11.7487 14.8987 12.9377 13.9156 13.9161C12.4596 15.3766 10.5869 16.0788 8.5083 15.943C5.7555 15.7698 3.33979 13.902 2.42219 11.2478C2.14597 10.4566 2.07107 9.97447 2.07575 9.00077C2.07575 8.26113 2.09448 8.03175 2.17875 7.63385C2.46901 6.2997 3.06357 5.17152 3.98585 4.21655C4.50551 3.67352 4.95963 3.31307 5.55419 2.97134C6.27516 2.55471 7.27703 2.2083 8.08695 2.09595C8.60661 2.02573 9.87533 2.07254 10.395 2.18489Z" fill="${textColor}" fill-opacity="${
    isDark ? 1 : 0.4
  }"/>
  <path d="M8.68607 3.05098C8.41922 3.1446 8.28814 3.24759 8.14301 3.46293C8.03065 3.63145 8.0166 3.70167 8.0166 4.01999C8.0166 4.34768 8.03065 4.39917 8.15705 4.58642C8.37709 4.89538 8.61117 5.00305 9.17764 5.04518C9.73944 5.092 9.98756 5.14349 10.4136 5.30265C11.3499 5.65374 12.1786 6.43083 12.5999 7.34835C12.8153 7.81179 12.8995 8.15352 12.9557 8.76677C13.0119 9.38469 13.1196 9.63279 13.4192 9.84345C13.6018 9.96984 13.6533 9.98389 14.0044 9.98389C14.3555 9.98389 14.4117 9.96984 14.5849 9.84813C14.8799 9.64684 15.0156 9.33319 15.0156 8.86507C15.0156 8.08331 14.7675 7.07684 14.393 6.33252C14.0933 5.72864 13.7703 5.28861 13.2413 4.75963C12.2488 3.76252 11.069 3.19141 9.66453 3.03693C9.08869 2.9714 8.90143 2.97608 8.68607 3.05098Z" fill="${textColor}" fill-opacity="${
    isDark ? 1 : 0.4
  }"/>
  </svg>  
  `;
  const icon = `<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 16.5L1.5 9L9 1.5" stroke="${textColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

  return (
    <View
      style={[
        {
          paddingTop: inset?.top + 12,
          backgroundColor: backgroundColor,
          paddingHorizontal: 20,
          paddingBottom: 12,
        },
      ]}
    >
      <Pressable
        onPress={() => {
          if (onPress) {
            onPress();
            return;
          }
          navigation?.goBack();
        }}
        style={{
          position: "absolute",
          zIndex: 100,
          left: 20,
          top: inset?.top + 16,
        }}
      >
        <SvgXml xml={icon} />
      </Pressable>
      <Text
        style={[mainStyle.level, { color: textColor, textAlign: "center" }]}
      >
        {headlines._allMember}
      </Text>
      <Input
        value={searchIp}
        onChange={onSearch}
        leftIcon={<SvgXml xml={search} />}
        containerStyle={[
          {
            borderRadius: 30,
            paddingHorizontal: 15,
            minHeight: 40,
            borderWidth: 0,
            backgroundColor: schemeColor,
          },
          mainStyle.mt12,
        ]}
        placeholder={"Search"}
      />
    </View>
  );
};
