import React from "react";
import { View, Text, Dimensions, Touchable } from "react-native";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import Button from "../components/main/Button";
import { AppColors } from "../functions/colors";
import { AppValues } from "../functions/values";
import mainStyle from "../styles/mainStyle";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ContactSuccess({ navigation }) {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const colors = new AppColors(isDark);
  const textColor = colors.getTextPrimaryColor();
  const borderColor = colors.getBorderColor();
  const subTextColor = colors.getSubTextColor();
  const values = new AppValues(isBn);
  const headlines = values.getValues();
  const { width, height } = Dimensions.get("window");
  const backgroundColor = colors.getBackgroundColor();

  return (
    <View
      style={[
        {
          flex: 1,
          alignItems: "center",
          height: height,
          justifyContent: "space-between",
          backgroundColor: backgroundColor,
        },
        mainStyle.pdH20,
      ]}
    >
      <View style={{ alignItems: "center" }}>
        <SvgXml style={{ marginTop: 100 }} xml={icon} />
        <Text style={[mainStyle.text20, mainStyle.mt24, { color: "#6971FF" }]}>
          {isBn ? "আপনার অনুরোধ জমা হয়েছে!" : "Your request is submited!"}
        </Text>
        <Text
          style={[
            mainStyle.subLevel,
            {
              textAlign: "center",

              color: textColor,
              paddingVertical: 30,
              ...(!isBn && {
                lineHeight: 70,
              }),
            },
          ]}
        >
          {isBn ? (
            <>
              আপনার যদি অন্য কোনো জিজ্ঞাসা থাকে, অনুগ্রহ করে{" "}
              <Text
                style={[
                  mainStyle.subLevel,
                  {
                    textAlign: "justify",
                    color: "#6971FF",
                  },
                ]}
              >
                সাপোর্ট সেন্টারে{" "}
              </Text>
              ফিরে যান।
            </>
          ) : (
            <>
              If you have another inquiry, please go back to the{" "}
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text
                  style={[
                    mainStyle.subLevel,
                    {
                      textAlign: "justify",
                      color: "#6971FF",
                      paddingVertical: 30,
                    },
                  ]}
                >
                  Support Box
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Text>
      </View>
      <Button
        onPress={() => navigation.goBack()}
        active={true}
        style={[
          { width: Dimensions.get("window").width - 40, marginBottom: 60 },
          mainStyle.mt32,
        ]}
        title={isBn ? "ফিরে যান" : "Go Back"}
      />
    </View>
  );
}

const icon = `<svg width="77" height="76" viewBox="0 0 77 76" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1098_10552)">
<path d="M36.505 0H40.4416C49.1637 0.540313 57.7434 3.97219 64.1322 9.98687C71.4591 16.6072 75.9122 26.1666 76.5 36.0109V39.9C75.9478 49.7859 71.4709 59.3809 64.1203 66.0309C57.7138 71.9862 49.1934 75.4537 40.4772 76H36.5941C26.7378 75.4419 17.1606 70.9709 10.5166 63.6559C4.50781 57.2791 1.05812 48.7172 0.5 40.0069V36.0347C1.05812 26.7425 4.98281 17.6403 11.6744 11.1269C18.1819 4.47687 27.2425 0.57 36.505 0ZM56.3006 22.5209C47.7981 30.3941 39.3313 38.3028 30.8584 46.2056C27.2069 42.3344 23.6325 38.3978 19.9334 34.5681C17.8137 32.3534 13.7763 32.8344 12.1909 35.4528C10.9263 37.3587 11.1875 40.09 12.8084 41.7109C18.645 47.9988 24.5291 54.245 30.3716 60.5328C40.7088 50.9497 50.9984 41.3191 61.3059 31.7003C62.6063 30.4297 64.2806 29.2541 64.6547 27.3481C65.2306 25.1216 64.0194 22.6278 61.9472 21.66C60.1184 20.7516 57.7731 21.1078 56.3006 22.5209Z" fill="#2B32B2"/>
<path d="M56.3006 22.5209C57.7731 21.1078 60.1185 20.7516 61.9472 21.66C64.0194 22.6278 65.2306 25.1216 64.6547 27.3481C64.2806 29.2541 62.6063 30.4297 61.306 31.7003C50.9985 41.3191 40.7088 50.9497 30.3716 60.5328C24.5291 54.245 18.645 47.9988 12.8085 41.7109C11.1875 40.09 10.9263 37.3588 12.191 35.4528C13.7763 32.8344 17.8138 32.3534 19.9335 34.5681C23.6325 38.3978 27.2069 42.3344 30.8585 46.2056C39.3313 38.3028 47.7981 30.3941 56.3006 22.5209Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_1098_10552">
<rect width="76" height="76" fill="white" transform="translate(0.5)"/>
</clipPath>
</defs>
</svg>
`;
