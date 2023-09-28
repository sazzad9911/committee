import React from "react";
import { Pressable, ScrollView, Text, View, Alert } from "react-native";
import { Menu } from "react-native-paper";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { get, put } from "../../apis/multipleApi";
import Button from "../../components/main/Button";
import ReadMoreComponent from "../../components/ReadMoreComponent";
import loader from "../../data/loader";
import toast from "../../data/toast";
import { AppColors } from "../../functions/colors";
import localStorage from "../../functions/localStorage";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";
import { ProfileCart } from "./CommitteeProfile";

export default function CurrentBalance({ navigation, route }) {
  // const { balance } = route.params || 0;
  // const { balancePrivacy } = route.params;
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const comity = useSelector((state) => state.comity);
  const colors = new AppColors(isDark);
  const values = new AppValues(isBn);
  const backgroundColor = colors.getBackgroundColor();
  const textColor = colors.getTextColor();
  const borderColor = colors.getBorderColor();
  const allHeadlines = values.getHeadLines();
  const backgroudColor = colors.getBackgroundColor();
  const [visible, setVisible] = React.useState(false);
  const comityListText = values.getHeadLines();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const eye = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.1663 6.09998C12.6263 3.67998 10.373 2.28665 7.99967 2.28665C6.81301 2.28665 5.65967 2.63332 4.60634 3.27998C3.55301 3.93332 2.60634 4.88665 1.83301 6.09998C1.16634 7.14665 1.16634 8.84665 1.83301 9.89332C3.37301 12.32 5.62634 13.7067 7.99967 13.7067C9.18634 13.7067 10.3397 13.36 11.393 12.7133C12.4463 12.06 13.393 11.1067 14.1663 9.89332C14.833 8.85332 14.833 7.14665 14.1663 6.09998ZM7.99967 10.6933C6.50634 10.6933 5.30634 9.48665 5.30634 7.99998C5.30634 6.51332 6.50634 5.30665 7.99967 5.30665C9.49301 5.30665 10.693 6.51332 10.693 7.99998C10.693 9.48665 9.49301 10.6933 7.99967 10.6933Z" fill="${borderColor}" fill-opacity="0.6"/>
<path d="M7.99904 6.09332C7.49424 6.09332 7.01012 6.29385 6.65318 6.6508C6.29623 7.00774 6.0957 7.49186 6.0957 7.99666C6.0957 8.50145 6.29623 8.98557 6.65318 9.34252C7.01012 9.69946 7.49424 9.89999 7.99904 9.89999C9.0457 9.89999 9.9057 9.04666 9.9057 7.99999C9.9057 6.95332 9.0457 6.09332 7.99904 6.09332Z" fill="black" fill-opacity="0.6"/>
</svg>
`;
  const bottom = `<svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.93512 0.491541L0.934191 0.492658C0.805404 0.64848 0.75 0.839842 0.75 1.02179C0.75 1.21073 0.815123 1.3968 0.928944 1.54436L0.928832 1.54444L0.934191 1.55093L4.69332 6.09914C4.69357 6.09945 4.69382 6.09976 4.69408 6.10007C5.03142 6.51573 5.4982 6.75 6.00072 6.75C6.50573 6.75 6.9713 6.50668 7.30662 6.10098L11.0673 1.55093C11.3109 1.25611 11.3109 0.787473 11.0673 0.492658L11.0673 0.492655L11.0663 0.491541C10.9432 0.344379 10.766 0.25 10.5689 0.25C10.3717 0.25 10.1945 0.344379 10.0714 0.491541L10.0714 0.491538L10.0705 0.492658L6.30982 5.04271C6.21516 5.15725 6.10219 5.20321 6.00072 5.20321C5.89925 5.20321 5.78629 5.15725 5.69162 5.04271L1.93099 0.492658L1.93099 0.492655L1.93006 0.491541C1.80698 0.34438 1.62971 0.25 1.43259 0.25C1.23546 0.25 1.0582 0.344379 0.93512 0.491541Z" fill="#A3A3A3" stroke="#A3A3A3" stroke-width="0.5"/>
</svg>
`;
  const upload = async (type) => {
    dispatch(loader.show());
    try {
      await put(
        "/comity/update",
        {
          balancePrivacy: type,
          comityId: comity.id,
        },
        user.token
      );
      const res = await get(`/comity/get/${comity.id}`, user.token);
      dispatch({ type: "SET_COMITY", value: res.data.comity });
      localStorage.comityLogIn(res.data.comity);
      dispatch(loader.hide());
      dispatch(toast.success("updated"));
      navigation.goBack();
    } catch (e) {
      dispatch(toast.error("Error updating"));
      dispatch(loader.hide());
    }
  };
  return (
    <ScrollView style={{ backgroundColor: colors.getBackgroundColor() }}>
      <ProfileCart
        icon={
          <Menu
            contentStyle={{ backgroundColor: backgroudColor }}
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Pressable
                onPress={openMenu}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 20,
                }}
              >
                <SvgXml xml={eye} />
                <Text
                  style={{
                    color: isDark
                      ? "rgba(255, 255, 255, 1)"
                      : "rgba(0, 0, 0, 1)",
                    marginHorizontal: 5,
                  }}
                >
                  {comity?.balancePrivacy === "Private"
                    ? comityListText.private
                    : comity?.balancePrivacy === "Public"
                    ? comityListText.public
                    : comityListText.membersOnly}
                </Text>
                <SvgXml xml={bottom} />
              </Pressable>
            }
          >
            <Menu.Item
              titleStyle={{ color: textColor }}
              onPress={() => {
                upload("Private");
                setVisible(false);
              }}
              title={comityListText.private}
            />
            <Menu.Item
              titleStyle={{ color: textColor }}
              onPress={() => {
                upload("Public");
                setVisible(false);
              }}
              title={comityListText.public}
            />

            <Menu.Item
              titleStyle={{ color: textColor }}
              onPress={() => {
                upload("MembersOnly");
                setVisible(false);
              }}
              title={comityListText.membersOnly}
            />
          </Menu>
        }
        style={[{ borderBottomWidth: 0 }, mainStyle.mt12]}
        onPress={() => {
          navigation.navigate("CurrentBalance");
        }}
        borderColor={borderColor}
        privacy={allHeadlines.private}
        number={comity?.balance?.toString()}
        title={allHeadlines.presentBalance}
        color={textColor}
      />
      <View style={[mainStyle.pdH20, mainStyle.mt12]}>
        {/* <Button
          onPress={() => navigation.goBack()}
          active={true}
          title={"Confirm"}
        /> */}
        <ReadMoreComponent textColor={textColor} />
      </View>
    </ScrollView>
  );
}
