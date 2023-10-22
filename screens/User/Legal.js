import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { AppColors } from "../../functions/colors";
import { Clickable } from "./Profile";

export default function Legal({ navigation }) {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const colors = new AppColors(isDark);
  const cmt = `<svg width="38" height="19" viewBox="0 0 38 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.5218 14.3473C16.3892 14.3473 16.2566 14.3069 16.1519 14.2204C16.0546 14.139 16 14.0292 16 13.9147C16 13.8002 16.0546 13.6904 16.1519 13.609L20.702 9.84837C21.037 9.57152 21.037 9.12162 20.702 8.84477L16.1519 5.08413C16.0546 5.00273 16 4.89289 16 4.77844C16 4.66398 16.0546 4.55415 16.1519 4.47274C16.3543 4.30547 16.6893 4.30547 16.8917 4.47274L21.4417 8.23337C21.7976 8.52753 22 8.92552 22 9.34657C22 9.76762 21.8046 10.1656 21.4417 10.4598L16.8917 14.2204C16.787 14.3011 16.6544 14.3473 16.5218 14.3473Z" fill="${colors.getTextColor()}" fill-opacity="0.4"/>
    <path d="M15.9915 14.4122L15.9927 14.4131C16.1485 14.5419 16.3398 14.5973 16.5218 14.5973C16.7107 14.5973 16.8968 14.5322 17.0444 14.4183L17.0444 14.4185L17.0509 14.4131L21.5991 10.654C21.5995 10.6537 21.5998 10.6534 21.6001 10.6532C22.0157 10.3158 22.25 9.84908 22.25 9.34657C22.25 8.84156 22.0067 8.37599 21.601 8.04067L17.0509 4.28004C16.7561 4.03637 16.2875 4.03637 15.9927 4.28004L15.9927 4.28004L15.9915 4.28097C15.8444 4.40404 15.75 4.58131 15.75 4.77844C15.75 4.97556 15.8444 5.15283 15.9915 5.27591L15.9915 5.27591L15.9927 5.27683L20.5427 9.03747C20.6572 9.13213 20.7032 9.2451 20.7032 9.34657C20.7032 9.44804 20.6572 9.561 20.5427 9.65567L15.9927 13.4163L15.9927 13.4163L15.9915 13.4172C15.8444 13.5403 15.75 13.7176 15.75 13.9147C15.75 14.1118 15.8444 14.2891 15.9915 14.4122Z" stroke="white" stroke-opacity="0.2" stroke-width="0.5"/>
    </svg>
    `;
  return (
    <ScrollView style={{ backgroundColor: colors.getBackgroundColor() }}>
      <View
        style={{
          marginHorizontal: 20,
          marginVertical: 12,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: colors.getShadowColor(),
        }}
      >
        <Clickable
          icon={cmt}
          subTextColor={colors.getSubTextColor()}
          border={colors.getShadowColor()}
          color={colors.getTextColor()}
          //canGo={true}
          onPress={() => navigation?.navigate("AboutComity")}
          title={!isBn ? "About Comity" : "কমিটি সম্পর্কে"}
        />
        <Clickable
          icon={cmt}
          subTextColor={colors.getSubTextColor()}
          border={colors.getShadowColor()}
          color={colors.getTextColor()}
          //canGo={true}
          onPress={() => navigation?.navigate("Conditions")}
          title={!isBn ? "Term & condition" : "শর্তাবলী"}
        />
        <Clickable
          bottom
          icon={cmt}
          subTextColor={colors.getSubTextColor()}
          border={colors.getShadowColor()}
          color={colors.getTextColor()}
          //canGo={true}
          onPress={() => navigation?.navigate("Policy")}
          title={!isBn ? "Privacy Policy" : "গোপনীয়তা নীতি"}
        />
      </View>
    </ScrollView>
  );
}
const Card = ({ color, bg, title, border }) => {
  return (
    <View
      style={{
        paddingLeft: 12,
        paddingTop: 16,
      }}
    >
      <Text
        style={{
          color: color,
          fontSize: 14,
          fontWeight: "500",
          marginBottom: 16,
        }}
      >
        {title}
      </Text>
      {border && (
        <View
          style={{
            width: "100%",
            height: 1,
            backgroundColor: bg,
          }}
        />
      )}
    </View>
  );
};
