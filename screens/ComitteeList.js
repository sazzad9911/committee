import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { get, post } from "../apis/multipleApi";
import MemberCard from "../components/cart/MemberCard";
import loader from "../data/loader";
import toast from "../data/toast";
import { AppColors } from "../functions/colors";

export default function ComitteeList({ data,navigation,onClose }) {
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);
  const [list, setList] = useState();
  const [searched, setSearched] = useState();
  const user = useSelector((state) => state.user);
  const comity = useSelector((state) => state.comity);
  const [text, setText] = useState();
  const dispatch=useDispatch()

  return (
    <View>
      {data?.map((doc, i) => (
        <MemberCard
          key={i}
          onPress={async() => {
            onClose&&onClose()
            dispatch(loader.show());
                try {
                  const res = await post(
                    "/chat/conversation/create",
                    {
                      userId: doc.users[0].user.id,
                      comityId: comity.id,
                    },
                    user.token
                  );
                  //console.log(res.data);
                  navigation.navigate("ChatScreen", {
                    conversationId: res.data.conversation.id,
                    data:res.data.conversation
                  });
                  dispatch(loader.hide());
                } catch (e) {
                  //console.error(e.message);
                  dispatch(loader.hide());
                  dispatch(toast.error("Error loading"));
                }
          }}
          textColor={colors.getTextColor()}
          backgroundColor={colors.getBackgroundColor()}
          borderColor={colors.getShadowColor()}
          name={comity ? doc.users[0].user.name : doc.comity.name}
          offline
          url={
            comity ? doc.users[0].user.profilePhoto : doc.comity.profilePhoto
          }
        />
      ))}
    </View>
  );
}
