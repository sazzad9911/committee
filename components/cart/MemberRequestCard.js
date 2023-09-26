import React, { useEffect } from "react";
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
  comity,
}) {
  const user = useSelector((state) => state.user);
  const c = useSelector((state) => state.comity);
  const dispatch = useDispatch();
  const isBn = useSelector((state) => state.isBn);
  const headlines = new AppValues(isBn).getValues();
  //console.log(data);
  useEffect(() => {
    //console.log(data.id);
  }, []);
  const getText = (type, name, position, isBn) => {
    if (c) {
      return isBn
        ? `${
            type == "Reject-Member-Request"
              ? `${
                  comity
                    ? `আপনি /.${name}/কে আপনার কমিটিতে যোগ দিতে প্রত্যাখ্যান করেছেন`
                    : `.${name}/ আপনার কমিটিতে /.${position}/ হিসাবে যোগদানের জন্য আপনার  অনুরোধ প্রত্যাখ্যান করেছেন`
                }`
              : type == "Accept-Member-Request"
              ? `${
                  comity
                    ? `আপনি /.${name}/কে আপনার কমিটির একজন /.${position}/ হিসাবে যোগদান করার জন্য গ্রহণ করেছেন।`
                    : `.${name}/ আপনার কমিটিতে /.${position}/ হিসাবে যোগদানের জন্য আপনার অনুরোধ গ্রহণ করেছেন।`
                }`
              : `.${name}/ আপনার কমিটিতে যোগদানের জন্য অনুরোধ করেছেন।`
          }`
        : `${
            type == "Reject-Member-Request"
              ? `${
                  comity
                    ? `You have declined /.${name}/ to join your comity`
                    : `.${name}/ has declined your request to join your comity as a /.${position}/`
                }`
              : type == "Accept-Member-Request"
              ? `${
                  comity
                    ? `You have accepted /.${name}/ to join your committee as a /.${position}`
                    : `.${name}/ has Accepted your request to join your comity as a /.${position}`
                }`
              : `.${name}/ has requested to join your comity`
          }`;
    } else {
      return isBn
        ? `${
            type == "Reject-Member-Request"
              ? `${
                  comity
                    ? `আপনি /.${name}/কে আপনার কমিটিতে যোগ দিতে প্রত্যাখ্যান করেছেন`
                    : `.${name}/ আপনার কমিটিতে বিশেষ সদস্য হিসাবে যোগদানের জন্য আপনার  অনুরোধ প্রত্যাখ্যান করেছেন`
                }`
              : type == "Accept-Member-Request"
              ? `${
                  comity
                    ? `আপনি /.${name}/কে আপনার কমিটির একজন /.${position}/ হিসাবে যোগদান করার জন্য গ্রহণ করেছেন।`
                    : `.${name}/ আপনার কমিটিতে বিশেষ সদস্য হিসাবে যোগদানের জন্য আপনার  অনুরোধ প্রত্যাখ্যান করেছেন`
                }`
              : `.${name}/ আপনার কমিটিতে যোগদানের জন্য অনুরোধ করেছেন।`
          }`
        : `${
            type == "Reject-Member-Request"
              ? `${
                  comity
                    ? `You have declined /.${name}/ to join your comity`
                    : `.${name}/ আপনার কমিটিতে বিশেষ সদস্য হিসাবে যোগদানের জন্য আপনার  অনুরোধ প্রত্যাখ্যান করেছেন`
                }`
              : type == "Accept-Member-Request"
              ? `${
                  comity
                    ? `You have accepted /.${name}/ to join your committee as a /.${position}`
                    : `.${name}/ আপনার কমিটিতে বিশেষ সদস্য হিসাবে যোগদানের জন্য আপনার  অনুরোধ প্রত্যাখ্যান করেছেন`
                }`
              : `.${name}/ has requested to join your comity`
          }`;
    }
  };
  const accept = (id) => {
    dispatch(loader.show());
    post(`/member/request/accept/${id}`, null, user.token)
      .then((res) => {
        dispatch(loader.hide());
        dispatch(toast.success("Request accepted"));
      })
      .catch((err) => {
        dispatch(loader.hide());
        dispatch(toast.error(err.response.data.msg));
      });
  };
  const reject = (id) => {
    dispatch(loader.show());
    //console.log(id);
    post(
      `/member/request/reject`,
      {
        memberId: id,
      },
      user.token
    )
      .then((res) => {
        dispatch(loader.hide());
        dispatch(toast.success("Request cancelled"));
      })
      .catch((err) => {
        dispatch(loader.hide());
        dispatch(toast.error(err.response.data.msg));
      });
  };
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
        <Avatar
          source={{
            uri: c ? data?.user?.profilePhoto : data?.comity?.profilePhoto,
          }}
          style={{ height: 40, width: 40 }}
        />
        <Text
          style={{
            marginLeft: 12,
            fontSize: 16,
            fontWeight: "400",
            color: textColor,
            flex: 1,
          }}>
          {getText(
            type,
            c ? data?.user?.name : data?.comity?.name,
            "General Member",
            isBn
          )
            .split("/")
            .map((doc, i) =>
              doc.split("")[0] === "." ? (
                <Text
                  key={i}
                  style={{
                    fontWeight: "700",
                  }}>
                  {doc
                    ? doc
                        .split("")
                        .filter((d) => d != ".")
                        .join("")
                    : ""}
                </Text>
              ) : (
                <Text
                  key={i}
                  style={{
                    fontWeight: "400",
                  }}>
                  {doc ? doc : ""}
                </Text>
              )
            )}
        </Text>
      </View>
      {type === "New-Member-Request" && (
        <View
          style={{
            marginTop: 12,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}>
          <Button
            onPress={() => reject(data.entityId)}
            bg={["#F00", "#F00"]}
            active={true}
            style={{ paddingHorizontal: 24 }}
            title={headlines._decline}
          />
          <View style={{ width: 12 }} />
          <Button
            onPress={() => accept(data.entityId)}
            style={{ paddingHorizontal: 24 }}
            active={true}
            title={headlines._accept}
          />
        </View>
      )}
    </View>
  );
}
