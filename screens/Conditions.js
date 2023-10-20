import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { AppColors } from "../functions/colors";

export default function Conditions() {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const colors = new AppColors(isDark);
  const values = new AppColors(isBn);
  const styles = StyleSheet.create({
    text1: {
      fontSize: 14,
      fontWeight: "400",
      color: colors.getTextColor(),
    },
    text2: {
      fontSize: 14,
      fontWeight: "700",
      color: colors.getTextColor(),
    },
    mt16: {
      marginTop: 16,
    },
  });
  return (
    <ScrollView
      style={{
        backgroundColor: colors.getBackgroundColor(),
      }}>
      <View style={{ marginTop: 16, marginBottom: 20, paddingHorizontal: 20 }}>
        <Text style={styles.text1}>
          {isBn
            ? "কমিটি অ্যাপের শর্তাবলী"
            : "Terms and Conditions for Comity App"}
        </Text>
        <Text style={[styles.text1, styles.mt16]}>
          {isBn
            ? "সর্বশেষ আপডেট করা হয়েছে: [২০/১০/২০২৩]]"
            : "Last Updated: [20/10/2023]"}
        </Text>
        <Text style={[styles.text2, styles.mt16]}>
          {isBn ? "১. অ্যাপের উদ্দেশ্য" : "1. App Purpose"}
        </Text>
        <Text style={[styles.text1, styles.mt16]}>
          {isBn
            ? "কমিটি হল একটি অ্যাপ যা ছোট এবং বড় উভয় সমাজ বা সামাজিক গোষ্ঠীর পরিচালনার সুবিধার্থে ডিজাইন করা হয়েছে৷ এর বৈশিষ্ট্যগুলির মধ্যে রয়েছে কমিউনিটি সাবস্ক্রিপশন এবং অর্থপ্রদান ব্যবস্থাপনা, ব্যয় ট্র্যাকিং, ঘোষণা তৈরি এবং প্রকাশনা, সমাজের সদস্য এবং প্রশাসকদের মধ্যে যোগাযোগের জন্য রিয়েল-টাইম চ্যাট, ভূমিকা নির্ধারণের জন্য একটি অবস্থান ব্যবস্থা এবং রিয়েল-টাইম আপডেটের জন্য একটি বিজ্ঞপ্তি সিস্টেম৷। কমিটি-এর লক্ষ্য হল কমিউনিটি ব্যবস্থাপনার নির্ভুলতা এবং দক্ষতা বৃদ্ধি করা৷"
            : "Comity is an app designed to facilitate the management of both small and large communities or social groups. Its features include community subscription and payment management, expense tracking, announcement creation and publishing, real-time chat for communication between community members and administrators, a position system for assigning roles, and a notification system for real-time updates. Comity aims to enhance community management accuracy and efficiency."}
        </Text>
        <Text style={[styles.text2,styles.mt16]}>{isBn?"২. ব্যবহারকারীর অ্যাকাউন্টের প্রকারভেদ":"2. User Account Types"}</Text>
        <Text style={[styles.text1, styles.mt16]}>
          <Text style={styles.text2}>{isBn?"সাধারণ ব্যবহারকারীর অ্যাকাউন্ট:":"Normal User Account:"}</Text> {isBn?"ব্যবহারকারীরা একটি সাধারণ ব্যবহারকারীর অ্যাকাউন্টের জন্য সাইন আপ করতে পারে, যাতে তারা কমিটি ভিজিট করতে, কমিটির প্রোফাইলগুলি দেখতে এবং বিভিন্ন  কমিটিতে যোগদান করতে পারে৷ ব্যবহারকারীদের কাছে অ্যাপের মধ্যে সহায়তা কেন্দ্রে প্রবেশ করে যে কোনো সময় তাদের অ্যাকাউন্ট মুছে ফেলার বিকল্প রয়েছে৷।":"Users can sign up for a normal user account, allowing them to explore Comity, visit community profiles, and join various communities. Users have the option to delete their accounts at any time by accessing the support center within the app."}
        </Text>
        <Text style={[styles.text1, styles.mt16]}>
          <Text style={styles.text2}>{isBn?"কমিটি অ্যাকাউন্ট:":"Comity Account:"}</Text> {isBn?` কমিটি অ্যাকাউন্টগুলি তাদের জন্য ডিজাইন করা হয়েছে যারা তাদের সমাজ বা সামাজিক গোষ্ঠীগুলি তৈরি এবং পরিচালনা করতে চান৷ কমিটি অ্যাকাউন্ট হোল্ডাররা কমিউনিটি ম্যানেজমেন্টের জন্য অতিরিক্ত বৈশিষ্ট্যগুলি ব্যবহার করতে পারেন৷ অনুগ্রহ করে মনে রাখবেন যে এখন পর্যন্ত, কমিটি অ্যাকাউন্ট বিনামূল্যে প্রদান করা হয়৷ ভবিষ্যতে, আমরা কমিটি অ্যাকাউন্টের জন্য অর্থপ্রদানের সাবস্ক্রিপশন প্ল্যান করতে পারি৷`:`Comity accounts are designed for those who wish to create and manage their communities or social groups. Comity account holders can utilize additional features for community management. Please note that as of now, Comity accounts are provided free of charge. In the future, we may introduce paid subscription plans for Comity accounts.`}
        </Text>
        <Text style={[styles.text2, styles.mt16]}>
        {isBn?"৩. ব্যবহারকারীর দায়িত্ব":"3. User Responsibilities"}
        </Text>
        <Text style={[styles.text1, styles.mt16]}>
        {isBn?"ব্যবহারকারীরা কমিটি এর উদ্দেশ্য অনুসারে ব্যবহার করার জন্য দায়বদ্ধ ৷ এর মধ্যে রয়েছে:":"Users are responsible for using Comity in accordance with its intended purpose. This includes:"}
        </Text>
        <Text style={[styles.text1, styles.mt16]}>
          {isBn?`- এই ডকুমেন্টের উল্লিখিত নিয়ম ও শর্তাবলী মেনে চলা৷।
- সমাজ পরিচালনার নিয়ম এবং নির্দেশিকাকে সম্মান করা৷।
- রেজিস্ট্রেশনের সময় এবং অ্যাপ ব্যবহার করার সময় সঠিক তথ্য প্রদান করা৷।
- অন্যান্য ব্যবহারকারী এবং সমাজের সদস্যদের সাথে যোগাযোগ করার সময় শ্রদ্ধাশীল হওয়া৷`:`- Abiding by the terms and conditions set forth in this document.
- Respecting the rules and guidelines for community management.
- Providing accurate information during registration and while using the app.
- Being respectful and considerate when communicating with other users and community members.`}
        </Text>
        <Text style={[styles.text2, styles.mt16]}>
        {isBn?"৪. নিষিদ্ধ কার্যক্রম":"4. Prohibited Activities"}
        </Text>
        <Text style={[styles.text1, styles.mt16]}>
        {isBn?"কমিটিতে নিষিদ্ধ কার্যক্রমের মধ্যে রয়েছে:":"Prohibited activities on Comity include:"}
        </Text>
        <Text style={[styles.text1, styles.mt16]}>
          {isBn?`- যে কোনো ধরনের হয়রানি, গুন্ডামি বা ঘৃণাত্মক বক্তব্যে জড়িত হওয়া৷।
- অনুপযুক্ত বিষয়বস্তু শেয়ার বা বিতরণ৷।
- অন্যান্য ব্যবহারকারীর অ্যাকাউন্ট বা কমিটি প্রোফাইলে অননুমোদিত অ্যাক্সেস৷।
- প্রযোজ্য আইন বা নিয়ম ভঙ্গ করে এমন কোনো কাজ৷।`:`- Engaging in any form of harassment, bullying, or hate speech.
- Sharing or distributing inappropriate content.
- Unauthorized access to other user accounts or community profiles.
- Any actions that violate applicable laws or regulations.
`}
        </Text>
        <Text style={[styles.text2, styles.mt16]}>{isBn?"৫. অ্যাকাউন্ট সমাপ্তি":"5. Account Termination"}</Text>

        <Text style={[styles.text1, styles.mt16]}>
          {isBn?`নিয়ম ও শর্তাবলী ভঙ্গের ক্ষেত্রে বা প্রয়োজনীয় বলে মনে করা অন্য কোন কারণে ব্যবহারকারীর অ্যাকাউন্টগুলি বন্ধ বা স্থগিত করার অধিকার কমিটি রয়েছে৷ অ্যাকাউন্টগুলি ব্যবহারকারীর অনুরোধে মুছে ফেলা হতে পারে, বোঝার সাথে যে এই কাজটি স্থায়ী এবং অপরিবর্তনীয়৷`:`Comity reserves the right to terminate or suspend user accounts in the event of violations of the terms and conditions or for any other reason deemed necessary. Accounts may be deleted at the user's request, with the understanding that this action is permanent and irreversible.`}
        </Text>

        <Text style={[styles.text2, styles.mt16]}>{isBn?"৬. ডেটা ব্যবহার":"6. Data Usage"}</Text>
        <Text style={[styles.text1, styles.mt16]}>
         {isBn?`কমিটি আমাদের গোপনীয়তা নীতিতে বর্ণিত হিসাবে ডেটা সংগ্রহ করে এবং ব্যবহার করে৷ ব্যবহারকারীর ডেটা প্রযোজ্য ডেটা সুরক্ষা আইন অনুসারে পরিচালিত হয়৷।`:`Comity collects and uses data as outlined in our Privacy Policy. User data is handled in accordance with applicable data protection laws.`}
        </Text>
        <Text style={[styles.text2, styles.mt16]}>
          {isBn?"৭. পরিবর্তনের বিজ্ঞপ্তি":"7. Notification of Changes"}
        </Text>
        <Text style={[styles.text1, styles.mt16]}>
         {isBn?`ব্যবহারকারীদের অ্যাপের বিজ্ঞপ্তি এরিয়ার মধ্যে নিয়ম ও শর্তাবলী বা গোপনীয়তা নীতির আপডেট সম্পর্কে জানাতে হবে৷`:`Users will be notified of updates to the terms and conditions or the privacy policy within the app's notification area.`}
        </Text>
        <Text style={[styles.text2, styles.mt16]}>{isBn?"৮. বয়সের সীমাবদ্ধতা":"8. Age Restrictions"}</Text>
        <Text style={[styles.text1, styles.mt16]}>
          {isBn?`একটি ব্যবহারকারী অ্যাকাউন্ট খুলতে ব্যবহারকারীদের কমপক্ষে 18 বছর বয়সী হতে  হবে৷ 13 বছর বা তার বেশি বয়সের ব্যক্তিরা অভিভাবকদের অনুমতি নিয়ে একটি ব্যবহারকারী অ্যাকাউন্ট খুলতে পারেন৷।`:`Users must be at least 18 years old to open a user account. Individuals aged 13 or older can open a user account with parental permission.`}
        </Text>
      </View>
    </ScrollView>
  );
}
