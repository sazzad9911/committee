import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

export default function BottomShitLayout({index,setIndex,component}) {
    // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%','75%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
    setIndex&&setIndex(index)
  }, []);
  return (
    <View style={styles.container}>
        {}
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        {component}
      </BottomSheet>
    </View>
  )
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
  