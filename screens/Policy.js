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
        <Text style={styles.text1}>Privacy Policy for Comity App</Text>
        <Text style={[styles.text1, styles.mt16]}>
          Last Updated: [20/10/2023]
        </Text>
        <Text style={[styles.text2, styles.mt16]}>1. App Information</Text>
        <Text style={[styles.text1, styles.mt16]}>
          {`- App Name:Comity
- Developer/Company Name: Duty
- Platforms:Android and iOS
- Website:N/A`}
        </Text>

       
        <Text style={[styles.text2, styles.mt16]}>
        2. Data Collection
        </Text>
        <Text style={[styles.text1, styles.mt16]}>
          {`We collect the following personal information when you sign up for Comity:

- Email
- Phone number
- Device ID
- Age
- Full name
- Address`}
        </Text>
        <Text style={[styles.text2, styles.mt16]}>
        3. Data Usage
        </Text>
        <Text style={[styles.text1, styles.mt16]}>
         {`We use the collected data for the following purposes:

- User account creation and management
- Communication with users
- Providing services and features of the Comity app

We utilize Google services and the Expo SDK for data collection and analysis. In the future, if we introduce subscription services, user data may be used for account management and payment processing through third-party SDKs.`}
        </Text>
        
        <Text style={[styles.text2, styles.mt16]}>4. Data Retention</Text>

        <Text style={[styles.text1, styles.mt16]}>
        After users delete their accounts, we delete their data instantly.
        </Text>

        <Text style={[styles.text2, styles.mt16]}>5. User Rights</Text>
        <Text style={[styles.text1, styles.mt16]}>
        Users can access, update, or delete their data by using the account settings within the app. You can also delete your account at any time, which will remove your data from our system.
        </Text>
        <Text style={[styles.text2, styles.mt16]}>6. Security Measures</Text>
        <Text style={[styles.text1, styles.mt16]}>
        We take data security seriously. User data is stored on servers located in Germany and Bangladesh. Germany and Bangladesh have strong data protection regulations.
        </Text>
        <Text style={[styles.text2, styles.mt16]}>7. Cookies and Tracking</Text>
        <Text style={[styles.text1, styles.mt16]}>
        We do not use cookies or tracking technologies in the Comity app.
        </Text>
        <Text style={[styles.text2, styles.mt16]}>8. Data Transfer</Text>
        <Text style={[styles.text1, styles.mt16]}>
        User data may be transferred to and stored in Bangladesh, in addition to our servers in Germany.
        </Text>
        <Text style={[styles.text2, styles.mt16]}>9. Third-Party Services</Text>
        <Text style={[styles.text1, styles.mt16]}>
        Besides Google services and the Expo SDK, we do not use any other third-party SDKs for data collection or other purposes.
        </Text>
        <Text style={[styles.text2, styles.mt16]}>10. Compliance with Legal Requirements</Text>
        <Text style={[styles.text1, styles.mt16]}>
        We comply with all applicable laws and regulations. Users must be at least 18 years old to open an account. Individuals aged 13 or older can open an account with parental permission.
        </Text>
        <Text style={[styles.text2, styles.mt16]}>11. Contact Information</Text>
        <Text style={[styles.text1, styles.mt16]}>
        {`For privacy concerns or data-related inquiries, you can contact us in the following ways:

- Through the "Contact Us" option within the Comity app
- By email: help.comity@gmail.com`}
        </Text>
        <Text style={[styles.text2, styles.mt16]}>12. Updates to Privacy Policy</Text>
        <Text style={[styles.text1, styles.mt16]}>
        {`We may update our privacy policy from time to time. Users will be notified of these updates through in-app notifications. We encourage you to review our privacy policy periodically.

Please note that by using the Comity app, you agree to the terms outlined in this privacy policy. If you do not agree with our practices, please do not use our services.`}
        </Text>
      </View>
    </ScrollView>
  );
}
