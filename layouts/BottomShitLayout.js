import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, Platform, KeyboardAvoidingView, Keyboard, Dimensions } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useSelector } from "react-redux";
import { AppColors } from "../functions/colors";
import Button from "../components/main/Button";

export default function BottomShitLayout({
  index,
  setIndex,
  component,
  scrollable,
  screen,
  ref,
  bottom,
  points
}) {
  // ref
  const bottomSheetRef = useRef(null);
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);
  // variables
  const snapPoints = useMemo(() =>points?points: ["25%", "50%", "75%","95%"], []);

  // callbacks\
  
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
    setIndex && setIndex(index);
  }, []);
 
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.getBackgroundColor() }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {screen}
      </ScrollView>
      {bottom}
      {index!=-1&&(<View  style={{flex:1,position:"absolute",backgroundColor:colors.getSchemeColor(),width:Dimensions.get("window").width,height:Dimensions.get("window").height,opacity:.1}}></View>)}
      <BottomSheet
      handleIndicatorStyle={{backgroundColor:colors.getBorderColor()}}
        ref={ref?ref:bottomSheetRef}
        index={index?index:0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={{backgroundColor:colors.getSchemeColor()}}
        onChange={handleSheetChanges}>
        {scrollable ? (
          <BottomSheetScrollView contentContainerStyle={{backgroundColor:colors.getSchemeColor()}} style={{ flex: 1 }}>
            {component}
          </BottomSheetScrollView>
        ) : (
          component
        )}
        <Button active={true}
        onPress={()=>{
          bottomSheetRef.current?.close()
        }}
        style={{
          marginBottom:30,
          marginTop:20,
          backgroundColor: "#4ADE80",
          marginHorizontal: 8,
          color: "white",
        }}
        title={"Done"}
      />
      </BottomSheet>
      
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  contentContainer: {
    flex: 1,
  },
});
