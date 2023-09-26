import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import Button from "../../components/main/Button";
import Input from "../../components/main/Input";
import ReadMoreComponent from "../../components/ReadMoreComponent";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";

export default function SelectMemberType({ navigation, route }) {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const values = new AppValues(isBn);
  const headlines = values.getValues();
  const colors = new AppColors(isDark);
  const subscription = route?.params?.subscription;
  const data = route?.params?.data;
  const paid = route?.params?.paid;
  const routes = navigation.getState()?.routes;
  const prevRoute = routes[routes.length - 2];
  console.log(prevRoute?.name);

  return (
    <ScrollView
      style={{
        backgroundColor: colors.getBackgroundColor(),
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={[{ flex: 1 }, mainStyle.pdH20]}>
        {prevRoute?.name == "SubscriptionDetails" && (
          <Text
            style={[
              mainStyle.mt32,
              mainStyle.text20,
              { color: colors.getTextColor() },
            ]}
          >
            {headlines._selectPayee}
          </Text>
        )}
        <Button
          onPress={() => {
            navigation.navigate("AllMember", {
              subscription: subscription,
              data: data,
              paid: paid,
            });
          }}
          style={mainStyle.mt32}
          title={
            prevRoute?.name == "SubscriptionDetails"
              ? headlines._addFromComity
              : headlines._addFromComityAlt
          }
          active={true}
        />
        <Button
          onPress={() => {
            navigation.navigate("CreateOwnMember", {
              subscription: subscription,
              data: data,
              paid: paid,
            });
          }}
          style={mainStyle.mt12}
          title={headlines._createMemberOwn}
          active={true}
        />
        <ReadMoreComponent
          title={isBn ? "গুরুত্বপূর্ণ মেসেজ" : "Important message"}
          message={
            prevRoute?.name == "SubscriptionDetails"
              ? isBn
                ? "একটি পেমেন্ট কালেকশন শুরু করার জন্য, আপনার কাছে দুটি বিকল্প রয়েছে৷ প্রথমত, আপনি আপনার বর্তমান সদস্য তালিকা থেকে অর্থপ্রদানকারী সদস্যকে নির্বাচন করতে পারেন৷ বিকল্পভাবে, যদি সদস্য তালিকাভুক্ত না হয়, আপনি 'একটি নতুন সদস্য তৈরি করুন' বাটনে ক্লিক করে একটি নতুন সদস্য তৈরি করতে পারেন৷ দয়া করে মনে রাখবেন যে আপনি যখন একটি নতুন সদস্য তৈরি করবেন, তখন তারা সহজেই আপনার সদস্য তালিকায় যুক্ত হবে৷ নতুন সদস্যদের অফলাইন সদস্য হিসাবে নির্ধারিত করা হবে, এবং শুধুমাত্র আপনি তাদের কালেকশনগুলি দেখতে পাবেন৷ এই বৈশিষ্ট্যটি আপনার কমিটির আর্থিক লেনদেনের শান্তিপূর্ণ ব্যবস্থাপনা নিশ্চিত করে"
                : "To initiate a payment collection, you have two options. Firstly, you can select the paying member from your existing member list. Alternatively, if the member is not listed, you can create a new member by clicking the 'Create a New Member' button. Please note that when you create a new member, they will be automatically added to your member list. New members will be designated as offline members, and only you will have visibility into their collections. This feature ensures seamless management of your committee's financial transactions"
              : isBn
              ? `আপনার কমিটিতে একজন সদস্য যুক্ত করার সময়, আপনার কাছে দুটি বিকল্প রয়েছে:

1. 'কমিটি ব্যবহারকারীদের থেকে যুক্ত করুন': এই বিকল্পটি এমন ব্যবহারকারীদের জন্য যাদের ইতিমধ্যেই একটি কমিটি অ্যাকাউন্ট রয়েছে৷ আপনি তাদের নাম সার্চ করে তাদের সনাক্ত করতে এবং আমন্ত্রণ জানাতে পারেন৷ একটি যোগদানের অনুরোধ পাঠানোর পরে, তারা গ্রহণ করলেই তারা আপনার সদস্য তালিকায় যুক্ত হবে৷
              
2. 'একজন সদস্য তৈরি করুন': আপনি নিজ থেকে এমন একজন সদস্য তৈরি করতে এই বিকল্পটি ব্যবহার করুন৷ যার কমিটি প্ল্যাটফর্মে অ্যাকাউন্ট নেই৷ দয়া করে মনে রাখবেন যে আপনি যদি আপনি নিজ থেকে একজন সদস্য তৈরি করেন তবে তাদের অর্থপ্রদানের ডেটা এবং তথ্য শুধুমাত্র আপনার কাছে অ্যাক্সেসযোগ্য হবে৷ আপনি চাইলে নিজ থেকে তৈরি করা সদস্যের প্রোফাইলে গিয়ে আপনি তার অ্যাকাউন্টকে একজন প্রকৃত কমিটি ব্যবহারকারীর সাথে মার্জ করতে পারেন৷
              
আপনার প্রয়োজন অনুসারে বিকল্পটি নির্বাচন করুন এবং আপনার সম্প্রদায়ের সদস্যদের নিরাপদ ব্যবস্থাপনা নিশ্চিত করুন`
              : `When adding a member to your comity, you have two options:

1. 'Add From Comity Users': This option is for users who already have a comity account. You can locate and invite them by searching for their name. After sending a join request, they will be added to your member list once they accept.
              
2. 'Create a Member Manually': Use this option to manually create a member who may not have a real account on the comity platform. Please note that if you create a member manually, their payment data and information will be accessible only to you. Additionally, you can merge their account with a real user if necessary.
              
Select the option that suits your needs and ensures seamless management of your comity members`
          }
          textColor={colors.getTextColor()}
        />
      </View>
    </ScrollView>
  );
}
