import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { get } from "../apis/multipleApi";
import MemberCard from "../components/cart/MemberCard";
import { AppColors } from "../functions/colors";

export default function ComitteeList({ data }) {
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);
  const [list, setList] = useState();
  const [searched, setSearched] = useState();
  const user = useSelector((state) => state.user);
  const [text, setText] = useState();

  return (
    <View>
      {data?.map((doc, i) => (
        <MemberCard key={i}
          textColor={colors.getTextColor()}
          backgroundColor={colors.getBackgroundColor()}
          borderColor={colors.getShadowColor()}
          name={doc.comity.name}
          offline
          url={doc.comity.profilePhoto}
        />
      ))}
    </View>
  );
}
