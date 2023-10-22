import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { get, post } from "../apis/multipleApi";
import MemberCard from "../components/cart/MemberCard";
import loader from "../data/loader";
import toast from "../data/toast";
import { AppColors } from "../functions/colors";
import ChatCart from "../components/cart/ChatCard";
import NoOption from "../components/main/NoOption";

export default function ComitteeList({ data, navigation, onClose }) {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const colors = new AppColors(isDark);
  const [list, setList] = useState();
  const [searched, setSearched] = useState();
  const user = useSelector((state) => state.user);
  const comity = useSelector((state) => state.comity);
  const [text, setText] = useState();
  const dispatch = useDispatch();

  if (data?.length == 0) {
    return (
      <View>
        <NoOption title={isBn ? "খুঁজে পাওয়া যাচ্ছে না" : "Not Found"} />
      </View>
    );
  }

  return (
    <View>
      {data?.map((doc, i) => (
        <ChatCart
          key={i}
          index={doc.id}
          onPress={() => {
            navigation?.navigate("ChatScreen", {
              conversationId: doc.id,
              data: doc,
            });
          }}
          conversation={doc}
          active={true}
        />
      ))}
    </View>
  );
}
