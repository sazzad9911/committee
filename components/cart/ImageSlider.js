import { useState } from "react";
import { Dimensions, View } from "react-native";
import { SliderBox } from "react-native-image-slider-box";

const images = [
  require("../../assets/s1.png"),
  require("../../assets/s2.png"),
  require("../../assets/s3.png"),
  require("../../assets/s4.png"),
];
const ImageSlider = () => {
  return (
    <View
      style={{
        flex: 1,
        position: "relative",
        marginLeft: 20,
      }}
    >
      <SliderBox
        autoplay
        circleLoop
        ImageComponentStyle={{ paddingHorizontal: 20 }}
        images={images}
        dotColor="#3300FF"
        inactiveDotColor="#A9A9A9"
        resizeMode="contain"
        parentWidth={Dimensions.get("window").width - 40}
        sliderBoxHeight={(Dimensions.get("window").width - 40) * 0.6}
        dotStyle={{
          padding: 0,
          width: 9,
          height: 9,
          borderRadius: 9,
          bottom: -30,
        }}
      />
    </View>
  );
};

export default ImageSlider;
