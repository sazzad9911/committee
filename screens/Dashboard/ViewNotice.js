import React, { useRef } from "react";
import { ScrollView, Text, View, Alert } from "react-native";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/main/Button";
import CustomHeader from "../../components/main/CustomHeader";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";
import loader from "../../data/loader";
import { deleteNotice } from "../../apis/api";

export default function ViewNotice({ route, navigation }) {
  const ref = useRef();
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const { notice } = route.params;
  const values = new AppValues(isBn);
  const headlines = values.getNoticeHeadLines();
  const colors = new AppColors(isDark);
  const textColor = colors.getTextColor();
  const borderColor = colors.getBorderColor();
  const backgroundColor = colors.getBackgroundColor();
  const schemeColor = colors.getSchemeColor();
  const right = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.2601 3.59997L5.0501 12.29C4.7401 12.62 4.4401 13.27 4.3801 13.72L4.0101 16.96C3.8801 18.13 4.7201 18.93 5.8801 18.73L9.1001 18.18C9.5501 18.1 10.1801 17.77 10.4901 17.43L18.7001 8.73997C20.1201 7.23997 20.7601 5.52997 18.5501 3.43997C16.3501 1.36997 14.6801 2.09997 13.2601 3.59997Z" stroke="${textColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.89 5.04999C12.0996 6.39084 12.7486 7.62412 13.735 8.55623C14.7214 9.48835 15.9894 10.0665 17.34 10.2M3 22H21" stroke="${textColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

  const haandelDelete = async () => {
    try {
      dispatch(loader.show());
      await deleteNotice(notice.id);
      navigation.navigate("Notice");
    } catch (error) {
      console.log(error);
      Alert.alert(error.response.data.msg);
    } finally {
      dispatch(loader.hide());
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <CustomHeader
        rightIcon={
          <SvgXml
            onPress={() => {
              navigation.navigate("EditNotice", {
                notice,
              });
            }}
            style={{
              position: "absolute",
              zIndex: 100,
              right: 20,
            }}
            xml={right}
          />
        }
        onPress={() => {
          navigation?.goBack();
        }}
        title={headlines.notice}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={[
            mainStyle.mt32,
            { color: borderColor },
            mainStyle.pdH20,
            mainStyle.text14,
          ]}
        >
          ০১/০১/২০২৩
        </Text>
        <Text
          style={[
            mainStyle.mt12,
            { color: textColor },
            mainStyle.level,
            mainStyle.pdH20,
          ]}
        >
          {notice.subject}
        </Text>
        <View
          style={[
            mainStyle.mH20,
            mainStyle.mt24,
            {
              backgroundColor: isDark ? "rgba(255, 255, 255, 0.1)" : "#ffff",
              minHeight: 380,
              padding: "2%",
            },
          ]}
        >
          <Text
            style={[
              { color: textColor, fontWeight: "400" },
              mainStyle.mediumText,
            ]}
          >
            {notice.details}
          </Text>
        </View>
        <Button
          onPress={haandelDelete}
          color={"#FF0000"}
          style={[mainStyle.mt32, mainStyle.mH20, { borderColor: "#FF0000" }]}
          title={headlines.delete}
        />
        <View style={mainStyle.ht32} />
      </ScrollView>
    </View>
  );
}
