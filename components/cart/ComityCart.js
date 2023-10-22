import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
export const ComityCart = ({ comity, style, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          marginHorizontal: 6,
        },
        style,
      ]}
    >
      <Image
        style={{
          height: style?.height ? style.height : 177,
          borderRadius: 16,
          width: style?.width ? style.width : width / 3,
        }}
        source={{
          uri:
            comity?.profilePhoto ||
            "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png",
        }}
      />
      <Text
        style={{
          position: "absolute",
          bottom: 0,
          left: 16,
          paddingHorizontal: 8,
          paddingVertical: 12,
          fontSize: 16,
          fontWeight: "500",
          color: "#fff",
        }}
      >
        {comity.name}
      </Text>
    </Pressable>
  );
};
