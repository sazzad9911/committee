import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { AppColors } from "../../functions/colors";
import { LinearGradient } from "expo-linear-gradient";

const Button = ({
  Icon,
  style,
  onPress,
  title,
  disabled,
  active,
  LeftIcon,
  bg,
  placeholder,
  placeholderTextColor,
  color,
  fontStyle
}) => {
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);
  const backgroundColor = colors.getBackgroundColor();
  const textColor = colors.getTextColor();
  const primaryColor = colors.getMainColor();
  const ac = ["#1488CC", "#2B32B2"];
  const dc = [backgroundColor, backgroundColor];
  const borderColor = colors.getShadowColor();

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}
    >
      <LinearGradient
        // Button Linear Gradient
        style={[
          {
            paddingHorizontal: 10,
           
            flexDirection: "row",
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            height: 45,
            borderWidth: active ? 0 : 1,
            borderColor: colors.getShadowColor(),
          },
          style,
        ]}
        start={{ x: 0.2, y: 0 }}
        colors={Array.isArray(bg) ? bg : active ? ac : dc}
      >
        {LeftIcon && (
          <View>
            <LeftIcon />
          </View>
        )}
        {LeftIcon && title && <View style={{ width: 10 }} />}
        {title && (
          <Text
            style={[{
              fontSize: style && style.fontSize ? style.fontSize : 14,
              color: active ? "white" : color ? color : borderColor,
              opacity: disabled ? 0.4 : 1,
              fontWeight: "600",
            },fontStyle]}
          >
            {title}
          </Text>
        )}
        {placeholder && !title && (
          <Text
            style={{
              fontSize: style && style.fontSize ? style.fontSize : 14,
              color: placeholderTextColor ? placeholderTextColor : borderColor,
              opacity: disabled ? 0.4 : 1,
            }}
          >
            {placeholder}
          </Text>
        )}
        {Icon && title && <View style={{ width: 10 }} />}
        {Icon && (
          <View style={{ marginLeft: 0 }}>
            <Icon />
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Button;
