import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
const { width, height } = Dimensions.get("window");
import { useSelector, useDispatch } from "react-redux";
import { AppColors } from "../../functions/colors";
import {
  dateDifference,
  serverTimeToLocal,
  timeConverter,
} from "../../functions/action";
import Avatar from "../main/Avatar";
import { socket } from "../../apis/multipleApi";

const ChatCart = ({
  navigation,
  active,
  data,
  conversation,
  readOnly,
  onPress,
}) => {
  const [Active, setActive] = React.useState(active);
  //const navigation = props.navigation;
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);
  const textColor = colors.getTextColor();
  const borderColor = colors.getBorderColor();
  const subTextColor = colors.getSubTextColor();
  //const data = props.data;
  const user = useSelector((state) => state.user);
  const [UserInfo, setUserInfo] = React.useState();
  const [LastMessage, setLastMessage] = React.useState();
  const vendor = useSelector((state) => state.comity);
  const [count, setCount] = useState(1);
  //console.log(data.serviceId)
//console.log(conversation);
  const styles = StyleSheet.create({
    outBox: {
      marginLeft: 20,
      marginVertical: 0,
      width: width - 20,
      paddingVertical: 0,
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      marginTop: 12,
    },
    box: {
      marginLeft: 20,
      justifyContent: "flex-end",
    },
    image: {
      width: 56,
      height: 56,
      borderRadius: 28,
      marginRight: 10,
      borderColor: borderColor,
    },
    head: {
      fontSize: 16,
      fontWeight: "700",
      color: textColor,
    },
    text: {
      fontSize: 12,
      fontWeight: "400",
      color: subTextColor,
    },
    date: {
      fontSize: 10,
      textAlign: "right",
      color: "gray",
      fontFamily: "Poppins-Light",
    },
    active: {
      backgroundColor: "#737AFF",
      height: 10,
      width: 10,
      borderRadius: 5,
      position: "absolute",
      top: 55,
      left: 48,
      borderWidth: 1,
      borderColor: "white",
    },
  });
  useEffect(() => {
    setUserInfo(conversation.users.filter(u => u.userId!==user.user.id)[0].user);
  },[conversation])
  useEffect(()=>{
    socket.on("users",e=>{
      console.log(e)
    })
  },[])
  return (
    <TouchableOpacity
      onPress={() => onPress && onPress()}
      style={[styles.outBox, {}]}
    >
      <View style={styles.image}>
        {readOnly ? (
          <Image source={logo} style={styles.image} />
        ) : (
          <Avatar
            style={styles.image}
            source={
              vendor
                ? {
                    uri: UserInfo?.profilePhoto,
                  }
                : {
                    uri: conversation?.comity?.profilePhoto
                  }
            }
          />
        )}
        {Active && (
          <View
            style={{
              backgroundColor: "#4ADE80",
              width: 10,
              height: 10,
              borderRadius: 5,
              position: "absolute",
              bottom: 5,
              right: 1,
              borderWidth: 1.5,
              borderColor: "#ffffff",
              zIndex: 100,
            }}
          />
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#E6E6E6",
          flex: 1,
          height: "100%",
          justifyContent: "space-between",
          paddingVertical: 12,
        }}
      >
        <View style={{ flex: 1 }}>
          {!vendor && !conversation?.readOnly ? (
            <Text style={styles.head}>{conversation?.comity?.name}</Text>
          ) : conversation?.readOnly ? (
            <Text style={styles.head}>Comity</Text>
          ) : (
            <Text numberOfLines={1} style={[styles.head, { flex: 1 }]}>
              {UserInfo?.name}
            </Text>
          )}
          <Text
            numberOfLines={1}
            style={[styles.text, { marginTop: 4, maxWidth: "60%" }]}
          >
            {conversation?.messages[0]?.text || "-"}
          </Text>
        </View>
        <View
          style={[
            styles.box,
            {
              alignItems: "flex-end",
              paddingRight: 20,
              flex: 1,
            },
          ]}
        >
          {count > 0 && (
            <View
              style={{
                backgroundColor: "#737AFF",
                width: 16,
                height: 16,
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: "#ffffff",
                  fontWeight: "700",
                }}
              >
                {count}
              </Text>
            </View>
          )}
          <Text style={styles.text}>
            {conversation.messages[0]?.createdAt
              ? `${
                  dateDifference(
                    new Date(),
                    conversation.messages[0]?.createdAt
                  ) == 0
                    ? timeConverter(conversation.messages[0]?.createdAt)
                    : dateDifference(
                        new Date(),
                        conversation.messages[0]?.createdAt
                      ) == 1
                    ? "Yesterday"
                    : serverTimeToLocal(conversation.messages[0]?.createdAt)
                }`
              : ""}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatCart;
