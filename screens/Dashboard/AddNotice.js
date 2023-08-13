import React, { useRef } from "react";
import { ScrollView, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { createNotice } from "../../apis/api";
import Button from "../../components/main/Button";
import CustomHeader from "../../components/main/CustomHeader";
import Input from "../../components/main/Input";
import TextArea from "../../components/main/TextArea";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";

export default function AddNotice({ navigation }) {
  const ref = useRef();
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const [subject, setSubject] = React.useState("");
  const [details, setDetails] = React.useState("");

  const values = new AppValues(isBn);
  const headlines = values.getNoticeHeadLines();
  const colors = new AppColors(isDark);
  const textColor = colors.getTextColor();
  const borderColor = colors.getBorderColor();
  const backgroundColor = colors.getBackgroundColor();
  const schemeColor = colors.getSchemeColor();
  const createCommitteeValues = values.createCommitteeValues();

  const right = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.2601 3.59997L5.0501 12.29C4.7401 12.62 4.4401 13.27 4.3801 13.72L4.0101 16.96C3.8801 18.13 4.7201 18.93 5.8801 18.73L9.1001 18.18C9.5501 18.1 10.1801 17.77 10.4901 17.43L18.7001 8.73997C20.1201 7.23997 20.7601 5.52997 18.5501 3.43997C16.3501 1.36997 14.6801 2.09997 13.2601 3.59997Z" stroke="${textColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.89 5.04999C12.0996 6.39084 12.7486 7.62412 13.735 8.55623C14.7214 9.48835 15.9894 10.0665 17.34 10.2M3 22H21" stroke="${textColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

  const reset = () => {
    setSubject("");
    setDetails("");
  };

  const handelSubmit = async () => {
    if (!subject || !details) {
      Alert.alert("Please fill all the fields!");
      return;
    }
    try {
      dispatch(loader.show());
      await createNotice({
        subject,
        details,
      });
      reset();
    } catch (error) {
      console.log(error);
      Alert.alert(error.response.data.msg);
    } finally {
      dispatch(loader.hide());
    }
  };

  return (
    <ScrollView>
      <View style={[mainStyle.pdH20]}>
        <Input
          value={subject}
          onChange={setSubject}
          level={headlines.subject}
          outSideStyle={[mainStyle.mt32]}
          optionalLevel={createCommitteeValues.required}
          placeholder={createCommitteeValues.write}
          subLevel={createCommitteeValues.highest30}
        />
        <TextArea
          value={details}
          onChange={setDetails}
          level={headlines.details}
          style={{
            height: 200,
          }}
          outSideStyle={[mainStyle.mt32]}
          optionalLevel={createCommitteeValues.required}
          placeholder={createCommitteeValues.write}
          subLevel={createCommitteeValues.highest1000}
        />
        <Button
          onPress={handelSubmit}
          active={true}
          style={mainStyle.mt32}
          title={headlines.publish}
        />
      </View>
    </ScrollView>
  );
}
