import React,{useState} from "react";
import { ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { post } from "../../apis/multipleApi";
import Button from "../../components/main/Button";
import RadioButton from "../../components/main/RadioButton";
import ReadMoreComponent from "../../components/ReadMoreComponent";
import loader from "../../data/loader";
import toast from "../../data/toast";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";

export default function DeleteMemberConfirmation({ navigation, route }) {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const user = useSelector((state) => state.user);
  const values = new AppValues(isBn);
  const headlines = values.getValues();
  const colors = new AppColors(isDark);
  const onPress = route?.params?.onPress;
  const title = route?.params?.title;
  const style = route?.params?.style;
  const data = route?.params?.data;
  const dispatch=useDispatch()
  const [deleteOnly, setDeleteOnly] = useState(true);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[{ flex: 1 }, mainStyle.pdH20]}>
        <Text
          style={[mainStyle.mt32, mainStyle.level, { color: "#f00" }, style]}>
          {title ? title : headlines._deleteCofirmation}
        </Text>
        <View style={mainStyle.mt24}>
          <RadioButton
            value={deleteOnly}
            onChange={() => setDeleteOnly(true)}
            title={headlines._deleteOnly}
          />
          <View style={{ height: 24 }} />

          <RadioButton
            value={!deleteOnly}
            onChange={() => setDeleteOnly(false)}
            title={headlines._memberAndCollectionDelete}
          />
        </View>
        <Button
          onPress={() => {
            dispatch(loader.show());
            post(
              `/member/detach`,
              {
                memberId: data.id,
                deleteData: deleteOnly?"":"ok",
              },
              user.token
            )
              .then((res) => {
                dispatch(loader.hide());
                dispatch(toast.success("Confirmation deleted successfully"));
                navigation.navigate("Member");
              })
              .catch((error) => {
                dispatch(loader.hide());
                dispatch(toast.error(error.response.data.msg));
              });
          }}
          style={mainStyle.mt32}
          active={true}
          title={headlines._ok}
        />
        <ReadMoreComponent />
      </View>
    </ScrollView>
  );
}
