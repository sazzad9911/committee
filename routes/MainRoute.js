import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/User/Home";
import Profile from "../screens/User/Profile";
import UserTabRoute from "./UserTabRoute";
import { LogBox, useColorScheme, View, YellowBox } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import isDark, { setIsDark } from "../data/isDark";
import { setIsBn } from "../data/isBn";
import { AppColors } from "../functions/colors";
import SignIn from "../screens/Authentication/SignIn";
import BackHeader from "../components/main/BackHeader";
import Otp from "../screens/Authentication/Otp";
import SignUp from "../screens/Authentication/SignUp";
import Information from "../screens/Authentication/Information";
import { PaperProvider, MD3LightTheme } from "react-native-paper";
import Recovery from "../screens/Authentication/Recovery";
import LanguageScreen from "../screens/User/LanguageScreen";
import EditProfileInfo from "../screens/User/EditProfileInfo";
import { AppValues } from "../functions/values";
import CreateCommittee from "../screens/Dashboard/CreateCommittee";
import CreateCommitteeNext from "../screens/Dashboard/CreateCommitteeNext";
import DashboardRoute from "./DashboardRoute";
import DateShort from "../screens/Dashboard/DateShort";
import SelectDate from "../screens/Dashboard/SelectDate";
import AddNotice from "../screens/Dashboard/AddNotice";
import ViewNotice from "../screens/Dashboard/ViewNotice";
import EditNotice from "../screens/Dashboard/EditNotice";
import ChatScreen from "../screens/ChatScreen";
import AddSubscription from "../screens/Dashboard/AddSubscription";
import SubscriptionDetails from "../screens/Dashboard/SubscriptionDetails";
import AddMember from "../screens/Dashboard/AddMember";
import AllMember from "../screens/Dashboard/AllMember";
import SelectMemberType from "../screens/Dashboard/SelectMemberType";
import CreateOwnMember from "../screens/Dashboard/CreateOwnMember";
import UserProfile from "../screens/Dashboard/UserProfile";
import DeleteConfirmation from "../screens/Dashboard/DeleteCofirmation";
import Support from "../screens/Support";
import { StatusBar } from "expo-status-bar";
import ContactUs from "../screens/ContactUs";
import ContactSuccess from "../screens/ContactSuccess";
import { checkUser } from "../apis/authApi";
import * as SplashScreen from "expo-splash-screen";
import { storeUser } from "../data/user";
import localStorage from "../functions/localStorage";
import AddExpenses from "../screens/Dashboard/AddExpenses";
import Search from "../screens/User/Search";
import SimpleHeader from "../components/main/SimpleHeader";
import EditEmail from "../screens/User/EditEmail";
import PopularComities from "../screens/User/PopularComities";
import EditLocation from "../screens/User/EditAddress";
import Legal from "../screens/User/Legal";
import ComityProfile from "../screens/User/ComityProfile";
import EditSubscription from "../screens/Dashboard/EditSubscription";
import AddMemberSubscription from "../screens/Dashboard/AddMemberSubscription";
import DashboardNotification from "../screens/Dashboard/DashboardNotification";
import AllCollections from "../screens/Dashboard/AllCollections";
import AllExpenses from "../screens/Dashboard/AllExpenses";
import RecentComities from "../screens/User/RecentComities";
import DeleteMemberCollection from "../screens/Dashboard/DeleteMemberCollection";
import Notice from "../screens/Dashboard/Notice";
import CurrentBalance from "../screens/Dashboard/CurrentBalance";
import MemberPage from "../screens/Dashboard/MemberPage";
import EditCommitteeInfo from "../screens/Dashboard/EditCommitteeInfo";
import MemberSubs from "../screens/Dashboard/MemberSubs";
import MemberSubDetails from "../screens/Dashboard/MemberSubDetails";
import EditMemberInfo from "../screens/Dashboard/EditMemberInfo";
import SubscriptionList from "../screens/User/SubscriptionList";
import UserSubscriptionDetails from "../screens/User/UserSubscriptionDetails";
import Reset from "../screens/Authentication/Reset";
import MemberList from "../screens/Dashboard/MemberList";
import DeleteMemberConfirmation from "../screens/Dashboard/DeleteMemberConfirmation";
import EditExpenses from "../screens/Dashboard/EditExpenses";
import CommitteeList from "../screens/User/CommitteeList";
import DeleteComity from "../screens/Dashboard/DeleteComity";
import ComityDeleteSuccess from "../screens/Dashboard/ComityDeleteSuccess";
import AttachMemberConfirm from "../screens/Dashboard/AttachMemberConfirm";
import { socket } from "../apis/multipleApi";
import AcceptMember from "../screens/Dashboard/AcceptMember";
import ChatImage from "../screens/ChatImage";
import ChooseLanguage from "../screens/Onboarding/ChooseLanguage";
import LoginOrRegister from "../screens/Onboarding/LoginOrRegister";
import Start from "../screens/Onboarding/Start";
import UserNotice from "../screens/User/UserNotice";
import UserViewNotice from "../screens/User/UserViewNotice";
import UserCurrentBalance from "../screens/User/UserCurrentBalance";
import UserMemberPage from "../screens/User/UserMemberPage";
import AboutComity from "../screens/AboutComity";
import Conditions from "../screens/Conditions";
import Policy from "../screens/Policy";

