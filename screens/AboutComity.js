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
      }}
    >
      <View style={{ marginTop: 16, marginBottom: 20, paddingHorizontal: 20 }}>
        <Text style={styles.text1}>
          {isBn
            ? "আপনি কি অনেক কাগজপত্র, মিস পেমেন্ট এবং আপনার সমাজ বা সম্পত্তি ব্যবস্থাপনার মধ্যে বিশৃঙ্খল যোগাযোগের জন্য ক্লান্ত? কমিটিকে হ্যালো বলুন, জীবন পরিবর্তনকারি অ্যাপটি আপনার সমাজকে পরিচালনা করার জন্য ডিজাইন করা হয়েছে, তা সামাজিক গোষ্ঠী হোক, রাজনৈতিক সংগঠন হোক, আবাসিক কমপ্লেক্স হোক বা বাসা বাড়ি ভাড়া হোক ৷ আমাদের প্রতিষ্ঠাতা, ইয়াছিন  আরাফাত, সমাজ পরিচালনাকে স্ট্রীমলাইন করার জন্য একটি শক্তিশালী হাতিয়ার তৈরি করেছেন৷"
            : "Are you tired of the endless paperwork, missed payments, and chaotic communication within your community or property management? Say hello to Comity, the game-changing app designed to transform the way you manage your community, whether it's a social group, a political organization, or a residential complex.Our founder, Easin Arafat, has crafted a powerful tool to streamline community management."}
        </Text>

        <Text style={[styles.text2, styles.mt16]}>
          {isBn
            ? "প্রচেষ্টাহীন সমাজ এবং সম্পত্তি ব্যবস্থাপনা"
            : "Effortless Community and Property Management"}
        </Text>
        <Text style={[styles.text1, styles.mt16]}>
          {isBn
            ? "কমিটি ছোট গোষ্ঠী থেকে বৃহৎ সমাজের সবকিছু পরিচালনাকে সহজ করে৷ এটি আপনার স্থানীয় আশেপাশের সমিতি হোক বা একটি ব্যস্ত অ্যাপার্টমেন্ট কমপ্লেক্স হোক, আমাদের অ্যাপটি আপনার চাহিদা মেটাতে তৈরি করা হয়েছে৷।এটি কেবল আপনার সমাজ পরিচালনার বিষয়ে নয়, বাড়ি এবং ফ্ল্যাট ভাড়া, সদস্যতা, অর্থপ্রদান সংগ্রহ, খরচ এবং নোটিশ, বিজ্ঞপ্তির মাধ্যমে সবাইকে অবহিত রাখাও দেখায়৷"
            : "Comity simplifies managing everything from small groups to large communities. Whether it's your local neighborhood association or a bustling apartment complex, our app is tailored to meet your needs. It's not just about managing your community, but also overseeing house and flat rentals, subscriptions, payment collection, expenses, and keeping everyone informed with announcements."}
        </Text>
        <Text style={[styles.text2, styles.mt16]}>
          {isBn ? "রিয়েল-টাইম যোগাযোগ" : "Real-Time Communication"}
        </Text>
        <Text style={[styles.text1, styles.mt16]}>
          {isBn
            ? "কমিটি এর রিয়েল-টাইম চ্যাট সিস্টেম নিশ্চিত করে যে আপনি তাৎক্ষণিকভাবে আপনার সমাজের সদস্যদের সাথে সংযোগ করতে পারেন৷ একটি জরুরী বিষয়ে আলোচনা বা একটি গুরুত্বপূর্ণ সিদ্ধান্তে মতামত সংগ্রহ করা প্রয়োজন? কমিটির যোগাযোগ ব্যবস্থা এটিকে সহজ করে তোলে। এছাড়াও, আপনার কমিউনিটি ম্যানেজমেন্ট টিম অনায়াসে সদস্যদের সাথে যোগাযোগ রাখতে পারে৷"
            : "Comity's real-time chat system ensures that you can connect with your community members instantly. Need to discuss an urgent matter or gather opinions on an important decision? Comity makes communication a breeze. Plus, your community management team can stay in touch with members effortlessly."}
        </Text>

        <Text style={[styles.text2, styles.mt16]}>
          {isBn ? "নমনীয় অবস্থান ব্যবস্থা" : "Flexible Position System"}
        </Text>

        <Text style={[styles.text1, styles.mt16]}>
          {isBn
            ? "আমাদের অ্যাপটি একটি অনন্য পজিশন সিস্টেম অফার করে যা আপনাকে আপনার সমাজের মধ্যে ভূমিকা এবং দায়িত্ব বরাদ্দ করতে দেয়৷।ম্যানেজার, ক্যাশিয়ার, সহকারী এবং আরও অনেক কিছু ভূমিকা যোগ করে একটি সুগঠিত এবং দক্ষ ব্যবস্থাপনা পদ্ধতি সক্রিয় করে৷ এই বৈশিষ্ট্যটি সংগঠন এবং স্বচ্ছতার একটি স্তর যুক্ত করে যা ঐতিহ্যবাহী সমাজ ব্যবস্থাপনা পদ্ধতিতে খুব অভাব ছিল৷"
            : "Our app offers a unique position system that allows you to assign roles and responsibilities within your community. Appoint managers, cashiers, assistants, and more, enabling a well-structured and efficient management approach. This feature adds a layer of organization and clarity that was sorely lacking in traditional community management methods."}
        </Text>
        <Text style={[styles.text2, styles.mt16]}>
          {isBn
            ? "কমিউনিটি ম্যানেজমেন্ট উন্নত করা"
            : "Enhancing Community Management"}
        </Text>
        <Text style={[styles.text1, styles.mt16]}>
          {isBn
            ? "আজকের দ্রুত-গতির বিশ্বে, প্রযুক্তি মারাত্মক গতিতে বিকশিত হচ্ছে৷।কমিটি এই প্রযুক্তিগত অগ্রগতিগুলিকে আলিঙ্গন করার জন্য ডিজাইন করা হয়েছে এবং কমিউনিটি ম্যানেজমেন্টকে আরও দক্ষ এবং সুনির্দিষ্ট করার জন্য তাদের ব্যবহার করে৷ এটি জটিল প্রক্রিয়াগুলিকে সরলীকরণ এবং সমাজ পরিচালনার ক্ষমতা বাড়ানোর বিষয়ে তৈরি করা হয়েছে, যাতে আপনি সত্যিই গুরুত্বপূর্ণ বিষয়গুলিতে ফোকাস করতে পারেন৷"
            : "In today's fast-paced world, technology is evolving at breakneck speed. Comity is designed to embrace these technological advancements and harness them to make community management more efficient and precise. It's about simplifying complex processes and enhancing community management capabilities, so you can focus on what truly matters."}
        </Text>
        <Text style={[styles.text1, styles.mt16]}>
          {isBn
            ? "কমিটি-এর সাথে, আপনার সমাজের ভবিষ্যত আগের চেয়ে আরও উজ্জ্বল দেখাচ্ছে৷ সমাজ এবং বাসা,বাড়ি এবং ফ্লাট ভাড়া ব্যবস্থাপনার একটি নতুন যুগে স্বাগতম যা আরও সংগঠিত, দক্ষ এবং ব্যবহারকারী-বান্ধব৷ কমিটি এর সাথে কমিউনিটি ম্যানেজমেন্টের ভবিষ্যতকে আলিঙ্গন করতে আমাদের সাথে যোগ দিন৷"
            : "With Comity, your community's future is looking brighter than ever. Welcome to a new era of community and property management that is more organized, efficient, and user-friendly. Join us in embracing the future of community management with Comity."}
        </Text>
      </View>
    </ScrollView>
  );
}
