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
      <View style={{ marginTop: 16,marginBottom:20,  paddingHorizontal: 20 }}>
        <Text style={styles.text1}>Welcome to Comity - Your Trusted Community Management Solution</Text>
        <Text style={[styles.text1, styles.mt16]}>
        At Comity, we believe in the power of communities and the need for efficient and seamless management. In a world where technology is advancing at an incredible pace, we have developed an app that empowers individuals and groups to enhance the way they manage their communities, whether small or large.
        </Text>
        <Text style={[styles.text2, styles.mt16]}>Our Vision</Text>
        <Text style={[styles.text1, styles.mt16]}>
        Our vision is clear - to revolutionize community management through cutting-edge technology. Comity is designed to simplify the complexities of managing communities and social groups, making it easier, more accurate, and accessible to everyone.
        </Text>
        <Text style={[styles.text2, styles.mt16]}>
        What Comity Does
        </Text>
        <Text style={[styles.text1, styles.mt16]}>
        Comity is your all-in-one solution for community management. Here's what we offer:
        </Text>
        <Text style={[styles.text1, styles.mt16]}>
        <Text style={styles.text2}>1. Community Management:</Text> Whether you're in charge of a small group or a vast community, Comity streamlines the entire management process. From organizing events to handling membership records, we've got you covered.
        </Text>
        <Text style={[styles.text1, styles.mt16]}>
        <Text style={styles.text2}>2. Subscription and Payment Management:</Text>  Say goodbye to the hassle of managing subscriptions and collecting payments manually. Comity automates this process, ensuring that you can focus on what truly matters.
        </Text>

        <Text style={[styles.text1, styles.mt16]}>
        <Text style={styles.text2}>3. Expense Tracking:</Text> Keep your community's finances in check with our expense tracking feature. Easily record and categorize expenses, making financial transparency a breeze.
        </Text>
        <Text style={[styles.text1, styles.mt16]}>
        <Text style={styles.text2}>4. Announcements and Notices:</Text> Need to make important announcements? Comity allows you to create and publish notices to all members quickly and efficiently.
        </Text>
        <Text style={[styles.text1, styles.mt16]}>
        <Text style={styles.text2}>5. Real-Time Chat:</Text> Communication is key, and Comity ensures that you can connect with your community members in real-time. Whether it's for urgent updates or casual conversations, our chat system has you covered.
        </Text>
        <Text style={[styles.text1, styles.mt16]}>
        <Text style={styles.text2}>6. Position Management:</Text> Assign roles and responsibilities within your community with ease. Whether it's a manager, cashier, assistant, or any other position, Comity lets you define roles and responsibilities effortlessly.
        </Text>
        
        <Text style={[styles.text2, styles.mt16]}>Why Comity?</Text>

        <Text style={[styles.text1, styles.mt16]}>
          {`- User-Friendly: Our user interface is designed with simplicity in mind. You don't need to be a tech expert to use Comity effectively.

- Time-Saving: Comity automates many time-consuming tasks, allowing you to invest your time where it matters most.

- Accurate: Eliminate errors and discrepancies in community management with our precise tools and features.

- Secure: We take data security seriously. Your community's information is safeguarded with state-of-the-art security measures.`}
        </Text>

       
      </View>
    </ScrollView>
  );
}
