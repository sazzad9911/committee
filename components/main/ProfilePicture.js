import React from "react";
import { View, Image, Pressable } from "react-native";
import { SvgXml } from "react-native-svg";
import * as ImagePicker from "expo-image-picker";

export const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: false,
    aspect: [4, 3],
    quality: 1,
  });

  //console.log(result);

  if (!result.canceled) {
    let localUri = result.assets[0].uri;
    let filename = localUri.split("/").pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    return { uri: localUri, name: filename, type };
  }
};

export default function ProfilePicture({
  containerStyle,
  imageStyle,
  source,
  edit,
  onEdit,
}) {
  return (
    <View
      style={[
        {
          width: 100,
          height: 100,
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "center",
        },
        containerStyle,
      ]}>
      <SvgXml
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
        width={containerStyle?.width ? containerStyle?.width : 103}
        xml={icon}
      />
      {source&&source.uri ? (
        <Image
          style={[
            {
              width: 88,
              height: 88,
              borderRadius: 44,
            },
            imageStyle,
          ]}
          source={source}
        />
      ) : (
        <SvgXml
          width={imageStyle?.width ? imageStyle.width : 76}
          xml={unknown}
        />
      )}
      {edit && (
        <Pressable
          onPress={onEdit}
          style={{
            position: "absolute",
            right: -3,
            bottom: 5,
          }}>
          <SvgXml xml={editt} />
        </Pressable>
      )}
    </View>
  );
}
const icon = `<svg width="104" height="100" viewBox="0 0 104 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.41494 43.6695C1.5936 43.5613 1.01316 42.8071 1.14587 41.9894C2.97659 30.7087 8.62108 20.3782 17.1604 12.7378C25.6997 5.09741 36.5919 0.632032 48.006 0.0622012C48.8333 0.0208946 49.5186 0.681313 49.5351 1.50958C49.5516 2.33784 48.893 3.02016 48.0657 3.06305C37.3692 3.61759 27.1653 7.81163 19.1608 14.9736C11.1562 22.1355 5.85766 31.812 4.12162 42.3812C3.98735 43.1987 3.23628 43.7776 2.41494 43.6695Z" fill="url(#paint0_linear_5025_37885)"/>
<path d="M53.7645 1.48468C53.8154 0.727005 54.4714 0.152168 55.2274 0.223955C66.3809 1.28306 76.871 6.06037 84.9996 13.8091C93.1282 21.5579 98.4017 31.8075 99.993 42.8975C100.101 43.6492 99.558 44.332 98.8037 44.4191C98.0493 44.5063 97.3691 43.9648 97.2601 43.2133C95.7434 32.7619 90.7654 23.1048 83.1021 15.7996C75.4389 8.4945 65.5547 3.98401 55.0427 2.96885C54.2869 2.89585 53.7135 2.24236 53.7645 1.48468Z" fill="url(#paint1_linear_5025_37885)"/>
<path d="M98.9081 47.0151C99.7349 46.9642 100.449 47.5932 100.475 48.4212C100.666 54.4756 99.756 60.5187 97.784 66.255C95.6494 72.4644 92.3127 78.1926 87.9643 83.1124C83.6159 88.0323 78.3411 92.0475 72.4409 94.9288C66.9904 97.5906 61.1048 99.2365 55.0728 99.7905C54.2478 99.8662 53.5358 99.2349 53.4849 98.4081C53.4339 97.5812 54.0632 96.8721 54.888 96.7947C60.5268 96.266 66.0279 94.722 71.1244 92.2331C76.6705 89.5247 81.629 85.7504 85.7164 81.1257C89.8038 76.501 92.9404 71.1165 94.947 65.2797C96.7908 59.916 97.6474 54.2669 97.4794 48.6059C97.4548 47.7778 98.0812 47.0661 98.9081 47.0151Z" fill="url(#paint2_linear_5025_37885)"/>
<path d="M48.3268 98.4513C48.2897 99.2789 47.5884 99.922 46.7623 99.8601C40.7218 99.4073 34.8095 97.8602 29.3152 95.2902C23.3676 92.5082 18.0262 88.5819 13.596 83.7356C9.16574 78.8893 5.73345 73.2179 3.49506 67.0451C1.42724 61.3427 0.415705 55.3157 0.505493 49.2589C0.517773 48.4306 1.22112 47.7897 2.04871 47.8268C2.87631 47.8639 3.51461 48.565 3.50391 49.3934C3.43081 55.0564 4.38185 60.6904 6.31535 66.0224C8.41944 71.8248 11.6458 77.156 15.8102 81.7115C19.9746 86.267 24.9955 89.9577 30.5863 92.5728C35.7238 94.9759 41.25 96.4275 46.8968 96.8617C47.7228 96.9252 48.3639 97.6237 48.3268 98.4513Z" fill="url(#paint3_linear_5025_37885)"/>
<defs>
<linearGradient id="paint0_linear_5025_37885" x1="0.500024" y1="50" x2="100.5" y2="50" gradientUnits="userSpaceOnUse">
<stop stop-color="#72C6EF"/>
<stop offset="1" stop-color="#004E8F"/>
</linearGradient>
<linearGradient id="paint1_linear_5025_37885" x1="0.500012" y1="50" x2="100.5" y2="50" gradientUnits="userSpaceOnUse">
<stop stop-color="#16A085"/>
<stop offset="1" stop-color="#F4D03F"/>
</linearGradient>
<linearGradient id="paint2_linear_5025_37885" x1="0.500049" y1="50" x2="100.5" y2="50" gradientUnits="userSpaceOnUse">
<stop stop-color="#00416A"/>
<stop offset="1" stop-color="#E4E5E6"/>
</linearGradient>
<linearGradient id="paint3_linear_5025_37885" x1="0.500002" y1="50" x2="100.5" y2="50" gradientUnits="userSpaceOnUse">
<stop stop-color="#799F0C"/>
<stop offset="1" stop-color="#ACBB78"/>
</linearGradient>
</defs>
</svg>
`;
const unknown = `<svg width="77" height="76" viewBox="0 0 77 76" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" width="76" height="76" rx="38" fill="#4ADE80"/>
<path d="M37.4998 36.5307C40.3066 36.5307 42.9984 35.5419 44.9831 33.7818C46.9678 32.0217 48.0828 29.6345 48.0828 27.1454C48.0828 24.6562 46.9678 22.269 44.9831 20.5089C42.9984 18.7488 40.3066 17.76 37.4998 17.76C34.693 17.76 32.0011 18.7488 30.0164 20.5089C28.0317 22.269 26.9167 24.6562 26.9167 27.1454C26.9167 29.6345 28.0317 32.0217 30.0164 33.7818C32.0011 35.5419 34.693 36.5307 37.4998 36.5307ZM37.4998 41.2234C26.8955 41.2234 18.2598 47.5304 18.2598 55.3015C18.2598 55.8271 18.7254 56.24 19.3181 56.24H55.6815C56.2741 56.24 56.7398 55.8271 56.7398 55.3015C56.7398 47.5304 48.104 41.2234 37.4998 41.2234Z" fill="white"/>
</svg>
`;
const editt = `<svg width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="33.7778" height="32" rx="16" fill="#59A7D6"/>
<path d="M16.889 14.2222C15.4436 14.2222 14.2223 15.4436 14.2223 16.8889C14.2223 18.3342 15.4436 19.5556 16.889 19.5556C18.3343 19.5556 19.5556 18.3342 19.5556 16.8889C19.5556 15.4436 18.3343 14.2222 16.889 14.2222Z" fill="#F2F2F6"/>
<path d="M24 10.6667H21.7013L19.2951 8.26044C19.1289 8.09333 18.9031 8 18.6667 8H15.1111C14.8747 8 14.6489 8.09333 14.4827 8.26044L12.0764 10.6667H9.77778C8.79733 10.6667 8 11.464 8 12.4444V22.2222C8 23.2027 8.79733 24 9.77778 24H24C24.9804 24 25.7778 23.2027 25.7778 22.2222V12.4444C25.7778 11.464 24.9804 10.6667 24 10.6667ZM16.8889 21.3333C14.48 21.3333 12.4444 19.2978 12.4444 16.8889C12.4444 14.48 14.48 12.4444 16.8889 12.4444C19.2978 12.4444 21.3333 14.48 21.3333 16.8889C21.3333 19.2978 19.2978 21.3333 16.8889 21.3333Z" fill="#F2F2F6"/>
</svg>
`;
