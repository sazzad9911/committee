import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
} from "react-native";
const { width, height } = Dimensions.get("window");
import { useSelector, useDispatch } from "react-redux";
import { SvgXml } from "react-native-svg";
import Input from "../../components/main/Input";
import Button from "../../components/main/Button";
import { AppColors } from "../../functions/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const LogIn = ({ navigation }) => {
  const [Email, setEmail] = React.useState();
  const [Password, setPassword] = React.useState();
  const [EmailError, setEmailError] = React.useState();
  const [PasswordError, setPasswordError] = React.useState();
  const dispatch = useDispatch();
  const [loader,setLoader]=useState(false)
  const [error,setError]=useState()
  const userRef=useRef()
  const passRef=useRef()
  const isDark=useSelector(state=>state.isDark)
  const colors=new AppColors(isDark)
  const textColor=colors.getTextColor()
  const inset=useSafeAreaInsets()

  const login = () => {
    setEmailError(null);
    setPasswordError(null);
    navigation.navigate("Dashboard")
    if (!Email) {
      setEmailError("Username field is required");
      return;
    }
    if (!Password) {
      setEmailError("Password field is required");
      return;
    }

    
  };
 
  return (
    <KeyboardAvoidingView
      style={{ flex: 1,paddingTop:inset?.top }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: 20,
          }}>
          <SvgXml
            style={{
              marginTop: 35,
            }}
            width={"100%"}
            xml={icon}
          />
          <Text style={[styles.lebel,{color:textColor,textAlign:"center",marginTop:35}]}>Make each day count! </Text>
          <View
            style={{
              marginVertical: 64,
            }}>
            <Text style={[styles.lebel,{color:textColor}]}>Username</Text>
            <Input autoCapitalize={"none"} style={{color:"#000"}} onSubmitEditing={()=>{
              if(passRef){
                passRef.current.focus()
              }
            }} returnKeyType={"next"} innerRef={userRef} value={Email} onChange={setEmail} placeholder={" "} containerStyle={styles.input} />
            <View style={{ height: 20 }} />
            <Text style={[styles.lebel,{color:textColor}]}>Password</Text>
            <Input onSubmitEditing={()=>{
              login()
            }} secureTextEntry={true} style={{color:"#000"}} returnKeyType={"go"} innerRef={passRef} value={Password} onChange={setPassword} placeholder={" "} containerStyle={styles.input} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: 8,
              }}>
              
                <Text
                style={[
                  styles.text,
                  { color: "#EC2700", flex: 1, textAlign: "left" },
                ]}>
                {EmailError}
              </Text>
            
              <Text onPress={()=>{
                navigation.navigate("Recovery")
              }} style={[styles.text, { textDecorationLine: "underline",color:textColor }]}>
                Forget id and password
              </Text>
            </View>
          </View>
          <Button onPress={login}
            active={true}
            style={[
              styles.button,
              {
                backgroundColor: "#4ADE80",
                color: "#ffffff",
              },
            ]}
            title={"Login"}
          />
          <View
            style={{
              flexDirection: "row",
              marginVertical: 16,
              alignItems: "center",
            }}>
            <View style={styles.line} />
            <Text style={[styles.text,{color:textColor}]}>or</Text>
            <View style={styles.line} />
          </View>
          <Button onPress={()=>{
            navigation.navigate("SignUp")
          }}
            style={[styles.button, { marginBottom: 20 }]}
            title={"Create an account"}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
  
};

