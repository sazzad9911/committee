import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { post } from "../../apis/multipleApi";
import Button from "../../components/main/Button";
import Input from "../../components/main/Input";
import loader from "../../data/loader";
import toast from "../../data/toast";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";
import ReadMoreComponent from "../../components/ReadMoreComponent";

export default function AddSubscription({ navigation, route }) {
  const { isDark, user, comity } = useSelector((state) => state);
  const isBn = useSelector((state) => state.isBn);
  const values = new AppValues(isBn);
  const colors = new AppColors(isDark);
  const [name, setName] = useState();
  const [quantity, setQuantity] = useState();
  const dispatch = useDispatch();

  //console.log(route?.params?.route);
  const save = () => {
    dispatch(loader.show());
    post(
      "/subs/create/subs",
      {
        name: name,
        amount: quantity,
        comityId: comity.id,
      },
      user.token
    )
      .then((res) => {
        dispatch(loader.hide());
        navigation.navigate(`${route?.params?.route}`);
      })
      .catch((err) => {
        dispatch(loader.hide());
        dispatch(toast.error(err.response.data.msg));
      });
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.getBackgroundColor() }}
      showsHorizontalScrollIndicator={false}
    >
      <View style={[mainStyle.pdH20, mainStyle.mt24]}>
        <Input
          maxLength={20}
          value={name}
          onChange={setName}
          level={`${values.getValues()._subscriptionName} *`}
          subLevel={values.getValues()._max20}
          placeholder={values.getValues()._placeholder1}
        />
        <Input
          maxLength={9}
          value={quantity}
          onChange={setQuantity}
          outSideStyle={mainStyle.mt24}
          level={`${values.getValues()._ammoutSubs} *`}
          keyboardType={"numeric"}
          placeholder={values.getValues()._placeholder2}
        />
        <Button
          onPress={save}
          disabled={name && quantity ? false : true}
          active={name && quantity ? true : false}
          style={mainStyle.mt32}
          title={values.getValues()._ok}
        />
        <ReadMoreComponent
          textColor={colors.getTextColor()}
          title={isBn ? "গুরুত্বপূর্ণ মেসেজ" : "Important message"}
          message={
            isBn ? (
              <>
                <Text>
                  <Text style={{ fontWeight: "bold" }}>১. পেমেন্টের নাম:</Text>{" "}
                  এখানে আপনি যে কারণে অর্থ সংগ্রহ করতে চান তার একটি নাম উল্লেখ
                  করুন। উদাহরণস্বরূপ, আপনি যদি একটি সমাজ অথবা কমিটি পরিচালনা করে
                  থাকেন , তাহলে আপনি এটির নাম দিতে পারেন{" "}
                  <Text style={{ fontWeight: "bold", color: "red" }}>
                    'কমিটি/সমাজের উন্নয়ন,বেতন,ফি
                  </Text>{" "}
                  বা আপনার অর্থপ্রদানের ধরনকে সেরাভাবে উপস্থাপন করে এমন একটি নাম
                  আর যদি আপনি এটি বাড়ি ভাড়া ব্যবস্থাপনার জন্য করতে চান, তাহলে
                  আপনি{" "}
                  <Text style={{ fontWeight: "bold", color: "red" }}>
                    'বাড়ি ভাড়া' বা 'অ্যাপার্টমেন্ট ভাড়া'
                  </Text>{" "}
                  লিখতে পারেন আপনার প্রয়োজনের সাথে সাথে আপনি সর্বদা এই নামটি
                  যেকোনো সময় পরিবর্তন করতে পারেন।{"\n\n"}{" "}
                  <Text style={{ fontWeight: "bold" }}>২. লক্ষ্য পরিমাণ:</Text>{" "}
                  এটি হল আনুমানিক পরিমাণ যা আপনি সংগ্রহ করতে চান এটি আপনার কমিটি
                  ,সমাজ কার্যকলাপ বা বাড়ি ভাড়ার জন্য হোক না কেন আপনি আপানার
                  পছন্দমত পরিমাণ সেট করুন আপনার আর্থিক লক্ষ্যগুলির সাথে সারিবদ্ধ
                  করার জন্য যে কোনো সময় এই পরিমাণ পরিবর্তন করতে পারবেন ৷{" "}
                  {"\n\n"}নির্দ্বিধায় আপনার পেমেন্টের নাম এবং আপনার নির্দিষ্ট
                  প্রয়োজনীয়তার সাথে মানানসই লক্ষ্য পরিমাণ কাস্টমাইজ করুন আমরা
                  আপনাকে সহজ করতে এবং দক্ষতার সাথে আপনার আর্থিক পরিচালনা করতে
                  সাহায্য করতে সর্বধা প্রস্তুত"{"\n\n"}
                </Text>
              </>
            ) : (
              <>
                <Text>
                  <Text style={{ fontWeight: "bold" }}>1. Payment Name:</Text>{" "}
                  This is where you specify the purpose or category of the money
                  you want to collect. For instance, if you're managing a
                  community, you can name it{" "}
                  <Text style={{ fontWeight: "bold", color: "red" }}>
                    'Development,' 'Salary,' 'Fees,'
                  </Text>{" "}
                  or anything that best represents the type of payment. If it's
                  for house rent management, you might choose{" "}
                  <Text style={{ fontWeight: "bold", color: "red" }}>
                    'House Rent' or 'Apartment Rent.'
                  </Text>{" "}
                  You can always edit this name as your needs evolve.{"\n\n"}{" "}
                  <Text style={{ fontWeight: "bold" }}>2. Target Amount:</Text>{" "}
                  This is the approximate sum you aim to collect. Whether it's
                  for your community's activities or house rent, set the desired
                  amount. You have the flexibility to adjust this amount at any
                  time to align with your financial goals. {"\n\n"}Feel free to
                  customize your payment name and target amount to fit your
                  specific requirements. We're here to help you simplify and
                  manage your finances efficiently."{"\n\n"}
                </Text>
              </>
            )
          }
        />
      </View>
    </ScrollView>
  );
}