const Stack = createNativeStackNavigator();
LogBox.ignoreLogs(["Require cycle:"]);
LogBox.ignoreLogs([
  "Constants.platform.ios.model has been deprecated in favor of expo-device's Device.modelName property. This API will be removed in SDK 45",
]);
LogBox.ignoreLogs([
  "Selector unknown returned the root state when called. This can lead to unnecessary rerenders.",
]);
LogBox.ignoreLogs([
  "[Unhandled promise rejection: TypeError: Cannot read property 'measure' of null]",
]);

export default function MainRoute() {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const colors = new AppColors(colorScheme == "dark" ? true : false);
  const backgroundColor = colors.getBackgroundColor();
  const textColor = colors.getTextColor();
  const isBn = useSelector((state) => state.isBn);
  const isDark = useSelector((state) => state.isDark);
  const values = new AppValues(isBn);
  const getComityHeadLine = values.getComityHeadLine();
  const headlines = values.getDashboardHeadlines();
  const languageTitle = values.getLanguageHeadline();
  const editProfileInfo = values.getEditProfileHeadLine();
  const noticeValue = values.getNoticeHeadLines();
  const user = useSelector((state) => state.user);
  const comity = useSelector((state) => state.comity);
  const [isReady, setIsReady] = useState(false);
  const [isConnect, setIsConnect] = useState(false);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "rgb(255, 45, 85)",
      background: backgroundColor,
    },
    dark: false,
  };
  const theme = {
    ...MD3LightTheme, // or MD3DarkTheme
    roundness: 2,
    colors: {
      ...MD3LightTheme.colors,
      primary: "#000",
      secondary: "#000",
      tertiary: "#000",
    },
  };
  //console.log(user.token);

  useEffect(() => {
    const fetch = async () => {
      const user = await checkUser();
      if (!isConnect && user) {
        socket.emit("join", user.user.id);
        setIsConnect(true);
      }

      dispatch(storeUser(user));
      const com = await localStorage.getData("SET_COMITY");
      //console.log(com);
      dispatch({ type: "SET_COMITY", value: com });
      setIsReady(true);

      // socket.on("getUsers", (u) => {
      //   console.log(u);
      // });
    };
    fetch();
  }, []);
  if (!isReady) {
    return null;
  }
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <StatusBar
        backgroundColor={backgroundColor}
        style={isDark ? "light" : "dark"}
      />
      <PaperProvider theme={colorScheme == "dark" ? null : theme}>
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator>
            {user ? (
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="Dashboard"
                component={comity ? DashboardRoute : UserTabRoute}
              />
            ) : (
              <>
                {!localStorage.isNotFirstTime && (
                  <Stack.Screen
                    options={{
                      headerShown: false,
                    }}
                    name="ChooseLanguage"
                    component={ChooseLanguage}
                  />
                )}
                <Stack.Screen
                  options={{
                    headerShown: false,
                  }}
                  name="LoginOrRegister"
                  component={LoginOrRegister}
                />
                <Stack.Screen
                  options={{
                    header: (props) => (
                      <BackHeader
                        title={isBn ? "লগইন করুন" : "Login"}
                        {...props}
                      />
                    ),
                  }}
                  name="SignIn"
                  component={SignIn}
                />
                <Stack.Screen
                  options={{
                    header: (props) => (
                      <BackHeader title={"User Information"} {...props} />
                    ),
                  }}
                  name="Information"
                  component={Information}
                />
                <Stack.Screen
                  options={{
                    header: (props) => (
                      <BackHeader
                        title={
                          isBn
                            ? "ফোন নম্বর যাচাইকরণ"
                            : "Phone Number Verification"
                        }
                        {...props}
                      />
                    ),
                  }}
                  name="SignUp"
                  component={SignUp}
                />
                <Stack.Screen
                  options={{
                    header: (props) => (
                      <BackHeader
                        title={
                          isBn
                            ? "ফোন নম্বর যাচাইকরণ"
                            : "Phone Number Verification"
                        }
                        {...props}
                      />
                    ),
                  }}
                  name="Otp"
                  component={Otp}
                />
                <Stack.Screen
                  options={{
                    header: (props) => (
                      <BackHeader
                        title={
                          isBn ? "পাসওয়ার্ড রিসেট করুন" : "Recovery Account"
                        }
                        {...props}
                      />
                    ),
                  }}
                  name="Recovery"
                  component={Recovery}
                />
                <Stack.Screen
                  options={{
                    header: (props) => (
                      <BackHeader
                        title={
                          isBn ? "পাসওয়ার্ড রিসেট করুন" : "Recovery Account"
                        }
                        {...props}
                      />
                    ),
                  }}
                  name="Reset"
                  component={Reset}
                />
              </>
            )}

            <Stack.Screen
              options={{
                header: (props) => (
                  <SimpleHeader title={"Search Comity"} {...props} />
                ),
              }}
              name="Search"
              component={Search}
            />
            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader title={"Edit Email"} {...props} />
                ),
              }}
              name="EditEmail"
              component={EditEmail}
            />
            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader title={"Popular Comities"} {...props} />
                ),
              }}
              name="PopularComities"
              component={PopularComities}
            />
            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader title={"Recent Comities"} {...props} />
                ),
              }}
              name="RecentComities"
              component={RecentComities}
            />
            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader title={"Edit Address"} {...props} />
                ),
              }}
              name="EditAddress"
              component={EditLocation}
            />
            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader title={isBn ? "আইন" : "Legal"} {...props} />
                ),
              }}
              name="Legal"
              component={Legal}
            />

            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader title={languageTitle} {...props} />
                ),
              }}
              name="LanguageScreen"
              component={LanguageScreen}
            />
            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader title={editProfileInfo} {...props} />
                ),
              }}
              name="EditProfileInfo"
              component={EditProfileInfo}
            />
            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader title={getComityHeadLine} {...props} />
                ),
              }}
              name="CreateCommittee"
              component={CreateCommittee}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="CreateCommitteeNext"
              component={CreateCommitteeNext}
            />

            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader title={headlines._settings} {...props} />
                ),
              }}
              name="DateShort"
              component={DateShort}
            />
            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader
                    title={headlines._chooseDateHeadline}
                    {...props}
                  />
                ),
              }}
              name="SelectDate"
              component={SelectDate}
            />

            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader title={noticeValue.notice} {...props} />
                ),
              }}
              name="AddNotice"
              component={AddNotice}
            />
            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader title={noticeValue.notice} {...props} />
                ),
              }}
              name="EditNotice"
              component={EditNotice}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="ViewNotice"
              component={UserViewNotice}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="ChatScreen"
              component={ChatScreen}
            />
            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader
                    title={values.getValues()._aboutSubscription}
                    {...props}
                  />
                ),
              }}
              name="AddSubscription"
              component={AddSubscription}
            />
            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader
                    title={isBn ? "সদস্য যোগ করুন" : "Add Member"}
                    {...props}
                  />
                ),
              }}
              name="AddMemberSubscription"
              component={AddMemberSubscription}
            />
            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader
                    title={values.getValues()._aboutSubscription}
                    {...props}
                  />
                ),
              }}
              name="EditSubscription"
              component={EditSubscription}
            />
            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader
                    title={values.getValues()._positionAndQualification}
                    {...props}
                  />
                ),
              }}
              name="AddMember"
              component={AddMember}
            />
            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader
                    title={values.getValues()._positionAndCategory}
                    {...props}
                  />
                ),
              }}
              name="AcceptMember"
              component={AcceptMember}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="AllMember"
              component={AllMember}
            />
            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader
                    title={values.getValues()._selectProvider}
                    {...props}
                  />
                ),
              }}
              name="SelectMemberType"
              component={SelectMemberType}
            />
            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader
                    title={values.getValues()._memberInfo}
                    {...props}
                  />
                ),
              }}
              name="CreateOwnMember"
              component={CreateOwnMember}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="UserProfile"
              component={UserProfile}
            />
            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader
                    title={isBn ? "নিশ্চিতকরণ" : "Confirmation"}
                    {...props}
                  />
                ),
              }}
              name="DeleteConfirmation"
              component={DeleteConfirmation}
            />
            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader title={values.getValues()._support} {...props} />
                ),
              }}
              name="Support"
              component={Support}
            />
            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader title={values.getValues()._contact} {...props} />
                ),
              }}
              name="ContactUs"
              component={ContactUs}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="ContactSuccess"
              component={ContactSuccess}
            />
            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader
                    title={isBn ? "খরচ যোগ করুন" : "Add Expense"}
                    {...props}
                  />
                ),
              }}
              name="AddExpenses"
              component={AddExpenses}
            />
            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader
                    title={isBn ? "সংশোধন" : "Edit Expense"}
                    {...props}
                  />
                ),
              }}
              name="EditExpenses"
              component={EditExpenses}
            />
            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader
                    title={values.getHeadLines().notification}
                    {...props}
                  />
                ),
              }}
              name="DashboardNotification"
              component={DashboardNotification}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="ComityProfile"
              component={ComityProfile}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="AllCollections"
              component={AllCollections}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="AllExpenses"
              component={AllExpenses}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="SubscriptionDetails"
              component={SubscriptionDetails}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="UserSubscriptionDetails"
              component={UserSubscriptionDetails}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="DeleteMemberCollection"
              component={DeleteMemberCollection}
            />
            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader title={getComityHeadLine} {...props} />
                ),
              }}
              name="EditCommitteeInfo"
              component={EditCommitteeInfo}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="MemberPage"
              component={UserMemberPage}
            />
            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader title={headlines.presentBalance} {...props} />
                ),
              }}
              name="CurrentBalance"
              component={UserCurrentBalance}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Notice"
              component={UserNotice}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="MemberSubs"
              component={MemberSubs}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="MemberSubDetails"
              component={MemberSubDetails}
            />
            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader
                    title={values.getValues()._memberInfo}
                    {...props}
                  />
                ),
              }}
              name="EditMemberInfo"
              component={EditMemberInfo}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Subscription List"
              component={SubscriptionList}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="MemberList"
              component={MemberList}
            />
            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader title={values.getValues()._account} {...props} />
                ),
              }}
              name="DeleteMemberConfirmation"
              component={DeleteMemberConfirmation}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="CommitteeList"
              component={CommitteeList}
            />
            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader title={"Confirmation"} {...props} />
                ),
              }}
              name="DeleteComity"
              component={DeleteComity}
            />
            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader title={"Confirmation"} {...props} />
                ),
              }}
              name="AttachMemberConfirm"
              component={AttachMemberConfirm}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="ComityDeleteSuccess"
              component={ComityDeleteSuccess}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="ChatImage"
              component={ChatImage}
            />
            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader
                    title={isBn ? "কমিটি সম্পর্কে" : "About Comity"}
                    {...props}
                  />
                ),
              }}
              name="AboutComity"
              component={AboutComity}
            />

            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader
                    title={isBn ? "গোপনীয়তা নীতি" : "Privacy Policy"}
                    {...props}
                  />
                ),
              }}
              name="Policy"
              component={Policy}
            />
            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader
                    title={isBn ? "শর্তাবলী" : "Term & condition"}
                    {...props}
                  />
                ),
              }}
              name="Conditions"
              component={Conditions}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </View>
  );
}
