import React from "react";
import { View, TextInput, Text, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { AppColors } from "../../functions/colors";

const TextArea = ({
  onChange,
  value,
  style,
  placeholder,
  keyboardType,
  error,
  returnKeyType,
  onSubmitEditing,
  onFocus,
  innerRef,
  level,
  rightIcon,
  editable,
  onPress,
  leftIcon,
  containerStyle,
  secureTextEntry,
  autoCapitalize,
  levelStyle,
  subLevel,
  optionalLevel,
  placeholderTextColor,
  outSideStyle,
  bottomLevel,
}) => {
  const [Focus, setFocus] = React.useState(false);
  const [Error, setError] = React.useState();
  React.useEffect(() => {
    setError(error);
  }, [error]);
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);
  const textColor = colors.getTextColor();
  const backgroundColor = colors.getBackgroundColor();
  const borderColor = colors.getBorderColor();
  const mainColor = colors.getMainColor();

  return (
    <View style={outSideStyle}>
      {level && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 12,
            alignItems: "center",
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "400",
              color: textColor,
            }}>
            {level}
            {optionalLevel && (
              <Text
                style={[
                  {
                    fontSize: 16,
                    color: borderColor,
                  },
                  levelStyle,
                ]}>
                ( {optionalLevel} )
              </Text>
            )}
          </Text>
          {subLevel && (
            <Text
              style={[
                {
                  fontSize: 14,
                  color: borderColor,
                },
                levelStyle,
              ]}>
              {subLevel}
            </Text>
          )}
        </View>
      )}
      <Pressable
        onPress={() => {
          innerRef?.current?.focus();
        }}
        style={[
          {
            flexDirection: "row",

            borderWidth: 1,
            marginVertical: 5,
            borderRadius: 4,
            minHeight: 90,
            paddingHorizontal: 10,
          },
          { borderColor: !Focus ? borderColor : mainColor },
          ,
          containerStyle,
        ]}>
        {leftIcon}
        <TextInput
          secureTextEntry={secureTextEntry}
          placeholderTextColor={
            placeholderTextColor ? placeholderTextColor : borderColor
          }
          ref={innerRef}
          returnKeyType={returnKeyType}
          onSubmitEditing={() => {
            if (onSubmitEditing) {
              onSubmitEditing();
            }
          }}
          multiline={true}
          autoCapitalize={autoCapitalize}
          onPressIn={onPress}
          editable={editable}
          keyboardType={keyboardType}
          value={value}
          onChangeText={(val) => {
            if (onChange) {
              onChange(val);
            }
          }}
          onFocus={() => {
            setFocus((v) => !v);
            if (onFocus) {
              onFocus();
            }
          }}
          onEndEditing={() => {
            setFocus(!Focus);
          }}
          placeholder={placeholder ? placeholder : "Type here"}
          style={[
            {
              flex: 1,
              paddingLeft: leftIcon ? 10 : 0,
              fontSize: 15,
              color: textColor,
              paddingRight: rightIcon ? 10 : 0,
            },

            style,
          ]}
        />

        {rightIcon}
      </Pressable>
      <View style={{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
      }}>
        {Error && (
          <Text
            style={[
              {
                fontSize: 12,
                color: "red",

                borderWidth: 0,
                marginTop: 0,
                marginBottom: 0,
                marginLeft: style?.marginLeft,
                flex:1
              },
            ]}>
            {Error}
          </Text>
        )}
        {bottomLevel && (
          <Text
            style={[
              {
                fontSize: 14,
                color: borderColor,
                flex:1,
                textAlign:"right"
              },
              levelStyle,
            ]}>
            {bottomLevel}
          </Text>
        )}
      </View>
    </View>
  );
};

export default TextArea;
