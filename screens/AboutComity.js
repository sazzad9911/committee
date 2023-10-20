import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { AppColors } from "../functions/colors";

export default function AboutComity() {
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
            ? "কমিটিতে স্বাগতম - আপনার বিশ্বস্ত সম্প্রদায় ব্যবস্থাপনা সমাধান"
            : "Welcome to Comity - Your Trusted Community Management Solution"}
        </Text>
        <Text style={[styles.text1, styles.mt16]}>
          {isBn
            ? "কমিটিকে - আমরা সমাজের শক্তি এবং দক্ষ ও নির্বিঘ্ন ব্যবস্থাপনার প্রয়োজনে বিশ্বাস করি৷ এমন একটি বিশ্বে যেখানে প্রযুক্তি একটি অবিশ্বাস্য গতিতে অগ্রসর হচ্ছে, আমরা একটি অ্যাপ তৈরি করেছি যা ব্যক্তি এবং গোষ্ঠীকে তাদের কমিউনিটিগুলিকে পরিচালনা করার উপায়কে উন্নত করার ক্ষমতা দেয়, তা ছোট হোক বা বড় হোক৷"
            : "At Comity, we believe in the power of communities and the need for efficient and seamless management. In a world where technology is advancing at an incredible pace, we have developed an app that empowers individuals and groups to enhance the way they manage their communities, whether small or large."}
        </Text>
        <Text style={[styles.text2, styles.mt16]}>
          {isBn ? "আমাদের লক্ষ্য" : "Our Vision"}
        </Text>
        <Text style={[styles.text1, styles.mt16]}>
          {isBn
            ? "আমাদের লক্ষ্য স্পষ্ট - অত্যাধুনিক প্রযুক্তির মাধ্যমে কমিউনিটি ব্যবস্থাপনায় বিপ্লব ঘটানো৷ কমিটি সমাজ এবং সামাজিক গোষ্ঠীগুলি পরিচালনার জটিলতাগুলিকে সহজ করার জন্য ডিজাইন করা হয়েছে, এটিকে সহজ, আরও নির্ভুল এবং সকলের কাছে অ্যাক্সেসযোগ্য করে তোলে৷"
            : "Our vision is clear - to revolutionize community management through cutting-edge technology. Comity is designed to simplify the complexities of managing communities and social groups, making it easier, more accurate, and accessible to everyone."}
        </Text>
        <Text style={[styles.text2, styles.mt16]}>
          {isBn ? "কমিটি কি করে" : "What Comity Does"}
        </Text>
        <Text style={[styles.text1, styles.mt16]}>
          {isBn
            ? "কমিটি হল কমিউনিটি ম্যানেজমেন্টের জন্য আপনার সর্বাত্মক সমাধান৷ এখানে আমরা যা অফার করি:"
            : "Comity is your all-in-one solution for community management. Here's what we offer:"}
        </Text>
        <Text style={[styles.text1, styles.mt16]}>
          <Text style={styles.text2}>
            {isBn ? "১. কমিটি ম্যানেজমেন্ট:" : "1. Community Management:"}
          </Text>{" "}
          {isBn
            ? "আপনি একটি ছোট সমাজ বা একটি বিশাল সমাজের দায়িত্বে বা যে কোনো দায়িত্বেই থাকুন না কেন, কমিটি সমগ্র ব্যবস্থাপনা প্রক্রিয়াটিকে সুগম করে৷ ইভেন্টগুলি সংগঠিত করা থেকে শুরু করে সদস্যতার রেকর্ডগুলি পরিচালনা করা পর্যন্ত, আমরা আপনাকে কভার করেছি৷"
            : "Whether you're in charge of a small group or a vast community, Comity streamlines the entire management process. From organizing events to handling membership records, we've got you covered."}
        </Text>
        <Text style={[styles.text1, styles.mt16]}>
          <Text style={styles.text2}>
            {isBn
              ? "২. সাবস্ক্রিপশন এবং পেমেন্ট ম্যানেজমেন্ট:"
              : "2. Subscription and Payment Management:"}
          </Text>{" "}
          {isBn
            ? "সাবস্ক্রিপশন পরিচালনা এবং ম্যানুয়ালি পেমেন্ট সংগ্রহের ঝামেলাকে বিদায় জানান৷ কমিটি এই প্রক্রিয়াটিকে স্বয়ংক্রিয় করে, নিশ্চিত করে যে আপনি সত্যিই গুরুত্বপূর্ণ বিষয়গুলির উপর ফোকাস করতে পারেন৷"
            : "Say goodbye to the hassle of managing subscriptions and collecting payments manually. Comity automates this process, ensuring that you can focus on what truly matters."}
        </Text>

        <Text style={[styles.text1, styles.mt16]}>
          <Text style={styles.text2}>
            {isBn ? "৩. ব্যয় ট্র্যাকিং:" : "3. Expense Tracking:"}
          </Text>{" "}
          {isBn
            ? "আমাদের ব্যয় ট্র্যাকিং বৈশিষ্ট্যের সাথে আপনার সমাজের আর্থিক বিষয়গুলি চেক করুন৷ সহজে রেকর্ড করুন এবং খরচ শ্রেণীবদ্ধ করুন, আর্থিক স্বচ্ছতাকে সহজ করুন৷"
            : "Keep your community's finances in check with our expense tracking feature. Easily record and categorize expenses, making financial transparency a breeze."}
        </Text>
        <Text style={[styles.text1, styles.mt16]}>
          <Text style={styles.text2}>
            {isBn ? "৪. ঘোষণা এবং নোটিশ:" : "4. Announcements and Notices:"}
          </Text>{" "}
          {isBn
            ? "গুরুত্বপূর্ণ ঘোষণা করা প্রয়োজন? কমিটি আপনাকে দ্রুত এবং দক্ষতার সাথে সমস্ত সদস্যদের নোটিশ তৈরি এবং প্রকাশ করতে দেয়৷"
            : "Need to make important announcements? Comity allows you to create and publish notices to all members quickly and efficiently."}
        </Text>
        <Text style={[styles.text1, styles.mt16]}>
          <Text style={styles.text2}>
            {isBn ? "৫. রিয়েল-টাইম চ্যাট:" : "5. Real-Time Chat:"}
          </Text>{" "}
          {isBn
            ? "যোগাযোগ গুরুত্বপূর্ণ, এবং কমিটি নিশ্চিত করে যে আপনি আপনার সমাজের সদস্যদের সাথে রিয়েল-টাইমে সংযোগ করতে পারেন৷ এটি জরুরী আপডেট বা নৈমিত্তিক কথোপকথনের জন্যই হোক না কেন, আমাদের চ্যাট সিস্টেম আপনাকে কভার করেছে৷।"
            : "Communication is key, and Comity ensures that you can connect with your community members in real-time. Whether it's for urgent updates or casual conversations, our chat system has you covered."}
        </Text>
        <Text style={[styles.text1, styles.mt16]}>
          <Text style={styles.text2}>
            {isBn ? "৬. পজিশন ম্যানেজমেন্ট:" : "6. Position Management:"}
          </Text>{" "}
          {isBn
            ? "আপনার সমাজের মধ্যে সহজ ভূমিকা এবং দায়িত্ব ঠিক করুন৷ এটি একজন ম্যানেজার, ক্যাশিয়ার, সহকারী বা অন্য যেকোন পদই হোক না কেন, কমিটি আপনাকে ভূমিকা এবং দায়িত্ব অনায়াসে সংজ্ঞায়িত করতে দেয়৷"
            : "Assign roles and responsibilities within your community with ease. Whether it's a manager, cashier, assistant, or any other position, Comity lets you define roles and responsibilities effortlessly."}
        </Text>

        <Text style={[styles.text2, styles.mt16]}>
          {isBn ? "কমিটি কেন?" : "Why Comity?"}
        </Text>

        <Text style={[styles.text1, styles.mt16]}>
          <Text style={styles.text2}>
            {isBn ? "- ব্যবহারকারী-বান্ধব:" : "- User-Friendly:"}
          </Text>{" "}
          {isBn
            ? ` আমাদের ব্যবহারকারী ইন্টারফেসটি সহজ-সরলভাবে ডিজাইন করা হয়েছে৷ কমিটি ব্যবহার করার জন্য আপনাকে প্রযুক্তি বিশেষজ্ঞ হওয়ার দরকার নেই৷।`
            : `Our user interface is designed with simplicity in mind. You don't need to be a tech expert to use Comity effectively.`}
        </Text>
        <Text style={[styles.text1,styles.mt16]}>
          <Text style={styles.text2}>
            {isBn ? "- সময়-সংরক্ষণ:" : "- Time-Saving:"}
          </Text>
          {isBn
            ? ` কমিটি অনেক সময়সাপেক্ষ কাজগুলিকে স্বয়ংক্রিয় করে, এটি সবচেয়ে গুরুত্বপূর্ণ যেখানে আপনি আপনার সময় বিনিয়োগ করতে পারবেন৷`
            : `Comity automates many time-consuming tasks, allowing you to invest your time where it matters most.`}
        </Text>
        <Text style={[styles.text1,styles.mt16]}>
          <Text style={styles.text2}>{isBn ? "- সঠিক:" : "- Accurate:"}</Text>{" "}
          {isBn
            ? ` আমাদের সুনির্দিষ্ট সরঞ্জাম এবং বৈশিষ্ট্যগুলির সাহায্যে সমাজ পরিচালনায় ত্রুটি এবং অসঙ্গতিগুলি দূর করুন৷`
            : `Eliminate errors and discrepancies in community management with our precise tools and features.`}
        </Text>
        <Text style={[styles.text1,styles.mt16]}>
          <Text style={styles.text2}>{isBn ? "- নিরাপদ:" : "- Secure:"}</Text>{" "}
          {isBn
            ? ` আমরা ডেটা নিরাপত্তাকে গুরুত্ব সহকারে নিই৷।আপনার সমাজের তথ্য অত্যাধুনিক নিরাপত্তা ব্যবস্থা দ্বারা সুরক্ষিত৷।`
            : `We take data security seriously. Your community's information is safeguarded with state-of-the-art security measures.`}
        </Text>
      </View>
    </ScrollView>
  );
}
