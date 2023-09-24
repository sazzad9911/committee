import React from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { post } from "../../apis/multipleApi";
import loader from "../../data/loader";
import toast from "../../data/toast";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";
import Avatar from "../main/Avatar";
import Button from "../main/Button";

export default function MemberRequestCard({
  textColor,
  shadowColor,
  name,
  type,
  mainColor,
  id,
  data,
}) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const isBn=useSelector(state=>state.isBn);
  const headlines=new AppValues(isBn).getValues()
  //console.log(data);
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginVertical: 12,
      }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}>
        <Avatar style={{ height: 40, width: 40 }} />
        <Text
          style={{
            marginLeft: 12,
            fontSize: 16,
            fontWeight: "400",
            color: textColor,
          }}>
          <Text
            style={{
              fontWeight: "700",
            }}>
            Easin Arafat
          </Text>{" "}
          has requested to join your comity
        </Text>
      </View>
      {type==="New-Member-Request"&&(
        <View
        style={{
          marginTop: 12,
          flexDirection: "row",
          justifyContent: "flex-end",
        }}>
        <Button
          bg={["#F00", "#F00"]}
          active={true}
          style={{ paddingHorizontal: 24 }}
          title={headlines._decline}
        />
        <View style={{ width: 12 }} />
        <Button
          style={{ paddingHorizontal: 24 }}
          active={true}
          title={headlines._accept}
        />
      </View>
      )}
    </View>
  );
}
