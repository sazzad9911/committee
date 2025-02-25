import React from "react";
import { Image, Pressable } from "react-native";
import { SvgXml } from "react-native-svg";

export default function Avatar({ onPress, url, source, style }) {
  const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="${
    style?.width ? style.width : 40
  }" height="${
    style?.width ? style.width : 40
  }" fill-rule="evenodd" clip-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" viewBox="0 0 4335 4335" id="avatar"><path fill="#6d97b5" d="M2155 4191c1116 0 2021-905 2021-2021S3271 149 2155 149 134 1054 134 2170s905 2021 2021 2021z"></path><path fill="#e6e6e6" d="M2156 1207h14c308 9 555 304 555 667s-247 659-555 667h-15c-351 0-569-345-569-668 0-363 247-659 555-667h15zM914 3737s417-823 719-963c247-114 800-114 1046 0 302 139 719 963 719 963-411 335-929 423-1173 446v8s-25 0-69-3c-44 3-69 3-69 3v-8c-244-23-762-111-1173-446z"></path></svg>`;

  
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          width: 40,
          height: 40,
          borderRadius: style?.height ? style.height / 2 : 40 / 2,
          overflow: "hidden",
        },
        style,
      ]}>
      {source && source.uri ? (
        <Image
          style={{
            height: style?.height ? style.height : 40,
            width: style?.width ? style.width : 40,
          }}
          source={source ? source : { uri: url }}
        />
      ) : (
        <SvgXml width={style?.width ? style.width : 40} xml={icon} />
      )}
    </Pressable>
  );
}
