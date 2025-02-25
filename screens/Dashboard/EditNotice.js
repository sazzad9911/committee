import React, { useRef, useState } from "react";
import { ScrollView, Text, View, Alert } from "react-native";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { updateNotice } from "../../apis/api";
import Button from "../../components/main/Button";
import CustomHeader from "../../components/main/CustomHeader";
import Input from "../../components/main/Input";
import TextArea from "../../components/main/TextArea";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";
import loader from "../../data/loader";

export default function EditNotice({ route, navigation }) {
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
  const createCommitteeValues = values.createCommitteeValues();
  const [subject, setSubject] = useState(notice.subject);
  const [details, setDetails] = useState(notice.details);

  const right = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.2601 3.59997L5.0501 12.29C4.7401 12.62 4.4401 13.27 4.3801 13.72L4.0101 16.96C3.8801 18.13 4.7201 18.93 5.8801 18.73L9.1001 18.18C9.5501 18.1 10.1801 17.77 10.4901 17.43L18.7001 8.73997C20.1201 7.23997 20.7601 5.52997 18.5501 3.43997C16.3501 1.36997 14.6801 2.09997 13.2601 3.59997Z" stroke="${textColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.89 5.04999C12.0996 6.39084 12.7486 7.62412 13.735 8.55623C14.7214 9.48835 15.9894 10.0665 17.34 10.2M3 22H21" stroke="${textColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

  const handelUpdate = async () => {
    try {
      dispatch(loader.show());
      await updateNotice(notice.id, {
        subject,
        details,
      });
      navigation.navigate("Notice");
    } catch (error) {
      console.log(error);
      Alert.alert(error.response.data.msg);
    } finally {
      dispatch(loader.hide());
    }
  };

  return (
    <ScrollView
      style={{
        backgroundColor: colors.getBackgroundColor(),
      }}
    >
      <View style={[mainStyle.pdH20]}>
        <Input
          maxLength={30}
          level={headlines.subject}
          outSideStyle={[mainStyle.mt32]}
          optionalLevel={createCommitteeValues.required}
          placeholder={createCommitteeValues.write}
          subLevel={createCommitteeValues.highest30}
          value={subject}
          onChange={setSubject}
        />
        <TextArea
          maxLength={1000}
          level={headlines.details}
          style={{
            height: 200,
          }}
          value={details}
          outSideStyle={[mainStyle.mt32]}
          optionalLevel={createCommitteeValues.required}
          placeholder={createCommitteeValues.write}
          subLevel={createCommitteeValues.highest1000}
          onChange={setDetails}
        />
        <Button
          onPress={handelUpdate}
          active={true}
          style={mainStyle.mt32}
          title={headlines.publish}
        />
      </View>
    </ScrollView>
  );
}