export default LogIn;
const styles = StyleSheet.create({
  lebel: {
    fontSize: 16,
    fontWeight: "400",
  },
  text: {
    fontSize: 14,
    
    fontWeight: "400",
  },
  input: {
    height: 40,
    borderRadius: 8,
    backgroundColor: "#F1F1F1",
    marginTop: 8,
    marginHorizontal: 0,
    borderBottomWidth: 0,
    borderWidth:0
  },
  button: {
    borderColor: "#D1D1D1",
    height: 40,
    borderRadius: 4,
    width: "100%",
    borderRadius:28
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#F1F1F1",
  },
});
const icon = `<svg width="109" height="45" viewBox="0 0 109 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.0078125" width="108.984" height="45" rx="1.55108" fill="url(#paint0_linear_430_9771)"/>
<rect x="4.1857" y="4.1779" width="31.6032" height="36.6442" rx="1.64802" fill="url(#paint1_linear_430_9771)"/>
<rect x="5.05835" y="5.0504" width="29.8582" height="34.8992" rx="0.775538" fill="white"/>
<path d="M21.674 7.46258C16.6669 7.91821 12.4451 10.7392 9.75008 15.4312C8.2814 17.9954 7.49132 20.797 7.39438 23.8167C7.33622 25.5326 7.54464 27.1225 8.03905 28.7608C8.26686 29.5218 8.48498 30.0695 8.88729 30.8693C10.0264 33.1474 11.7665 34.8875 14.1173 36.0896C15.586 36.8458 17.0595 37.2723 18.819 37.4662C19.706 37.5631 21.4995 37.5389 22.2799 37.4177C24.6016 37.0639 26.652 36.2835 28.5423 35.0281C29.3954 34.4658 29.5505 34.2186 29.5214 33.5013C29.5021 33.1474 29.4778 33.0456 29.3227 32.7306C28.8671 31.8193 27.9946 31.1359 27.2821 31.1359C27.1609 31.1359 26.8652 31.2328 26.4581 31.4073C25.2851 31.9017 24.2817 32.1441 22.9488 32.2604C21.8 32.3573 20.5107 32.1925 19.3958 31.8048C17.4279 31.1165 16.0562 29.8465 15.5472 28.2373C15.1885 27.1031 15.1788 25.6296 15.5181 24.3063C15.872 22.92 16.6184 21.4562 17.457 20.511C18.4603 19.3816 19.4976 18.6836 20.5446 18.4316C21.2959 18.2522 22.2459 18.3783 22.91 18.7515C23.196 18.9115 23.637 19.3235 23.7534 19.5416C23.8115 19.6531 23.8164 19.6531 23.9424 19.5707C24.1702 19.4252 26.7974 17.5688 27.8056 16.8417C30.961 14.5636 32.5509 12.9253 32.6624 11.825C32.706 11.413 32.6381 11.3112 31.9547 10.7392C29.8898 9.02335 27.3305 7.89882 24.6792 7.55467C24.1024 7.47712 22.1538 7.41895 21.674 7.46258Z" fill="url(#paint2_linear_430_9771)"/>
<rect x="4.1857" y="4.1779" width="31.6032" height="36.6442" rx="1.64802" stroke="white" stroke-width="0.969422"/>
<path d="M77.0306 10.7163C76.5265 10.9102 76.1872 11.3998 76.1532 11.9814C76.1048 12.8006 76.6816 13.4549 77.5007 13.5083C78.5235 13.581 79.2748 12.6212 78.9839 11.6227C78.887 11.2786 78.5429 10.886 78.2036 10.7309C77.8885 10.5806 77.3941 10.5758 77.0306 10.7163Z" fill="white"/>
<path d="M81.2282 10.76C80.918 10.9199 80.6805 11.1671 80.535 11.4822C80.4333 11.7051 80.4333 11.7148 80.4333 17.3763C80.4333 23.6678 80.4236 23.4739 80.758 24.5258C81.6547 27.3613 84.3352 29.3729 87.2434 29.3923C87.8106 29.3971 87.8639 29.3874 88.0917 29.2662C88.8285 28.8785 89.1047 28.0884 88.7703 27.3468C88.5231 26.7942 88.1014 26.5422 87.3307 26.4888C86.5212 26.4355 85.9541 26.2659 85.3385 25.8926C84.4564 25.3595 83.8117 24.5161 83.5015 23.4982C83.3997 23.1589 83.3948 23.0571 83.3755 20.8323L83.3609 18.5202L85.6051 18.5056L87.8493 18.4911L88.0917 18.3602C88.8285 17.9725 89.1047 17.1824 88.7703 16.4408C88.6249 16.1209 88.4358 15.9173 88.1014 15.7428C87.9027 15.6313 87.8687 15.6313 85.6439 15.6071L83.39 15.5828L83.3658 13.644C83.3415 11.8021 83.3367 11.6955 83.2397 11.4822C83.0895 11.1623 82.852 10.9199 82.5369 10.7551C82.2945 10.6339 82.2025 10.6145 81.8777 10.6145C81.5578 10.6194 81.456 10.6388 81.2282 10.76Z" fill="white"/>
<path d="M46.7701 15.704C45.4226 15.9463 44.2108 16.5765 43.1978 17.5604C42.1799 18.5492 41.5158 19.761 41.2104 21.1812C41.0796 21.8065 41.0941 23.2073 41.2395 23.8956C41.5255 25.2334 42.1653 26.4113 43.1057 27.3564C44.4725 28.7233 46.1157 29.4019 48.0303 29.3922C48.898 29.3922 49.4554 29.305 50.197 29.0578C51.273 28.6991 52.2182 28.0981 53.0277 27.2595C54.763 25.4564 55.364 22.8583 54.6127 20.4154C54.5594 20.236 54.4091 19.8677 54.2831 19.5962C53.3573 17.6331 51.6802 16.2663 49.5814 15.767C48.864 15.5974 47.5165 15.5634 46.7701 15.704ZM48.612 18.5638C50.323 18.8352 51.685 20.1973 51.9565 21.9083C52.2473 23.7599 51.1761 25.5679 49.3778 26.2416C48.549 26.5567 47.4002 26.547 46.5762 26.2222C45.6698 25.8635 44.8458 25.0977 44.4192 24.2155C44.046 23.44 43.9345 22.3058 44.1478 21.506C44.3417 20.7741 44.8797 19.9161 45.4274 19.4702C46.3532 18.714 47.4971 18.3893 48.612 18.5638Z" fill="white"/>
<path d="M57.0895 15.7525C56.7793 15.9124 56.5418 16.1596 56.3963 16.4747C56.2946 16.6977 56.2946 16.7025 56.2946 22.49V28.2823L56.4545 28.607C56.6387 28.9803 56.915 29.2129 57.327 29.3486C58.0007 29.5716 58.7763 29.2081 59.0913 28.5246L59.2028 28.2823L59.2271 24.3319C59.2464 21.5593 59.2707 20.333 59.3095 20.2264C59.7457 19.0001 61.0205 18.2827 62.2032 18.588C63.0175 18.8013 63.6137 19.3297 63.9336 20.1391L64.0499 20.43L64.0742 24.3803L64.0984 28.3307L64.239 28.6119C64.7818 29.7219 66.3717 29.6589 66.9049 28.5052C67.0067 28.2823 67.0067 28.2386 67.0309 24.3076L67.0551 20.333L67.1666 20.0713C67.4962 19.2957 68.1603 18.7432 68.9601 18.5687C70.23 18.2972 71.5339 19.1552 71.8053 20.4396C71.8635 20.7111 71.878 21.443 71.878 24.487C71.878 28.0932 71.8829 28.2144 71.975 28.4665C72.101 28.8058 72.3385 29.0723 72.6584 29.2517C72.8911 29.3826 72.9638 29.3971 73.3322 29.3971C73.7005 29.3971 73.7732 29.3826 74.0059 29.2517C74.3307 29.0723 74.5924 28.7767 74.7039 28.4713C74.7814 28.2532 74.7863 27.9284 74.7863 24.3513C74.7863 21.0746 74.7766 20.4009 74.7136 20.0373C74.5148 18.908 74.0059 17.9385 73.177 17.1291C72.4015 16.3681 71.5339 15.9027 70.4627 15.6846C69.9731 15.5828 68.9019 15.5828 68.4269 15.6798C67.4284 15.8882 66.488 16.3632 65.7949 17.0176L65.5525 17.2454L65.1745 16.9206C64.2002 16.0772 63.1726 15.6701 61.9075 15.6216C60.8702 15.5828 60.0753 15.7379 59.2852 16.1354L59.0041 16.276L58.8441 16.0821C58.7472 15.9658 58.5582 15.83 58.3837 15.7476C58.1365 15.6313 58.0298 15.6071 57.7245 15.6071C57.4191 15.6119 57.3173 15.6362 57.0895 15.7525Z" fill="white"/>
<path d="M77.0207 15.704C76.6766 15.864 76.4488 16.0724 76.2937 16.3923L76.1434 16.688V22.4609C76.1434 28.9221 76.1192 28.4907 76.4875 28.9075C77.171 29.6831 78.3779 29.5473 78.882 28.6409L79.0274 28.3792L79.042 22.6111C79.0565 16.0821 79.0807 16.5377 78.6687 16.0821C78.3634 15.7379 78.0629 15.6071 77.5975 15.6071C77.3406 15.6071 77.171 15.6361 77.0207 15.704Z" fill="white"/>
<path d="M91.0824 15.7573C90.7286 15.9318 90.4765 16.2081 90.3602 16.5474C90.2778 16.7752 90.2729 17.0418 90.2729 19.921C90.2778 22.6208 90.2875 23.1104 90.3602 23.5079C90.4862 24.2495 90.6656 24.7972 91 25.4806C91.984 27.4873 93.8307 28.893 96.041 29.305C96.6954 29.4262 97.9411 29.431 98.5567 29.305C99.4194 29.1354 100.5 28.704 101.092 28.3017L101.315 28.1465L101.281 28.3356C101.16 28.9657 100.641 29.843 100.074 30.3665C99.371 31.0209 98.547 31.3747 97.5194 31.4571C96.8408 31.5104 96.6178 31.5928 96.2931 31.8885C95.5466 32.5768 95.7744 33.8516 96.7148 34.2781C96.9329 34.3751 97.0347 34.3896 97.5194 34.3848C99.7394 34.3605 101.935 33.1342 103.176 31.2293C103.704 30.4247 104.058 29.528 104.247 28.5246C104.32 28.1272 104.33 27.5649 104.33 22.4415C104.33 17.1484 104.325 16.7801 104.242 16.5474C104.126 16.2081 103.874 15.9318 103.52 15.7573C103.273 15.6313 103.166 15.6071 102.871 15.6071C102.444 15.6071 102.168 15.7137 101.862 15.9948C101.746 16.1015 101.601 16.3051 101.538 16.4456L101.421 16.6977L101.392 19.921C101.368 23.0522 101.363 23.154 101.261 23.4788C100.801 24.9378 99.7345 25.975 98.2998 26.3531C97.4709 26.5712 96.4627 26.4985 95.692 26.1689C95.2752 25.9896 94.7178 25.5873 94.3397 25.1898C93.9325 24.7633 93.7047 24.4191 93.5157 23.9538C93.2248 23.2364 93.2345 23.3673 93.2103 19.8968L93.1812 16.6977L93.0649 16.4456C93.0019 16.3051 92.8565 16.1015 92.7401 15.9948C92.4348 15.7137 92.1585 15.6071 91.7319 15.6071C91.4363 15.6071 91.3296 15.6313 91.0824 15.7573Z" fill="white"/>
<defs>
<linearGradient id="paint0_linear_430_9771" x1="0.0078125" y1="22.5" x2="108.992" y2="22.5" gradientUnits="userSpaceOnUse">
<stop stop-color="#1488CC"/>
<stop offset="1" stop-color="#2B32B2"/>
</linearGradient>
<linearGradient id="paint1_linear_430_9771" x1="4.67041" y1="22.5" x2="35.3042" y2="22.5" gradientUnits="userSpaceOnUse">
<stop stop-color="#1488CC"/>
<stop offset="1" stop-color="#2B32B2"/>
</linearGradient>
<linearGradient id="paint2_linear_430_9771" x1="7.38489" y1="22.4868" x2="32.6728" y2="22.4868" gradientUnits="userSpaceOnUse">
<stop stop-color="#1488CC"/>
<stop offset="1" stop-color="#2B32B2"/>
</linearGradient>
</defs>
</svg>
`;