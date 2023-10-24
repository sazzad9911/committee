import React from "react";
import { ScrollView, View, Dimensions, Text, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppColors } from "../../functions/colors";
import localStorage from "../../functions/localStorage";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";
import Button from "../../components/main/Button";
import { setIsBn } from "../../data/isBn";
import { Clickable } from "../User/Profile";
import { SvgXml } from "react-native-svg";
import BackHeader from "../../components/main/BackHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LoginOrRegister({ navigation }) {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const { width, height } = Dimensions.get("window");
  const colors = new AppColors(isDark);
  const values = new AppValues(isBn);
  const backgroundColor = colors.getBackgroundColor();
  const textColor = colors.getTextColor();
  const subTextColor = colors.getSubTextColor();
  const borderColor = colors.getBorderColor();
  const textPrimaryColor = colors.getTextPrimaryColor();
  const dispatch = useDispatch();
  const inset = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: backgroundColor,
        paddingTop: inset?.top,
      }}>
      <Text
        style={[
          {
            color: colors.getTextColor(),
            textAlign: "center",
            marginTop: 12,
            fontSize: 20,
            fontWeight: "500",
          },
         
        ]}>
        {isBn ? "লগইন করুন" : "Login"}
      </Text>
      <ScrollView>
        <View style={{ justifyContent: "space-between", height: height - 100 }}>
          <View style={{ alignItems: "center" }}>
            <SvgXml
              style={{
                marginTop: 35,
              }}
              width={"100%"}
              xml={logo}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <Button
              onPress={() => {
                navigation.navigate("SignIn");
              }}
              active={true}
              style={{
                width: Dimensions.get("window").width - 40,
                borderRadius: 50,
              }}
              title={isBn ? "লগইন করুন" : "Login"}
            />
            <Text
              style={[
                mainStyle.mediumText,
                { color: colors.getSubTextColor() },
                { paddingVertical: 20 },
              ]}>
              {isBn ? "অথবা" : "Or"}
            </Text>
            <Button active={true}
              onPress={() => {
                navigation.navigate("SignUp");
              }}
              style={{
                width: Dimensions.get("window").width - 40,
                borderRadius: 50,
              }}
              title={isBn ? "একটি অ্যাকাউন্ট তৈরি করুন" : "Create an account"}
            />
          </View>
          <Pressable
            onPress={async () => {
              navigation.navigate("ContactUs");
            }}
            style={{
              marginBottom: 32,
              alignItems: "center",
            }}>
            <Text
              style={[
                mainStyle.mediumText,
                { color: colors.getSubTextColor() },
                { paddingVertical: 20 },
              ]}>
              {isBn ? "আমাদের সাথে যোগাযোগ করুন" : "Contact us"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const logo = `<svg width="177" height="39" viewBox="0 0 177 39" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 19.5V39H14.721H29.4419V19.5V0H14.721H0V19.5ZM14.0241 6.61685V8.85168H12.6565H11.2803L10.0434 10.0962L8.79774 11.3494V19.5V27.6506L10.0346 28.8951L11.2803 30.1483H12.6478H14.0241V32.3831V34.618H11.6984H9.36393L6.86398 32.1027L4.35532 29.5787V19.5V9.42135L6.85527 6.90607L9.36393 4.38202H11.6897H14.0241V6.61685ZM22.578 6.8973L25.0866 9.42135V11.3231V13.2337H22.8654H20.6442V12.296V11.3494L19.4073 10.1049L18.1617 8.85168H16.7941H15.4178V6.61685V4.38202H17.7436H20.078L22.578 6.8973ZM25.0866 27.6681V29.5787L22.5867 32.0939L20.078 34.618H17.7523H15.4178V32.3831V30.1483H16.7854H18.1617L19.3986 28.9038L20.6442 27.6506V26.7128V25.7663H22.8654H25.0866V27.6681Z" fill="#EC9615"/>
<path d="M147.558 19.5V39H162.279H177V19.5V0H162.279H147.558V19.5ZM160.885 11.9279L164.823 19.4825L164.683 19.7804C164.561 20.0434 164.544 20.8321 164.544 27.3438V34.618H162.323H160.101V27.3701V20.1222L156.147 12.5413C153.978 8.36966 152.131 4.82022 152.053 4.66247L151.905 4.38202H154.422H156.939L160.885 11.9279ZM172.645 4.44337C172.645 4.56607 165.737 17.791 165.676 17.791C165.641 17.791 165.058 16.7218 164.378 15.4247L163.15 13.0584L165.397 8.72022L167.636 4.38202H170.145C171.521 4.38202 172.645 4.40831 172.645 4.44337Z" fill="#EC9615"/>
<path d="M29.5288 19.5V39H44.2498H58.9707V19.5V0H44.2498H29.5288V19.5ZM43.5529 6.61685V8.85168H42.1854H40.8091L39.5722 10.0962L38.3265 11.3494V19.5V27.6506L39.5635 28.8951L40.8091 30.1483H42.1766H43.5529V32.3831V34.618H41.2272H38.8927L36.3928 32.1027L33.8841 29.5787V19.5V9.42135L36.3841 6.90607L38.8927 4.38202H41.2185H43.5529V6.61685ZM52.1068 6.8973L54.6154 9.42135V19.5V29.5787L52.1155 32.0939L49.6068 34.618H47.2811H44.9466V32.3831V30.1483H46.3142H47.6905L48.9274 28.9038L50.173 27.6506V19.5V11.3494L48.9361 10.1049L47.6905 8.85168H46.3229H44.9466V6.61685V4.38202H47.2724H49.6068L52.1068 6.8973Z" fill="#40C140"/>
<path d="M59.0576 19.5V39H73.7786H88.4995V19.5V0H73.7786H59.0576V19.5ZM67.8554 19.5V34.618H65.6341H63.4129V19.5V4.38202H65.6341H67.8554V19.5ZM84.1442 19.5V34.618H81.923H79.7018V19.5V4.38202H81.923H84.1442V19.5ZM75.9824 8.08921L78.221 5.82809V9.02696V12.2258L75.9824 14.4782L73.735 16.7393L71.4964 14.487L69.2491 12.2258V9.02696V5.82809L71.4964 8.08921L73.735 10.3416L75.9824 8.08921Z" fill="#40C140"/>
<path d="M88.5869 19.5V39H103.264H117.942V19.5V0H103.264H88.5869V19.5ZM105.573 19.5V34.618H103.308H101.043V19.5V4.38202H103.308H105.573V19.5Z" fill="#40C140"/>
<path d="M118.029 19.5V39H132.75H147.471V19.5V0H132.75H118.029V19.5ZM143.203 6.61685V8.85168H132.793H122.384V6.61685V4.38202H132.793H143.203V6.61685ZM135.015 22.4798V34.618H132.793H130.572V22.4798V10.3416H132.793H135.015V22.4798Z" fill="#6B15EC"/>
<path d="M6.89878 6.94982L4.44238 9.42128V19.4999V29.5786L6.89878 32.05L9.36389 34.5303H11.6461H13.937V32.3393V30.1483H12.5607H11.1931L9.9475 28.895L8.71059 27.6505V19.4999V11.3494L9.95621 10.0961L11.1931 8.85162H12.5694H13.937V6.66061V4.4696H11.6461H9.36389L6.89878 6.94982Z" fill="#ECECEC"/>
<path d="M15.5049 6.6606V8.85161H16.8812H18.2487L19.4944 10.1049L20.7313 11.3494V12.2521V13.146H22.9089H25.0866V11.3231V9.50892L22.5779 6.98487L20.078 4.46959H17.7871H15.5049V6.6606Z" fill="#ECECEC"/>
<path d="M36.3842 6.99364L33.8843 9.50892V19.4999V29.4909L36.3929 32.015L38.8929 34.5303H41.1838H43.466V32.3393V30.1483H42.0897H40.7221L39.4765 28.895L38.2396 27.6505V19.4999V11.3494L39.4852 10.0961L40.7221 8.85162H42.0984H43.466V6.66061V4.4696H41.1751H38.8929L36.3842 6.99364Z" fill="#ECECEC"/>
<path d="M45.0337 6.66061V8.85162H46.41H47.7775L49.0232 10.1049L50.2601 11.3494V19.4999V27.6505L49.0144 28.9038L47.7775 30.1483H46.4013H45.0337V32.3393V34.5303H47.3246H49.6068L52.0719 32.05L54.5283 29.5786V19.4999V9.42128L52.0719 6.94982L49.6068 4.4696H47.3246H45.0337V6.66061Z" fill="#ECECEC"/>
<path d="M63.4136 19.4999V34.5303H65.5912H67.7689V19.4999V4.4696H65.5912H63.4136V19.4999Z" fill="#ECECEC"/>
<path d="M79.7021 19.4999V34.5303H81.8798H84.0575V19.4999V4.4696H81.8798H79.7021V19.4999Z" fill="#ECECEC"/>
<path d="M101.13 19.4999V34.5303H103.308H105.486V19.4999V4.4696H103.308H101.13V19.4999Z" fill="#ECECEC"/>
<path d="M122.471 6.66055V8.85156H132.793H143.115V6.66055V4.46954H132.793H122.471V6.66055Z" fill="#ECECEC"/>
<path d="M152.427 5.27589C152.662 5.72286 154.483 9.21971 156.478 13.0408L160.101 19.9995V27.2649V34.5303H162.279H164.457L164.474 27.2386C164.491 21.4017 164.526 19.8856 164.613 19.6752C164.727 19.4211 164.648 19.2545 160.824 11.9453L156.922 4.4696H154.457H151.992L152.427 5.27589Z" fill="#ECECEC"/>
<path d="M167.566 4.66247C167.497 4.7764 166.495 6.70449 165.328 8.96562L163.22 13.0584L164.431 15.3809C165.093 16.6604 165.65 17.7034 165.676 17.7034C165.711 17.7034 172.47 4.7764 172.54 4.54854C172.558 4.50472 171.625 4.46966 170.127 4.46966C167.688 4.46966 167.68 4.46966 167.566 4.66247Z" fill="#ECECEC"/>
<path d="M69.3364 9.11453V12.2258L71.5315 14.4343L73.7353 16.6516L75.9304 14.4431L78.1342 12.2258V9.11453V6.0033L75.9391 8.2206L73.7353 10.4291L71.5402 8.2206L69.3364 6.0033V9.11453Z" fill="#ECECEC"/>
<path d="M130.572 22.4797V34.5303H132.793H135.015V22.4797V10.4291H132.793H130.572V22.4797Z" fill="#ECECEC"/>
<path d="M20.7313 26.7127V27.6505L19.4856 28.9038L18.2487 30.1483H16.8725H15.5049V32.3393V34.5303H17.7958H20.078L22.5866 32.0062L25.0866 29.4909V27.6242V25.7662H22.9089H20.7313V26.7127Z" fill="#ECECEC"/>
</svg>
`;
