import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { AppColors } from "../../functions/colors";
import mainStyle from "../../styles/mainStyle";

export default function RadioButton({ title, value, onChange, style }) {
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);
  const textColor = colors.getTextColor();
  const mainColor = colors.getMainColor();
  const borderColor = colors.getBorderColor();
  const [open, setOpen] = useState(value);
  useEffect(()=>{
    setOpen(value)
  },[value])

  return (
    <Pressable
      onPress={() => {
        onChange && onChange();
        setOpen(true);
      }}
      style={[mainStyle.flexBox,{justifyContent:"flex-start"}]}>
      <View
        style={[
          {
            height: 20,
            width: 20,
            borderWidth: 1.5,
            borderColor:isDark? "#fff":"rgba(0, 0, 0, 0.2)",
            borderRadius: 10,
            marginRight: 10,
            justifyContent:"center",
            alignItems:"center",
            backgroundColor:isDark?"rgba(255, 255, 255, 0.6)":null
          },
          style,
        ]}>
            {open&&(
                <View  style={{
                    backgroundColor:  "rgba(43, 50, 178, 1)" ,
                    borderRadius:7,
                    width:12,
                    height:12,
                }}/>
            )}
        </View>
      <Text
        style={{
          color: textColor,
          fontSize: 16,
          fontWeight: "400",
        }}>
        {title}
      </Text>
    </Pressable>
  );
}
