import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import ComityP from "../../assets/comity_p.jpeg";

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
        source={
          comity?.profilePhoto
            ? {
                uri: comity?.profilePhoto,
              }
            : ComityP
        }
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
