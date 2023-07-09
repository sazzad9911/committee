import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { SvgXml } from "react-native-svg";

export const CheckBox = ({
  onChange,
  value,
  title,
  style,
  disabled,
  decline,
  component,
}) => {
  const [checked, setChecked] = React.useState(false);
  React.useEffect(() => {
    setChecked(value);
  }, [value]);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
      }}>
      <Pressable
        disabled={disabled}
        onPress={() => {
          if (decline) {
            return;
          }
          if (onChange) {
            onChange(title);
          }
          setChecked(!checked);
        }}
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            opacity: disabled ? 0.5 : 1,
            flexWrap: "wrap",
          },
          style,
        ]}>
        <View
          style={{
            borderColor: "#D1D1D1",
            height: 20,
            width: 20,
            borderWidth: 1.5,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 10,
            marginTop: 2,
          }}>
          {checked && (
            <SvgXml
              style={{
                marginBottom: 7,
                marginLeft: 7,
              }}
              xml={tick}
              height="50"
              width="50"
            />
          )}
        </View>
        {!component && (
          <Text
            style={[
              styles.text,
              {
                flex: 1,
                color: style && style.color ? style.color : "black",
                fontSize: style && style.fontSize ? style.fontSize : 16,
                margin: 0,
                lineHeight: style?.lineHeight,
              },
            ]}>
            {title}
          </Text>
        )}
      </Pressable>
      {component&&(<View style={{ flex: 1 }}>{component}</View>)}
    </View>
  );
};
const styles = StyleSheet.create({
  viewBox: {
    marginVertical: 10,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    minHeight: 50,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
  },
  button: {
    height: 35,
    width: 35,
    borderRadius: 18,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    fontSize: 13,
    marginTop: 3,
    marginBottom: 3,
    color: "red",
    margin: 3,
  },
});
const tick = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="43.062" height="37.867" viewBox="0 0 43.062 37.867">
<defs>
  <filter id="Path_20930" x="0" y="0" width="43.062" height="37.867" filterUnits="userSpaceOnUse">
    <feOffset dy="3" input="SourceAlpha"/>
    <feGaussianBlur stdDeviation="3" result="blur"/>
    <feFlood flood-opacity="0.059"/>
    <feComposite operator="in" in2="blur"/>
    <feComposite in="SourceGraphic"/>
  </filter>
</defs>
<g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Path_20930)">
  <path id="Path_20930-2" data-name="Path 20930" d="M-1914.146,1252.83a4.731,4.731,0,0,1,2.195-.164,7.856,7.856,0,0,1,6.042,3.806c.193.312.388.622.609.977,3.6-6.416,8.727-11.142,16.11-13.454l.106.091c-.081.1-.155.2-.243.286-1.94,1.942-3.906,3.863-5.817,5.828a45.363,45.363,0,0,0-5.944,7.349c-.854,1.353-1.635,2.748-2.459,4.118-.337.562-.7,1.112-1.054,1.664a2.008,2.008,0,0,1-.242.3c-.311.324-.487.321-.718-.062q-.958-1.579-1.88-3.177a27.337,27.337,0,0,0-3.057-4.565,14.639,14.639,0,0,0-3.506-2.917C-1914.035,1252.887-1914.065,1252.873-1914.146,1252.83Z" transform="translate(1923.15 -1237.99)" fill="#0d9e21"/>
</g>
</svg>

`;
