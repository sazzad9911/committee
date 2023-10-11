import React, { useState } from "react";
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
  const dispatch = useDispatch();
  const [deleteOnly, setDeleteOnly] = useState(true);

  return (
    <ScrollView
      style={{ backgroundColor: colors.getBackgroundColor() }}
      showsVerticalScrollIndicator={false}
    >
      <View style={[{ flex: 1 }, mainStyle.pdH20]}>
        <Text
          style={[mainStyle.mt32, mainStyle.level, { color: "#f00" }, style]}
        >
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
                deleteData: deleteOnly ? "" : "ok",
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
        <ReadMoreComponent
          title={isBn?"গুরুত্বপূর্ণ মেসেজ":"Important message"}
          message={isBn?`1. 'শুধু সদস্য ডিলিট করুন': এই বিকল্পটি আপনার তালিকা থেকে সদস্যকে সরিয়ে দেবে কিন্তু তাদের অর্থপ্রদান এবং ডেটা বজায় রাখবে৷।যদি সদস্য ভবিষ্যতে পুনরায় যোগদান করার সিদ্ধান্ত নেন, তাহলে তাদের অর্থপ্রদানের ইতিহাস এবং ডেটা অ্যাক্সেসযোগ্য থাকবে৷। 

2. 'সদস্য এবং সমস্ত কালেকশন ডিলিট করুন': এই বিকল্পটি নির্বাচন করার মাধ্যমে, কেবল সদস্যকেই সরানো হবে না, সমস্ত সংশ্লিষ্ট পেমেন্ট রেকর্ড এবং ডেটাও স্থায়ীভাবে মুছে ফেলা হবে৷ দয়া করে সতর্কতা অবলম্বন করুন কারণ এবং একবার মুছে ফেলার পর এটি কে আগের অবস্থায় ফেরানো যাবে না৷ পুর্বের যেকোনো পরিশোধ পেমেন্ট আপনার বর্তমান ব্যালেন্স থেকে বিয়োগ করা হবে৷। 

আপনার সদস্য তালিকা এবং আর্থিক রেকর্ডগুলি কার্যকরভাবে পরিচালনা করার জন্য আপনার কমিটির প্রয়োজনীয়তার জন্য সবচেয়ে উপযুক্ত বিকল্পটি বেছে নিন`:`1. 'Delete Only Member': This option will remove the member from your list but will retain their payment and data. If the member decides to rejoin in the future, their payment history and data will remain accessible.

2. 'Delete Member and All Collections': By selecting this option, not only will the member be removed, but all associated payment records and data will also be permanently deleted. Please exercise caution as this action cannot be undone. Any outstanding payments will be deducted from your current balance.
        
Choose the option that best suits your committee's needs to manage your member list and financial records effectivel
        `}
        />

        <View style={[mainStyle.mt24]}/>
      </View>
    </ScrollView>
  );
}
