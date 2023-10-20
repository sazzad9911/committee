import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { AppColors } from "../functions/colors";

export default function Policy() {
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
      <View style={{ marginTop: 16,marginBottom:20,  paddingHorizontal: 20 }}>
        <Text style={styles.text1}>{isBn?"কমিটি অ্যাপের গোপনীয়তার নীতি":"Privacy Policy for Comity App"}</Text>
        <Text style={[styles.text1, styles.mt16]}>
          {isBn?"সর্বশেষ আপডেট করা হয়েছে: [২০/১০/২০২৩]":"Last Updated: [20/10/2023]"}
        </Text>
        <Text style={[styles.text2, styles.mt16]}>{isBn?"১. অ্যাপের তথ্য":"1. App Information"}</Text>
        <Text style={[styles.text1, styles.mt16]}>
          {isBn?`- অ্যাপের নাম: কমিটি
- ডেভেলপার/কোম্পানির নাম: ডিউটি
- প্ল্যাটফর্ম: অ্যান্ড্রয়েড এবং আইওএস
- ওয়েবসাইট: উপলব্ধ নয়`:`- App Name:Comity
- Developer/Company Name: Duty
- Platforms:Android and iOS
- Website:N/A`}
        </Text>

       
        <Text style={[styles.text2, styles.mt16]}>
        {isBn?"২. তথ্য সংগ্রহ":"2. Data Collection"}
        </Text>
        <Text style={[styles.text1, styles.mt16]}>
          {isBn?`আপনি যখন কমিটি-তে সাইন আপ করেন তখন আমরা নিম্নলিখিত ব্যক্তিগত তথ্য সংগ্রহ করি:

- ই-মেইল
- ফোন নম্বর
- ডিভাইস আইডি
- বয়স
- পুরো নাম
- ঠিকানা`:`We collect the following personal information when you sign up for Comity:

- Email
- Phone number
- Device ID
- Age
- Full name
- Address`}
        </Text>
        <Text style={[styles.text2, styles.mt16]}>
        {isBn?"৩. তথ্য ব্যবহার":"3. Data Usage"}
        </Text>
        <Text style={[styles.text1, styles.mt16]}>
         {isBn?`আমরা সংগৃহীত তথ্য নিম্নলিখিত উদ্দেশ্যে ব্যবহার করি:

- ব্যবহারকারীর অ্যাকাউন্ট তৈরি এবং পরিচালনা
- ব্যবহারকারীদের সাথে যোগাযোগ
- কমিটি অ্যাপের সার্ভিস এবং বৈশিষ্ট্যগুলি সরবরাহ করা

আমরা ডেটা গবেষণা করার জন্য কোনও সরঞ্জাম ব্যবহার করি না বা তৃতীয় পক্ষের সাথে ব্যবহারকারীর ডেটা শেয়ার করি না। ভবিষ্যতে, যদি আমরা সাবস্ক্রিপশন সার্ভিস চালু করি, তাহলে ব্যবহারকারীর ডেটা তৃতীয় পক্ষের SDK-এর মাধ্যমে অ্যাকাউন্ট পরিচালনা এবং অর্থপ্রদান প্রক্রিয়াকরণের জন্য ব্যবহার করা যেতে পারে।`:`We use the collected data for the following purposes:

- User account creation and management
- Communication with users
- Providing services and features of the Comity app

We utilize Google services and the Expo SDK for data collection and analysis. In the future, if we introduce subscription services, user data may be used for account management and payment processing through third-party SDKs.`}
        </Text>
        
        <Text style={[styles.text2, styles.mt16]}>{isBn?"৪. তথ্যর ধারণ":'4. Data Retention'}</Text>

        <Text style={[styles.text1, styles.mt16]}>
        {isBn?"ব্যবহারকারীরা তাদের অ্যাকাউন্ট ডিলিট করার পরে, আমরা তাৎক্ষণিকভাবে তাদের ডেটা ডিলিট করে দিই৷":"After users delete their accounts, we delete their data instantly."}
        </Text>

        <Text style={[styles.text2, styles.mt16]}>{isBn?"৫. ব্যবহারকারীর অধিকার":"5. User Rights"}</Text>
        <Text style={[styles.text1, styles.mt16]}>
        {isBn?"ব্যবহারকারীরা অ্যাপের মধ্যে অ্যাকাউন্ট সেটিংস ব্যবহার করে তাদের ডেটা অ্যাক্সেস, আপডেট করতে বা  ডিলিট করতে পারেন৷ আপনি যেকোনো সময় আপনার অ্যাকাউন্ট ডিলিট করতে পারেন এবং তখন আমাদের সিস্টেম থেকেও আপনার ডেটা ডিলিট হয়ে যাবে৷।":"Users can access, update, or delete their data by using the account settings within the app. You can also delete your account at any time, which will remove your data from our system."}
        </Text>
        <Text style={[styles.text2, styles.mt16]}>{isBn?"৬. নিরাপত্তা ব্যবস্থা":"6. Security Measures"}</Text>
        <Text style={[styles.text1, styles.mt16]}>
        {isBn?"আমরা ডেটা নিরাপত্তাকে গুরুত্ব সহকারে নিয়ে থাকি৷।আমাদের কমিটি ব্যবহারকারীর ডেটা জার্মানি এবং বাংলাদেশে অবস্থিত সার্ভারে সংরক্ষণ করা হয়৷।জার্মানি এবং বাংলাদেশের শক্তিশালী তথ্য নিরাপত্তা বিধি রয়েছে৷।":"We take data security seriously. User data is stored on servers located in Germany and Bangladesh. Germany and Bangladesh have strong data protection regulations."}
        </Text>
        <Text style={[styles.text2, styles.mt16]}>{isBn?"৭. কুকিজ এবং ট্র্যাকিং":"7. Cookies and Tracking"}</Text>
        <Text style={[styles.text1, styles.mt16]}>
        {isBn?"কমিটি অ্যাপে আমরা কুকিজ বা ট্র্যাকিং প্রযুক্তি ব্যবহার করি না৷":"We do not use cookies or tracking technologies in the Comity app."}
        </Text>
        <Text style={[styles.text2, styles.mt16]}>{isBn?"৮. ডেটা স্থানান্তর":"8. Data Transfer"}</Text>
        <Text style={[styles.text1, styles.mt16]}>
      {isBn?"জার্মানিতে আমাদের সার্ভার ছাড়াও ব্যবহারকারীর ডেটা বাংলাদেশে স্থানান্তর এবং সংরক্ষণ করা যেতে পারে৷।":"User data may be transferred to and stored in Bangladesh, in addition to our servers in Germany."}
        </Text>
        <Text style={[styles.text2, styles.mt16]}>{isBn?"৯. তৃতীয় পক্ষের সার্ভিসগুলি":"9. Third-Party Services"}</Text>
        <Text style={[styles.text1, styles.mt16]}>
      {isBn?"আমরা ডেটা সংগ্রহ বা অন্যান্য উদ্দেশ্যে অন্য কোনও তৃতীয় পক্ষের SDK ব্যবহার করি না৷":"We do not use any other third-party SDKs for data collection or other purposes."}
        </Text>
        <Text style={[styles.text2, styles.mt16]}>{isBn?"১০. আইনি প্রয়োজনীয়তা সঙ্গে সম্মতি":"10. Compliance with Legal Requirements"}</Text>
        <Text style={[styles.text1, styles.mt16]}>
        {isBn?"আমরা সমস্ত প্রযোজ্য আইন এবং প্রবিধান মেনে চলছি৷।একটি অ্যাকাউন্ট খোলার জন্য ব্যবহারকারীদের কমপক্ষে ১৮ বছর বয়সী হতে হবে। ১৩ বছর বা তার বেশি বয়সী ব্যক্তিরা পিতামাতার অনুমতি নিয়ে একটি অ্যাকাউন্ট খুলতে পারেন৷।":"We comply with all applicable laws and regulations. Users must be at least 18 years old to open an account. Individuals aged 13 or older can open an account with parental permission."}
        </Text>
        <Text style={[styles.text2, styles.mt16]}>{isBn?"১১. যোগাযোগের তথ্য":"11. Contact Information"}</Text>
        <Text style={[styles.text1, styles.mt16]}>
        {isBn?`গোপনীয়তা সংক্রান্ত উদ্বেগ বা ডেটা-সম্পর্কিত অনুসন্ধানের জন্য, আপনি নিম্নলিখিত উপায়ে আমাদের সাথে যোগাযোগ করতে পারেন:

- কমিটি অ্যাপের মধ্যে "আমাদের সাথে যোগাযোগ করুন" বিকল্পের মাধ্যমে
- ইমেল দ্বারা: help.comity@gmail.com`:`For privacy concerns or data-related inquiries, you can contact us in the following ways:

- Through the "Contact Us" option within the Comity app
- By email: help.comity@gmail.com`}
        </Text>
        <Text style={[styles.text2, styles.mt16]}>{isBn?"১২. গোপনীয়তা নীতির আপডেটগুলি":"12. Updates to Privacy Policy"}</Text>
        <Text style={[styles.text1, styles.mt16]}>
        {isBn?`আমরা সময়ের সাথে সাথে আমাদের গোপনীয়তা নীতি আপডেট করতে পারি৷।ব্যবহারকারীদের অ্যাপ-মধ্যস্থ বিজ্ঞপ্তির মাধ্যমে এই আপডেটগুলি সম্পর্কে জানানো হবে৷।আমরা আপনাকে পর্যায়ক্রমে আমাদের গোপনীয়তা নীতি রিভিউ করতে উত্সাহিত করি৷।

অনুগ্রহ করে মনে রাখবেন কমিটি অ্যাপ ব্যবহার করে, আপনি এই গোপনীয়তা নীতিতে বর্ণিত শর্তাবলীতে একমত৷।আপনি যদি আমাদের অনুশীলনের সাথে একমত না হন তবে দয়া করে আমাদের সার্ভিসগুলি ব্যবহার করবেন না৷।`:`We may update our privacy policy from time to time. Users will be notified of these updates through in-app notifications. We encourage you to review our privacy policy periodically.

Please note that by using the Comity app, you agree to the terms outlined in this privacy policy. If you do not agree with our practices, please do not use our services.`}
        </Text>
      </View>
    </ScrollView>
  );
}
