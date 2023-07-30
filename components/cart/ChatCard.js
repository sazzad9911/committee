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
import { dateDifference, serverTimeToLocal, timeConverter } from "../../functions/action";
import Avatar from "../main/Avatar";

const ChatCart = ({ navigation, active, data, number, readOnly,onPress }) => {
  const [Active, setActive] = React.useState(active);
  //const navigation = props.navigation;
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);
  const textColor=colors.getTextColor()
  const borderColor=colors.getBorderColor()
  const subTextColor=colors.getSubTextColor()
  //const data = props.data;
  const user = useSelector((state) => state.user);
  const [UserInfo, setUserInfo] = React.useState();
  const [LastMessage, setLastMessage] = React.useState();
  const vendor = useSelector((state) => state.vendor);
  const [count, setCount] = useState(1);
  //console.log(data.serviceId)
  
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
      color:textColor
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
  return (
    <TouchableOpacity
      onPress={() =>
        onPress&&onPress()
      }
      style={[styles.outBox, {}]}>
      <View style={styles.image}>
        {readOnly ? (
          <Image source={logo} style={styles.image} />
        ) : (
          <Avatar
            style={styles.image}
            source={
              vendor
                ? {
                    uri: UserInfo.profilePhoto ? UserInfo.profilePhoto : null,
                  }
                : {
                    uri: data?.service?.profilePhoto
                      ? data.service.profilePhoto
                      : "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
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
        }}>
        <View style={{ flex: 1 }}>
          {vendor && !data?.readOnly ? (
            <Text style={styles.head}>
              Hello All
            </Text>
          ) : data?.readOnly ? (
            <Text style={styles.head}>Duty</Text>
          ) : (
            <Text numberOfLines={1} style={[styles.head, { flex: 1 }]}>
              Hello BD
            </Text>
          )}
          <Text
              numberOfLines={1}
              style={[styles.text, { marginTop: 4, maxWidth: "60%" }]}>
              {LastMessage ? LastMessage.text : "Se as pa"}
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
          ]}>
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
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: "#ffffff",
                  fontWeight: "700",
                }}>
                {count}
              </Text>
            </View>
          )}
          <Text style={styles.text}>
            {LastMessage
              ? `${
                  dateDifference(new Date(), LastMessage.updatedAt) == 0
                    ? timeConverter(LastMessage.updatedAt)
                    : dateDifference(new Date(), LastMessage.updatedAt) == 1
                    ? "Yesterday"
                    : serverTimeToLocal(LastMessage.updatedAt)
                }`
              : "Jul 21 2:30 Pm"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatCart;