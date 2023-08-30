import React from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { post } from "../../apis/multipleApi";
import loader from "../../data/loader";
import toast from "../../data/toast";
import mainStyle from "../../styles/mainStyle";
import Button from "../main/Button";

export default function MemberRequestCard({
  textColor,
  shadowColor,
  name,
  type,
  mainColor,
  id,
  data
}) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  //console.log(data);
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: shadowColor,
        borderRadius: 5,
      }}>
      <Text
        style={[
          {
            color: textColor,
          },
          mainStyle.subLevel,
        ]}>
        You have new request to join the comity{" "}
        <Text
          style={{
            fontWeight: 700,
            color: "#1B7CD6",
          }}>
          {name ? name : "Trimity"}
        </Text>{" "}
        as{" "}
        <Text
          style={{
            fontWeight: 700,
            color: "#1B7CD6",
          }}>
          {type ? type : "General"}
        </Text>{" "}
        Member
      </Text>
     {data?.status==="Pending" ?( <View
        style={{
          flexDirection: "row",
          marginTop: 8,
        }}>
        <Button
          onPress={async () => {
            dispatch(loader.show())
            try {
              await post(`/member/request/accept/${data.id}`,null, user.token)
              dispatch(loader.hide())
              dispatch(toast.success("Request accepted"))
            } catch (e) {
              console.error(e.message);
              dispatch(loader.hide())
              dispatch(toast.error("Request failed"))
            }
          }}
          active={true}
          title={"Accept"}
        />
        <View style={{ width: 10 }} />
        <Button onPress={async () => {
            dispatch(loader.show())
            try {
              await post(`/member/request/reject/${id}`,null, user.token);
              dispatch(loader.hide())
              dispatch(toast.success("Request accepted"))
            } catch (e) {
              console.error(e.message);
              dispatch(loader.hide())
              dispatch(toast.error("Request failed"))
            }
          }} color="red" title={"Reject"} />
      </View>):null}
    </View>
  );
}
