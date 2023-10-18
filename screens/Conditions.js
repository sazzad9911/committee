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
      <View style={{ marginTop: 16,marginBottom:20,  paddingHorizontal: 20 }}>
        <Text style={styles.text1}>Terms and Conditions for Comity App</Text>
        <Text style={[styles.text1, styles.mt16]}>
          Last Updated: [20/10/2023]
        </Text>
        <Text style={[styles.text2, styles.mt16]}>1. App Purpose</Text>
        <Text style={[styles.text1, styles.mt16]}>
          Comity is an app designed to facilitate the management of both small
          and large communities or social groups. Its features include community
          subscription and payment management, expense tracking, announcement
          creation and publishing, real-time chat for communication between
          community members and administrators, a position system for assigning
          roles, and a notification system for real-time updates. Comity aims to
          enhance community management accuracy and efficiency.
        </Text>

        <Text style={[styles.text1, styles.mt16]}>
          <Text style={styles.text2}>Normal User Account:</Text> Users can sign
          up for a normal user account, allowing them to explore Comity, visit
          community profiles, and join various communities. Users have the
          option to delete their accounts at any time by accessing the support
          center within the app.
        </Text>
        <Text style={[styles.text1, styles.mt16]}>
          <Text style={styles.text2}>Comity Account:</Text> Comity accounts are
          designed for those who wish to create and manage their communities or
          social groups. Comity account holders can utilize additional features
          for community management. Please note that as of now, Comity accounts
          are provided free of charge. In the future, we may introduce paid
          subscription plans for Comity accounts.
        </Text>
        <Text style={[styles.text2, styles.mt16]}>
          3. User Responsibilities
        </Text>
        <Text style={[styles.text1, styles.mt16]}>
          Users are responsible for using Comity in accordance with its intended
          purpose. This includes:
        </Text>
        <Text style={[styles.text1, styles.mt16]}>
          {`- Abiding by the terms and conditions set forth in this document.
- Respecting the rules and guidelines for community management.
- Providing accurate information during registration and while using the app.
- Being respectful and considerate when communicating with other users and community members.`}
        </Text>
        <Text style={[styles.text2, styles.mt16]}>
          4. Prohibited Activities
        </Text>
        <Text style={[styles.text1, styles.mt16]}>
          Prohibited activities on Comity include:
        </Text>
        <Text style={[styles.text1, styles.mt16]}>
          {`- Engaging in any form of harassment, bullying, or hate speech.
- Sharing or distributing inappropriate content.
- Unauthorized access to other user accounts or community profiles.
- Any actions that violate applicable laws or regulations.
`}
        </Text>
        <Text style={[styles.text2, styles.mt16]}>5. Account Termination</Text>

        <Text style={[styles.text1, styles.mt16]}>
          Comity reserves the right to terminate or suspend user accounts in the
          event of violations of the terms and conditions or for any other
          reason deemed necessary. Accounts may be deleted at the user's
          request, with the understanding that this action is permanent and
          irreversible.
        </Text>

        <Text style={[styles.text2, styles.mt16]}>6. Data Usage</Text>
        <Text style={[styles.text1, styles.mt16]}>
        Comity collects and uses data as outlined in our Privacy Policy. User data is handled in accordance with applicable data protection laws.
        </Text>
        <Text style={[styles.text2, styles.mt16]}>7. Notification of Changes</Text>
        <Text style={[styles.text1, styles.mt16]}>
        Users will be notified of updates to the terms and conditions or the privacy policy within the app's notification area.
        </Text>
        <Text style={[styles.text2, styles.mt16]}>8. Age Restrictions</Text>
        <Text style={[styles.text1, styles.mt16]}>
        Users must be at least 18 years old to open a user account. Individuals aged 13 or older can open a user account with parental permission.
        </Text>
      </View>
    </ScrollView>
  );
}
