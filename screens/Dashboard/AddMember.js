import React, { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { post } from "../../apis/multipleApi";
import Button from "../../components/main/Button";
import Input from "../../components/main/Input";
import RadioButton from "../../components/main/RadioButton";
import ReadMoreComponent from "../../components/ReadMoreComponent";
import loader from "../../data/loader";
import toast from "../../data/toast";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";

export default function AddMember({ navigation, route }) {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);

  const values = new AppValues(isBn);
  const headlines = values.getValues();
  const colors = new AppColors(isDark);
  const [position, setPosition] = useState();
  const data = route?.params?.data;
  const { comity, user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [explain, setExplain] = useState();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.getBackgroundColor(),
          marginHorizontal: 20,
        }}
      >
        <Input
          level={headlines._position}
          placeholder={headlines._exampleGeneral}
          subLevel={headlines._max20}
          value={explain}
          onChange={setExplain}
          optionalLevel={headlines._required}
          outSideStyle={[mainStyle.mt32]}
        />
        <Text
          style={[
            mainStyle.mt24,
            mainStyle.text20,
            { color: colors.getTextColor() },
          ]}
        >
          {headlines._selectAmembershipPlan}
        </Text>
        <View
          style={[
            mainStyle.flexBox,
            { paddingVertical: 15, justifyContent: "flex-start" },
          ]}
        >
          <RadioButton
            value={position == "General" ? true : false}
            title={headlines._generalMember}
            onChange={() => setPosition("General")}
          />
          <RadioButton
            value={position == "Special" ? true : false}
            style={mainStyle.ml16}
            title={headlines._specialMember}
            onChange={() => setPosition("Special")}
          />
        </View>
        <Button
          onPress={async () => {
            dispatch(loader.show());
            try {
              await post(
                "/member/create",
                {
                  comityId: comity.id,
                  position: explain,
                  userId: data.id,
                  category: position,
                },
                user.token
              );
              dispatch(loader.hide());
              dispatch(toast.success("Request send"));
              navigation.goBack();
            } catch (e) {
              dispatch(loader.hide());
              dispatch(toast.error("Failed to create"));
            }
          }}
          style={[mainStyle.mt32]}
          active={position && explain ? true : false}
          disabled={!position || !explain ? true : false}
          title={headlines._requestForMember}
        />
        <ReadMoreComponent
          message={
            isBn
              ? `কমিটির মধ্যে সদস্যদের অবস্থান উল্লেখ করুন৷ আপনি আপনার কমিটির কাঠামোর উপর ভিত্তি করে যেকোন পদ, যেমন 'সাধারণ সদস্য' বা অন্যান্য উপযুক্ত ভূমিকা প্রদান করতে পারেন৷।

সদস্য বিভাগ নির্বাচন করুন:
    - 'সাধারণ সদস্য': এই বিকল্পটি সদস্যকে একটি নিয়মিত কমিটির সদস্য হিসেবে নির্বাচিত করে৷।
    - 'বিশেষ সদস্য': এই বিকল্পটি বেছে নিন যদি কমিটির মধ্যে সদস্যের একটি নির্দিষ্ট ভূমিকা থাকে, যেমন ম্যানেজার বা নেতা৷।
          
এই বিশদ বিবরণ প্রদান করে, আপনি নিশ্চিত করেন যে নতুন সদস্যের ভূমিকা এবং ধরন সঠিকভাবে কমিটির মধ্যে সংজ্ঞায়িত করা হয়েছে, আপনার কমিটির পরিচালনা প্রক্রিয়াকে সহজসাধ্য করে`
              : `Specify the member's position within the committee. You can assign any position, such as 'General Member' or other suitable roles based on your committee's structure.

Select the member category:
   - 'General Member': This option designates the member as a regular committee member.
   - 'Special Member': Choose this option if the member holds a specific role within the committee, such as manager or leader.

By providing these details, you ensure that the new member's role and type are accurately defined within the committee, streamlining your committee management process."`
          }
          textColor={colors.getTextColor()}
        />
      </View>
    </ScrollView>
  );
}
