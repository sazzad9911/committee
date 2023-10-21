import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native";
import { Menu } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { get, put, socket } from "../../apis/multipleApi";
import Button from "../../components/main/Button";
import Input from "../../components/main/Input";
import NoOption from "../../components/main/NoOption";
import loader from "../../data/loader";
import toast from "../../data/toast";
import { AppColors } from "../../functions/colors";
import localStorage from "../../functions/localStorage";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";
import MemberCardAlien from "../../components/cart/MemberCardAlien";
const { width, height } = Dimensions.get("window");

export default function UserMemberPage({ navigation, route }) {
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
  const borderColor = colors.getBorderColor();
  const createComityText = values.createComityText();
  const noComityFound = values.noComityFound();
  const special = route?.params?.special;
  const {comity} = route?.params;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [members, setMembers] = useState();
  const [searches, setSearch] = useState();
  const [sort, setSort] = useState();

  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const eye = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.1663 6.09998C12.6263 3.67998 10.373 2.28665 7.99967 2.28665C6.81301 2.28665 5.65967 2.63332 4.60634 3.27998C3.55301 3.93332 2.60634 4.88665 1.83301 6.09998C1.16634 7.14665 1.16634 8.84665 1.83301 9.89332C3.37301 12.32 5.62634 13.7067 7.99967 13.7067C9.18634 13.7067 10.3397 13.36 11.393 12.7133C12.4463 12.06 13.393 11.1067 14.1663 9.89332C14.833 8.85332 14.833 7.14665 14.1663 6.09998ZM7.99967 10.6933C6.50634 10.6933 5.30634 9.48665 5.30634 7.99998C5.30634 6.51332 6.50634 5.30665 7.99967 5.30665C9.49301 5.30665 10.693 6.51332 10.693 7.99998C10.693 9.48665 9.49301 10.6933 7.99967 10.6933Z" fill="rgba(255, 255, 255, 1)" fill-opacity="0.6"/>
<path d="M7.99904 6.09332C7.49424 6.09332 7.01012 6.29385 6.65318 6.6508C6.29623 7.00774 6.0957 7.49186 6.0957 7.99666C6.0957 8.50145 6.29623 8.98557 6.65318 9.34252C7.01012 9.69946 7.49424 9.89999 7.99904 9.89999C9.0457 9.89999 9.9057 9.04666 9.9057 7.99999C9.9057 6.95332 9.0457 6.09332 7.99904 6.09332Z" fill="black" fill-opacity="0.6"/>
</svg>
`;
  const bottom = `<svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.93512 0.491541L0.934191 0.492658C0.805404 0.64848 0.75 0.839842 0.75 1.02179C0.75 1.21073 0.815123 1.3968 0.928944 1.54436L0.928832 1.54444L0.934191 1.55093L4.69332 6.09914C4.69357 6.09945 4.69382 6.09976 4.69408 6.10007C5.03142 6.51573 5.4982 6.75 6.00072 6.75C6.50573 6.75 6.9713 6.50668 7.30662 6.10098L11.0673 1.55093C11.3109 1.25611 11.3109 0.787473 11.0673 0.492658L11.0673 0.492655L11.0663 0.491541C10.9432 0.344379 10.766 0.25 10.5689 0.25C10.3717 0.25 10.1945 0.344379 10.0714 0.491541L10.0714 0.491538L10.0705 0.492658L6.30982 5.04271C6.21516 5.15725 6.10219 5.20321 6.00072 5.20321C5.89925 5.20321 5.78629 5.15725 5.69162 5.04271L1.93099 0.492658L1.93099 0.492655L1.93006 0.491541C1.80698 0.34438 1.62971 0.25 1.43259 0.25C1.23546 0.25 1.0582 0.344379 0.93512 0.491541Z" fill="#A3A3A3" stroke="#A3A3A3" stroke-width="0.5"/>
</svg>
`;

  const search = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.11036 0.0408841C5.04858 0.326439 2.23492 2.29256 0.900663 5.06853C-0.124611 7.19849 -0.279105 9.62805 0.460591 11.8563C1.92126 16.2473 6.44838 18.8033 10.9849 17.7968C12.1834 17.53 13.3631 17.001 14.3088 16.3035L14.6084 16.0835L16.4858 17.956C17.5157 18.9858 18.438 19.8659 18.527 19.9127C18.7376 20.0251 19.2432 20.0298 19.4399 19.9221C19.6225 19.8238 19.8238 19.6225 19.9221 19.4399C20.0298 19.2433 20.0251 18.7377 19.9127 18.5271C19.8659 18.4381 18.9858 17.5159 17.9558 16.4861L16.0832 14.6089L16.3032 14.3093C18.2367 11.6878 18.555 8.0692 17.1225 5.09662C15.4699 1.67464 11.9259 -0.31489 8.11036 0.0408841ZM10.395 2.18489C13.1618 2.77473 15.2498 4.8766 15.8444 7.66662C15.9661 8.23305 15.9661 9.8153 15.8444 10.3677C15.5401 11.7487 14.8987 12.9377 13.9156 13.9161C12.4596 15.3766 10.5869 16.0788 8.5083 15.943C5.7555 15.7698 3.33979 13.902 2.42219 11.2478C2.14597 10.4566 2.07107 9.97447 2.07575 9.00077C2.07575 8.26113 2.09448 8.03175 2.17875 7.63385C2.46901 6.2997 3.06357 5.17152 3.98585 4.21655C4.50551 3.67352 4.95963 3.31307 5.55419 2.97134C6.27516 2.55471 7.27703 2.2083 8.08695 2.09595C8.60661 2.02573 9.87533 2.07254 10.395 2.18489Z" fill="${textColor}" fill-opacity="${
    isDark ? 1 : 0.4
  }"/>
  <path d="M8.68607 3.05098C8.41922 3.1446 8.28814 3.24759 8.14301 3.46293C8.03065 3.63145 8.0166 3.70167 8.0166 4.01999C8.0166 4.34768 8.03065 4.39917 8.15705 4.58642C8.37709 4.89538 8.61117 5.00305 9.17764 5.04518C9.73944 5.092 9.98756 5.14349 10.4136 5.30265C11.3499 5.65374 12.1786 6.43083 12.5999 7.34835C12.8153 7.81179 12.8995 8.15352 12.9557 8.76677C13.0119 9.38469 13.1196 9.63279 13.4192 9.84345C13.6018 9.96984 13.6533 9.98389 14.0044 9.98389C14.3555 9.98389 14.4117 9.96984 14.5849 9.84813C14.8799 9.64684 15.0156 9.33319 15.0156 8.86507C15.0156 8.08331 14.7675 7.07684 14.393 6.33252C14.0933 5.72864 13.7703 5.28861 13.2413 4.75963C12.2488 3.76252 11.069 3.19141 9.66453 3.03693C9.08869 2.9714 8.90143 2.97608 8.68607 3.05098Z" fill="${textColor}" fill-opacity="${
    isDark ? 1 : 0.4
  }"/>
  </svg>  
  `;
  const upload = async (type) => {
    dispatch(loader.show());
    try {
      if (special) {
        await put(
          "/comity/update",
          {
            specialMembersPrivacy: type,
            comityId: comity.id,
          },
          user.token
        );
      } else {
        await put(
          "/comity/update",
          {
            membersPrivacy: type,
            comityId: comity.id,
          },
          user.token
        );
      }
      const res = await get(`/comity/get/${comity.id}`, user.token);
      dispatch({ type: "SET_COMITY", value: res.data.comity });
      localStorage.comityLogIn(res.data.comity);
      dispatch(loader.hide());
      dispatch(toast.success("updated"));
    } catch (e) {
      dispatch(toast.error("Error updating"));
      dispatch(loader.hide());
    }
  };
  useEffect(() => {
    fetch();
    //console.log(comity);
  }, [special]);
  useEffect(() => {
    searches &&
      setSort(
        members?.filter(
          (member) =>
            member.name?.toUpperCase().includes(searches?.toUpperCase()) ||
            member?.user?.name?.toUpperCase().includes(searches?.toUpperCase())
        )
      );
  }, [searches]);
  const fetch = async () => {
    !members && dispatch(loader.show());
    try {
      const res = await get(`/member/get-all/${comity.id}`, user.token);
      if (special) {
        setMembers(
          res.data.members.filter((member) => !member.category.match("General"))
        );
        setSort(
          res.data.members.filter((member) => !member.category.match("General"))
        );
      } else {
        setMembers(res.data.members);
        setSort(res.data.members);
      }
      dispatch(loader.hide());
    } catch (e) {
      dispatch(loader.hide());
      dispatch(toast.error("Error loading members"));
    }
  }; 
  const back=`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 19.5L7.5 12L15 4.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  ` 

  return (
    <ScrollView style={{ backgroundColor: backgroudColor }}>
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
        colors={!isDark ? ac : dc}
      >
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <View style={{flexDirection:"row",alignItems:"center"}}>
            <Pressable onPress={()=>{
              navigation?.goBack()
            }}>
              <SvgXml xml={back}/>
            </Pressable>
          <Text
            style={{
              color: "#B0B0B0",
              fontSize: 16,
              fontWeight: "500",
              marginLeft:5,
              marginTop:-3
            }}
          >
            {special
              ? comityListText.specialMember
              : comityListText.totalMember}
            {"   "}
            <Text
              style={{
                fontSize: 20,
                fontWeight: "800",
                color: "white",
              }}
            >
              {members?.length || "0"}
            </Text>
          </Text>
          </View>
        </View>
        <Input
          value={searches}
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
      {sort?.map((doc, i) => (
        <MemberCardAlien
          accepted
          position={doc.position}
          //onPress={() => navigation.navigate("UserProfile", { data: doc })}
          offline
          name={doc.user ? doc.user.name : doc.name}
          url={doc.user ? doc.user.profilePhoto : doc.profilePhoto}
          textColor={colors.getTextColor()}
          key={i}
          backgroundColor={colors.getBackgroundColor()}
          borderColor={colors.getShadowColor()}
        />
      ))}
      {sort?.length === 0 && (
        <NoOption title={isBn?"কোন সদস্য পাওয়া যায়নি":"No members Found"} />
      )}
    </ScrollView>
  );
}

const plus = `<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5 0C4.99 0 0.5 4.49 0.5 10C0.5 15.51 4.99 20 10.5 20C16.01 20 20.5 15.51 20.5 10C20.5 4.49 16.01 0 10.5 0ZM14.5 10.75H11.25V14C11.25 14.41 10.91 14.75 10.5 14.75C10.09 14.75 9.75 14.41 9.75 14V10.75H6.5C6.09 10.75 5.75 10.41 5.75 10C5.75 9.59 6.09 9.25 6.5 9.25H9.75V6C9.75 5.59 10.09 5.25 10.5 5.25C10.91 5.25 11.25 5.59 11.25 6V9.25H14.5C14.91 9.25 15.25 9.59 15.25 10C15.25 10.41 14.91 10.75 14.5 10.75Z" fill="#737AFF"/>
</svg>
`;
