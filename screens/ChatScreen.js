import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Image,
  Alert,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { EvilIcons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Audio } from "expo-av";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  audioFileFromURL,
  dateDifference,
  fileFromURL,
  serverTimeToLocal,
  timeConverter,
  uploadFile,
} from "../functions/action";
import LottieView from "lottie-react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { MotiView, SafeAreaView } from "moti";
import Animated, { FadeIn } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import uuid from "react-native-uuid";
import { Linking } from "react-native";
import Hyperlink from "react-native-hyperlink";
import { AppColors } from "../functions/colors";
import CameraScreen from "./CameraScreen";
import ChatHead from "../components/headers/ChatHead";
import { AppValues } from "../functions/values";
import { getMessages, sendMessage } from "../apis/api";
import { useRef } from "react";
import { get, post, socket } from "../apis/multipleApi";
import loader from "../data/loader";
import mainStyle from "../styles/mainStyle";
//import { EvilIcons } from '@expo/vector-icons';

const ChatScreen = (props) => {
  const scrollRef = React.useRef();
  const isBn = useSelector((state) => state.isBn);
  const values = new AppValues(isBn);
  const allValues = values.getValues();
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);
  const primaryColor = colors.getTextColor();
  const textColor = colors.getTextColor();
  const assentColor = colors.getBorderColor();
  const backgroundColor = colors.getBackgroundColor();
  const secondaryColor = colors.getSubTextColor();
  const params = props?.route?.params;
  const data = params && params.data ? params.data : null;
  const conversationId = params.conversationId;
  const [messages, setMessages] = useState([]);
  const styles = StyleSheet.create({
    view: {
      flexDirection: "row",
      paddingHorizontal: 10,
      alignItems: "center",
      backgroundColor: primaryColor,
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowColor: backgroundColor,
      shadowRadius: 3,
      elevation: 3,
      paddingVertical: 5,
    },
    icon: {
      margin: 5,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    input: {
      backgroundColor: secondaryColor,
      flex: 7,
      height: 40,
      fontSize: 14,
      borderRadius: 20,
      paddingHorizontal: 10,
      fontFamily: "Poppins-Light",
    },
  });
  const [UserInfo, setUserInfo] = React.useState();
  const user = useSelector((state) => state.user);
  const [Loader, setLoader] = React.useState(false);
  const [Id, setId] = React.useState();
  const [Refresh, setRefresh] = React.useState(false);
  const inset = useSafeAreaInsets();
  const dispatch = useDispatch();
  const ref = useRef();
  const serviceId = params?.serviceId;
  const vendor = useSelector((s) => s.comity);
  const [readOnly, setReadOnly] = useState(data.readOnly);
  const [message, setMessage] = useState();
  const [show, setShow] = useState(false);
  const isFocus = useIsFocused();
  const [lim, setLim] = useState(20);
  const [audioId, setAudioId] = useState();

  const send = async (message, image, sound) => {
    try {
      // const msg={
      //   conversationId:conversationId,
      //   createdAt:new Date(),
      //   id:uuid.v4(),
      //   image:image,
      //   text:message,
      //   updatedAt:new Date(),
      //   send:true
      // }

      const { data } = await sendMessage({
        text: message,
        image,
        conversationId,
        audio: sound,
      });

      dispatch(loader.hide());
      //console.log(data);
      setMessages((d) => [data.message, ...d]);
      //GiftedChat.append(data.message)
      //ref?.current?.scrollTo({x: 0, y: 0, animated: true})
    } catch (error) {
      dispatch(loader.hide());
      console.log(error);
    }
  };

  //return <VideoCallingScreen/>
  //return <CallingScreen user={UserInfo} audio={false}/>
  //return <AudioCallScreen user={UserInfo}/>
  const RenderBubble = (props) => {
    const currentMessage = props?.item;
    //console.log(UserInfo)
    const regex = /((http|https|ftp):\/\/[^\s]+)/g;
    const navigation = useNavigation();
    const [audio, setSound] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const isFocus = useIsFocused();
    const [duration, setDuration] = useState();
    const animateRef = useRef();

    const onPlaybackStatusUpdate = (status) => {
      // console.log(status);
      // if (status.didJustFinish) {
      //   setIsPlaying(false);
      //   console.log("auto Stop...");
      //   //props?.setAudioId(null);
      //   animateRef?.current?.reset();
      // }
    };
    async function playSound(uri) {
      setIsPlaying(true);
      if (!audio) {
        return;
      }
      //props?.setAudioId(currentMessage.id);
      console.log("Playing Sound...");
      await audio.playAsync();

      // props?.setAudioId(currentMessage.id);
      animateRef?.current?.play();
    }
    async function stopSound() {
      setIsPlaying(false);
      console.log("Stop Sound...");
      //props?.setAudioId(null);
      await audio.pauseAsync();
      animateRef?.current?.reset();
    }
    function millisToMinutesAndSeconds(millis) {
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }
    const loadSound = async (uri) => {
      try {
        //console.log("sound loaded");
        const { sound } = await Audio.Sound.createAsync(
          { uri: uri },
          { isLooping: true },
          onPlaybackStatusUpdate
        );
        //console.log(await sound.getStatusAsync());
        //console.log(sound);

        const ms = await sound.getStatusAsync();
        setDuration(millisToMinutesAndSeconds(ms.durationMillis));
        setSound(sound);
      } catch (e) {
        console.error(e.message);
      }
    };
    React.useEffect(() => {
      return audio
        ? () => {
            animateRef?.current?.reset();
            setIsPlaying(false);
            //props?.setAudioId(null);
            console.log("Unloading Sound");
            audio.pauseAsync();
            // setSound(null);
          }
        : undefined;
    }, [audio]);

    useEffect(() => {
      if (currentMessage.audio) {
        loadSound(currentMessage.audio);
      }
    }, [currentMessage.audio]);

    if (!currentMessage) {
      return null;
    }
    // console.log(currentMessage);
    if (currentMessage.audio) {
      return (
        <View
          style={[
            newStyles.imageBox,
            {
              alignSelf:
                UserInfo?.id == currentMessage?.senderId
                  ? "flex-start"
                  : "flex-end",
              height: "auto",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 5,
              paddingVertical: 3,
              borderRadius: 12,
              borderBottomLeftRadius:
                UserInfo?.id != currentMessage?.senderId ? 12 : 4,
              borderBottomRightRadius:
                UserInfo?.id == currentMessage?.senderId ? 12 : 4,
            },
          ]}>
          <View>
            <LottieView
              style={{
                height: 40,
                width: 50,
              }}
              source={require("../assets/wave.json")}
              ref={animateRef}
              loop
            />
            <Text style={{ color: colors.getBorderColor() }}>{duration}s</Text>
          </View>
          <View style={{ width: 10 }} />

          <View
            style={{
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}>
            <View
              style={{
                marginTop: 5,
              }}>
              {isPlaying ? (
                audio ? (
                  <TouchableOpacity onPress={stopSound}>
                    <FontAwesome5
                      name="pause-circle"
                      size={24}
                      color={textColor}
                    />
                  </TouchableOpacity>
                ) : (
                  <ActivityIndicator size={"small"} color={textColor} />
                )
              ) : (
                <TouchableOpacity
                  onPress={() => playSound(currentMessage.audio)}>
                  <FontAwesome5
                    name="play-circle"
                    size={24}
                    color={textColor}
                  />
                </TouchableOpacity>
              )}
            </View>
            <Text style={{ color: colors.getBorderColor() }}>
              {dateDifference(new Date(), currentMessage.createdAt) == 0
                ? timeConverter(currentMessage.createdAt)
                : dateDifference(new Date(), currentMessage.createdAt) == 1
                ? "Yesterday"
                : serverTimeToLocal(currentMessage.createdAt)}
            </Text>
          </View>
        </View>
      );
    }

    if (currentMessage?.image && currentMessage?.text) {
      //console.log(currentMessage?.image)
      let arr = currentMessage?.image.split("/");
      let newArr = arr[arr.length - 1]?.split(".");
      let type = newArr[newArr.length - 1];
      let three = newArr[0].split("")?.slice(-3)?.join("");
      return (
        <Pressable
          onPress={() => {
            props.navigation.navigate("ChatImage", {
              uri: currentMessage?.image,
            });
          }}
          style={[
            newStyles.imageBox,
            {
              alignSelf:
                UserInfo?.id == currentMessage?.senderId
                  ? "flex-start"
                  : "flex-end",
              height: "auto",
            },
          ]}>
          <Image
            style={newStyles.image}
            source={{ uri: currentMessage.image }}
          />
          <View style={{ flexDirection: "row", paddingHorizontal: 8, flex: 1 }}>
            <Text
              numberOfLines={1}
              style={[newStyles.dateText, { textAlign: "left", flex: 1 }]}>
              {arr[arr.length - 1]}
            </Text>
            <Text style={newStyles.dateText}>
              {three}.{type}{" "}
            </Text>
            <View style={{ width: 8 }} />
            <Text style={newStyles.dateText}>
              {dateDifference(new Date(), currentMessage.createdAt) == 0
                ? timeConverter(currentMessage.createdAt)
                : dateDifference(new Date(), currentMessage.createdAt) == 1
                ? "Yesterday"
                : serverTimeToLocal(currentMessage.createdAt)}
            </Text>
          </View>
          {currentMessage && (
            <Hyperlink
              onPress={(url, text) => {
                navigation.navigate("WebViews", { url: url, title: "" });
              }}
              linkStyle={{
                color: "#000",
                textDecorationLine: "underline",
              }}
              linkDefault={false}>
              <Text
                style={[
                  newStyles.text,
                  { marginHorizontal: 8, marginBottom: 3 },
                ]}>
                {currentMessage?.text}
              </Text>
            </Hyperlink>
          )}
        </Pressable>
      );
    }

    if (currentMessage?.image) {
      //console.log(currentMessage?.image)
      let arr = currentMessage?.image.split("/");
      let newArr = arr[arr.length - 1]?.split(".");
      let type = newArr[newArr.length - 1];
      let three = newArr[0].split("")?.slice(-3)?.join("");
      return (
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("ChatImage", {
              uri: currentMessage?.image,
            });
          }}
          style={[
            newStyles.imageBox,
            {
              alignSelf:
                UserInfo?.id == currentMessage?.senderId
                  ? "flex-start"
                  : "flex-end",
            },
          ]}>
          <Image
            style={newStyles.image}
            source={{ uri: currentMessage.image }}
          />
          <View style={{ flexDirection: "row", paddingHorizontal: 8, flex: 1 }}>
            <Text
              numberOfLines={1}
              style={[
                newStyles.dateText,
                { textAlign: "left", flex: 1, color: colors.getTextColor() },
              ]}>
              {arr[arr.length - 1]}
            </Text>
            <Text
              style={[newStyles.dateText, { color: colors.getTextColor() }]}>
              {three}.{type}{" "}
            </Text>
            <View style={{ width: 8 }} />
            <Text style={[newStyles.dateText, { color: textColor }]}>
              {dateDifference(new Date(), currentMessage.createdAt) == 0
                ? timeConverter(currentMessage.createdAt)
                : dateDifference(new Date(), currentMessage.createdAt) == 1
                ? "Yesterday"
                : serverTimeToLocal(currentMessage.createdAt)}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    if (UserInfo?.id == currentMessage?.senderId) {
      return (
        <View
          style={[
            newStyles.senderBox,
            { backgroundColor: colors.getSchemeColor() },
          ]}>
          <Text style={newStyles.title}>
            {vendor ? UserInfo?.name : props.data?.comity?.name}
          </Text>
          <Hyperlink
            onPress={(url, text) => {
              navigation.navigate("WebViews", { url: url, title: "" });
            }}
            linkStyle={{
              color: "blue",
              textDecorationLine: "underline",
            }}>
            <Text style={[newStyles.text, { color: textColor }]}>
              {currentMessage?.text}
            </Text>
          </Hyperlink>
          <Text style={[newStyles.dateText, { color: colors.getTextColor() }]}>
            {dateDifference(new Date(), currentMessage.createdAt) == 0
              ? timeConverter(currentMessage.createdAt)
              : dateDifference(new Date(), currentMessage.createdAt) == 1
              ? "Yesterday"
              : serverTimeToLocal(currentMessage.createdAt)}
          </Text>
        </View>
      );
    }

    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          marginRight: 16,
          marginVertical: 8,
        }}>
        <View
          style={[
            newStyles.receiverBox,
            isDark && { backgroundColor: colors.getShadowColor() },
          ]}>
          <Hyperlink
            onPress={(url, text) => {
              navigation.navigate("WebViews", { url: url, title: "" });
            }}
            linkStyle={{
              color: "#000",
              textDecorationLine: "underline",
            }}>
            <Text style={[newStyles.text, { color: "white" }]}>
              {currentMessage?.text}
            </Text>
          </Hyperlink>

          <Text style={[newStyles.dateText, { color: "white" }]}>
            {dateDifference(new Date(), currentMessage.createdAt) == 0
              ? timeConverter(currentMessage.createdAt)
              : dateDifference(new Date(), currentMessage.createdAt) == 1
              ? "Yesterday"
              : serverTimeToLocal(currentMessage.createdAt)}
          </Text>
        </View>
        {currentMessage?.send ? (
          <View
            style={{
              borderRadius: 10,
              width: 14,
              height: 14,
              borderWidth: 1,
              borderColor: isDark ? colors.getShadowColor() : "#737AFF",
              marginLeft: 5,
              marginHorizontal: 5,
            }}
          />
        ) : (
          <EvilIcons
            style={{
              marginLeft: 5,
            }}
            name="check"
            size={20}
            color={isDark ? colors.getShadowColor() : "#737AFF"}
          />
        )}
      </View>
    );
  };
  const LeftBubble = (props) => {
    const currentMessage = props?.item;
  };

  const fetchMessages = async () => {
    try {
      const { data } = await get(
        `/chat/message/get/${conversationId}?limit=${lim}&skip=${0}`,
        user?.token
      );
      setMessages(data.messages);
      //console.log(data.messages[0]);
      dispatch(loader.hide());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    socket?.on("newMessage", async (e) => {
      // console.log(e);
      addMessage(e);
      await post("/chat/message/make-it-seen", { message: e }, user?.token);
      //GiftedChat.append(data.message)
      //ref?.current?.scrollTo({x: 0, y: 0, animated: true})
    });
    return () => {
      socket.off("newMessage");
    };
  }, [socket, isFocus]);
  const addMessage = (e) => {
    //console.log(e);
    if (e.conversationId === conversationId) {
      setMessages((v) => [e, ...v]);
    }
  };

  useEffect(() => {
    fetchMessages();
    // console.log(data);
    setUserInfo(data.users.filter((u) => u.userId !== user.user.id)[0].user);
    //console.log(data.users.filter(u => u.userId!==user.user.id)[0].user);
  }, [isFocus, lim]);
  if (!UserInfo) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.getBackgroundColor() }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}>
      <View
        style={{
          height: inset?.top,
          backgroundColor: colors.getSchemeColor(),
        }}
      />
      <StatusBar
        style={isDark ? "light" : "dark"}
        backgroundColor={colors.getShadowColor()}
      />
      <ChatHead
        user={UserInfo}
        name={data?.comity?.name || UserInfo?.name || null}
        image={UserInfo ? UserInfo.profilePhoto : null}
        {...props}
        message={data}
        readOnly={readOnly}
      />
      <FlatList
        onEndReached={(e) => {
          // dispatch(loader.show());
          setLim((v) => v + 20);
          //console.log("end");
          //console.log(e.nativeEvent.contentOffset);
        }}
        style={{ flex: 1 }}
        ref={ref}
        data={messages}
        renderItem={(pr) => (
          <RenderBubble
            setAudioId={setAudioId}
            audioId={audioId}
            data={data}
            navigation={props.navigation}
            {...pr}
          />
        )}
        inverted
        keyExtractor={(item, i) => i.toString()}
      />
      {!readOnly && <BottomBar onSend={send} {...props} />}
      {readOnly && (
        <Text
          style={{
            fontSize: 16,

            fontWeight: "400",
            color: "#4D4E4F",
            marginHorizontal: 20,
            marginVertical: 30,
          }}>
          {isBn ? (
            <>
              এখানে উত্তর দেওয়া যাবে না। আপনার যদি অন্য কোন জিজ্ঞাসা থাকে তবে{" "}
              <Text
                onPress={() => {
                  props.navigation.navigate("Support");
                }}
                style={{
                  color: "#4ADE80",
                  fontWeight: "500",
                }}>
                লিঙ্কে
              </Text>{" "}
              যান।
            </>
          ) : (
            <>
              Can’t reply here. If you have other inquery go to the{" "}
              <Text
                onPress={() => {
                  props.navigation.navigate("Support");
                }}
                style={{
                  color: "#4ADE80",
                  fontWeight: "500",
                }}>
                support link.
              </Text>{" "}
            </>
          )}
        </Text>
      )}
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const BottomBar = (props) => {
  const [Message, setMessage] = React.useState();
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);
  const primaryColor = colors.getTextColor();
  const textColor = colors.getTextColor();
  const assentColor = colors.getBorderColor();
  const backgroundColor = colors.getBackgroundColor();
  const secondaryColor = colors.getSubTextColor();
  const [image, setImage] = React.useState();
  const [Visible, setVisible] = React.useState(false);
  const [CameraVisible, setCameraVisible] = React.useState(false);
  const [ImageLoader, setImageLoader] = React.useState(false);
  const [focused, setFocused] = useState(false);
  const [line, setLine] = useState();
  const isBn = useSelector((state) => state.isBn);
  const user = useSelector((state) => state.user);
  const values = new AppValues(isBn);
  const allValues = values.getValues();
  const [recording, setRecording] = React.useState();
  const [recordUri, setRecordUri] = React.useState();
  const [startAudio, setStartAudio] = React.useState(false);
  const dispatch = useDispatch();
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const animateRef = useRef();
  const styles = StyleSheet.create({
    view: {
      flexDirection: "row",
      paddingHorizontal: 20,
      alignItems: focused ? "flex-end" : "center",
      backgroundColor: backgroundColor,
      marginVertical: 12,
      marginTop: 4,
    },
    icon: {
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    input: {
      fontSize: 14,
      fontWeight: "500",
      flex: 1,
      paddingBottom: 3,
    },
    inputOutBox: {
      flexDirection: "row",
      borderRadius: line && line > 62 ? 12 : 32,
      backgroundColor: colors.getShadowColor(),
      alignItems: line && line > 62 ? "flex-end" : "center",
      flex: 1,
      paddingHorizontal: 12,
      paddingVertical: 12,
    },
  });
  const img = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.57999 19.0111L2.55999 19.0311C2.28999 18.4411 2.11999 17.7711 2.04999 17.0311C2.11999 17.7611 2.30999 18.4211 2.57999 19.0111ZM9.00099 10.3811C9.6322 10.3811 10.2376 10.1303 10.6839 9.68401C11.1302 9.23767 11.381 8.63231 11.381 8.00109C11.381 7.36988 11.1302 6.76452 10.6839 6.31818C10.2376 5.87184 9.6322 5.62109 9.00099 5.62109C8.36977 5.62109 7.76441 5.87184 7.31807 6.31818C6.87174 6.76452 6.62099 7.36988 6.62099 8.00109C6.62099 8.63231 6.87174 9.23767 7.31807 9.68401C7.76441 10.1303 8.36977 10.3811 9.00099 10.3811Z" fill="${colors.getTextColor()}" fill-opacity="0.87"/>
<path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.19C2 17.28 2.19 18.23 2.56 19.03C3.42 20.93 5.26 22 7.81 22H16.19C19.83 22 22 19.83 22 16.19V7.81C22 4.17 19.83 2 16.19 2ZM20.37 12.5C19.59 11.83 18.33 11.83 17.55 12.5L13.39 16.07C12.61 16.74 11.35 16.74 10.57 16.07L10.23 15.79C9.52 15.17 8.39 15.11 7.59 15.65L3.85 18.16C3.63 17.6 3.5 16.95 3.5 16.19V7.81C3.5 4.99 4.99 3.5 7.81 3.5H16.19C19.01 3.5 20.5 4.99 20.5 7.81V12.61L20.37 12.5Z" fill="${primaryColor}" fill-opacity="0.87"/>
</svg>
`;
  const cam = `<svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.63015 22H15.3703C18.1989 22 19.3262 20.31 19.4594 18.25L19.9923 9.99C20.0255 9.47783 19.9507 8.96446 19.7726 8.48161C19.5944 7.99876 19.3167 7.5567 18.9565 7.18275C18.5963 6.80879 18.1613 6.51089 17.6785 6.30746C17.1956 6.10403 16.6752 5.99939 16.1492 6C15.5241 6 14.9502 5.65 14.6632 5.11L13.9253 3.66C13.4539 2.75 12.2241 2 11.1788 2H8.83195C7.77637 2 6.54658 2.75 6.07516 3.66L5.33728 5.11C5.05033 5.65 4.47643 6 3.85128 6C1.62741 6 -0.135298 7.83 0.00817817 9.99L0.541089 18.25C0.664068 20.31 1.80163 22 4.63015 22Z" fill="${primaryColor}" fill-opacity="0.87"/>
<path d="M11.5375 8.75H8.46299C8.04281 8.75 7.69437 8.41 7.69437 8C7.69437 7.59 8.04281 7.25 8.46299 7.25H11.5375C11.9577 7.25 12.3061 7.59 12.3061 8C12.3061 8.41 11.9577 8.75 11.5375 8.75ZM10.0013 18.131C10.9199 18.131 11.801 17.7749 12.4506 17.141C13.1002 16.5071 13.4652 15.6474 13.4652 14.751C13.4652 13.8546 13.1002 12.9949 12.4506 12.361C11.801 11.7271 10.9199 11.371 10.0013 11.371C9.08257 11.371 8.20151 11.7271 7.5519 12.361C6.90229 12.9949 6.53734 13.8546 6.53734 14.751C6.53734 15.6474 6.90229 16.5071 7.5519 17.141C8.20151 17.7749 9.08257 18.131 10.0013 18.131Z" fill="${colors.getBackgroundColor()}"/>
</svg>
`;
  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      //console.log('Recording started');
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }
  async function stopRecording() {
    setRecording(undefined);
    animateRef?.current?.reset();
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    setRecordUri(uri);
    //console.log('Recording stopped and stored at', uri);
  }
  async function playSound() {
    setIsPlaying(true);
    console.log("Playing Sound...");
    const { sound } = await Audio.Sound.createAsync({ uri: recordUri });
    setSound(sound);
    await sound.playAsync();
  }
  async function stopSound() {
    setIsPlaying(false);
    console.log("Stop Sound...");
    await sound.pauseAsync();
    setSound();
  }
  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  if (startAudio) {
    return (
      <View
        style={[
          styles.inputOutBox,
          {
            flex: 0,
            marginBottom: 12,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
          mainStyle.mH20,
        ]}>
        <TouchableOpacity
          onPress={() => {
            setRecordUri(null);
            setRecording(undefined);
            animateRef?.current?.reset();
            setSound(null);
            setStartAudio(false);
            setIsPlaying(false);
          }}>
          <MaterialIcons name="delete" size={24} color={textColor} />
        </TouchableOpacity>
        <View>
          <LottieView
            style={{
              height: 25,
              width: 90,
            }}
            source={require("../assets/wave.json")}
            ref={animateRef}
            autoPlay
            loop
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          {recordUri ? (
            isPlaying ? (
              sound ? (
                <TouchableOpacity onPress={stopSound}>
                  <FontAwesome5
                    name="pause-circle"
                    size={24}
                    color={textColor}
                  />
                </TouchableOpacity>
              ) : (
                <ActivityIndicator size={"small"} color={textColor} />
              )
            ) : (
              <TouchableOpacity onPress={playSound}>
                <FontAwesome5 name="play-circle" size={24} color={textColor} />
              </TouchableOpacity>
            )
          ) : (
            <TouchableOpacity onPress={stopRecording}>
              <FontAwesome5 name="pause-circle" size={24} color={"red"} />
            </TouchableOpacity>
          )}

          {recordUri ? (
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={async () => {
                try {
                  dispatch(loader.show());
                  let arr = [];
                  arr.push(audioFileFromURL(recordUri));
                  setStartAudio(false);
                  const sound = await uploadFile(arr, user.token, "AUDIO");
                  // console.log(sound);
                  await props.onSend(null, null, sound[0]);
                } catch (e) {
                  dispatch(loader.hide());
                  console.error(e.message);
                }
              }}>
              <SvgXml xml={send} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
  return (
    <View style={styles.view}>
      {focused ? (
        <Pressable
          style={{
            paddingRight: 8,
            paddingBottom: 12,
          }}
          onPress={() => {
            setFocused(false);
          }}>
          <SvgXml xml={com} />
        </Pressable>
      ) : (
        <Animated.View style={{ flexDirection: "row" }} entering={FadeIn}>
          <TouchableOpacity
            onPress={() => {
              setImageLoader(false);
              pickImage()
                .then((res) => {
                  if (res) {
                    setImage(res);
                    setVisible(true);
                  }
                })
                .catch((err) => {
                  Alert.alert("Opps!", "Could not load image");
                });
            }}
            style={[styles.icon]}>
            <SvgXml xml={img} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCameraVisible(true);
            }}
            style={styles.icon}>
            <SvgXml xml={cam} />
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => {
              startRecording();
              setStartAudio(true);
            }}
            style={styles.icon}>
            <FontAwesome name="microphone" size={22} color={textColor} />
          </TouchableOpacity> */}
        </Animated.View>
      )}
      <MotiView
        onLayout={(e) => {
          setLine(e.nativeEvent.layout.height);
        }}
        animate={{
          minHeight: 48,
          maxHeight: focused ? 130 : 48,
        }}
        transition={{
          type: "timing",
          duration: 200,
        }}
        style={[styles.inputOutBox]}>
        <TextInput
          onPressIn={() => {
            setFocused(true);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          multiline={true}
          value={Message}
          onChangeText={(value) => {
            setFocused(true);
            if (value.split("").length > 1000) {
              return;
            }
            setMessage(value);
            //console.log(value)
          }}
          style={[styles.input, { color: textColor }]}
          placeholder={allValues.write}
          placeholderTextColor={colors.getBorderColor()}
          showsVerticalScrollIndicator={false}
        />
        <TouchableOpacity
          onPress={() => {
            if (!Message) {
              return;
            }
            props.onSend(Message).then(() => {
              //setMessage("");
            });
            setMessage("");
          }}>
          <SvgXml xml={send} />
        </TouchableOpacity>
      </MotiView>
      <Modal
        visible={Visible}
        onRequestClose={() => {
          setVisible(!Visible);
        }}>
        <ImageScreen
          onConfirm={async () => {
            setImageLoader(true);
            let arr = [];
            arr.push(fileFromURL(image));
            const images = await uploadFile(arr, user.token);
            //console.log(data);
            props
              .onSend(null, images[0])
              .then(() => {
                setMessage("");
                setImageLoader(false);
                //dispatch(loader.hide());
                setVisible(false);
              })
              .catch((err) => {
                setImageLoader(false);
                //dispatch(loader.hide());
                console.warn(err.message);
              });
          }}
          onCancel={() => {
            setImageLoader(false);
            dispatch(loader.hide());
            setVisible(false);
          }}
          image={image}
        />
        {ImageLoader && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              width: width,
              height: height,
            }}>
            <ActivityIndicator size={"small"} />
          </View>
        )}
      </Modal>
      <Modal
        visible={CameraVisible}
        onRequestClose={() => {
          setCameraVisible(!CameraVisible);
        }}>
        <CameraScreen
          goBack={() => setCameraVisible(false)}
          onTakePhoto={(pic) => {
            setImage(pic);
            setCameraVisible(false);
            setVisible(true);
          }}
        />
      </Modal>
    </View>
  );
};
const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
    aspect: [4, 3],
    quality: 0.6,
  });

  //console.log(result);
  if (!result.canceled) {
    return result.assets[0];
    //setImage();
  }
  return null;
};
const openCamera = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: false,
    aspect: [4, 3],
    quality: 0.8,
  });

  //console.log(result);
  if (!result.canceled) {
    return result.assets[0];
    //setImage();
  }
  return null;
};
const ImageScreen = ({ image, onCancel, onConfirm }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.786)",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Image
        style={{
          width: width,
          height: width - 50,
        }}
        source={{ uri: image.uri }}
      />
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 20,
          width: "100%",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          position: "absolute",
          bottom: 0,
        }}>
        <TouchableOpacity
          onPress={() => {
            if (onCancel) {
              onCancel();
            }
          }}>
          <Ionicons name="arrow-back" size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (onConfirm) {
              onConfirm();
            }
          }}>
          <Ionicons name="send-outline" size={25} color={"white"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const serverMessageToLocal = (message, user) => {
  if (message && user) {
    return {
      _id: message.id,
      text: message.text,
      createdAt: message.createdAt,
      user: {
        _id: user.id,
        name: `${user.name}`,
        avatar: user.profilePhoto,
      },
      image: message.image,
      sent: message.seen,
      send: message?.send,
    };
  }
  return null;
};

const send = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.0693 8.50901L9.50929 4.22901C3.75929 1.34901 1.39929 3.709 4.27929 9.459L5.14929 11.199C5.39929 11.709 5.39929 12.299 5.14929 12.809L4.27929 14.539C1.39929 20.289 3.74929 22.649 9.50929 19.769L18.0693 15.489C21.9093 13.569 21.9093 10.429 18.0693 8.50901ZM14.8393 12.749H9.43929C9.02929 12.749 8.68929 12.409 8.68929 11.999C8.68929 11.589 9.02929 11.249 9.43929 11.249H14.8393C15.2493 11.249 15.5893 11.589 15.5893 11.999C15.5893 12.409 15.2493 12.749 14.8393 12.749Z" fill="#737AFF"/>
</svg>
`;
const com = `<svg width="9" height="18" viewBox="0 0 9 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.999973 17.0002L7.51997 10.4802C8.28997 9.71016 8.28997 8.45016 7.51997 7.68016L0.999973 1.16016" stroke="#00A53C" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const newStyles = StyleSheet.create({
  dateText: {
    fontSize: 12,

    fontWeight: "400",
    marginTop: 4,
    textAlign: "right",
  },
  text: {
    fontSize: 16,

    fontWeight: "400",
  },
  title: {
    fontSize: 14,

    fontWeight: "500",
    color: "#737AFF",
  },
  senderBox: {
    backgroundColor: "#EFF8F4",
    padding: 8,
    maxWidth: "60%",
    borderRadius: 12,
    borderBottomLeftRadius: 4,
    marginLeft: 20,
    marginVertical: 8,
  },
  receiverBox: {
    padding: 8,
    maxWidth: "60%",
    borderRadius: 12,
    backgroundColor: "#737AFF",
    borderBottomRightRadius: 4,
    alignSelf: "flex-end",
  },
  imageBox: {
    width: "60%",
    height: 140,
    overflow: "hidden",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    marginVertical: 8,
    marginHorizontal: 20,
  },
  image: {
    width: "100%",
    height: 114,
  },
});
function getFileSize(url) {
  var fileSize = "";
  var http = new XMLHttpRequest();
  http.open("HEAD", url, false); // false = Synchronous

  http.send(null); // it will stop here until this http request is complete

  // when we are here, we already have a response, b/c we used Synchronous XHR

  if (http.status === 200) {
    fileSize = http.getResponseHeader("content-length");
    console.log("fileSize = " + fileSize);
  }

  return fileSize;
}
