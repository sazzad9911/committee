import RNDateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { Modal, View } from "react-native";

export default function DateTimePickerLayout({
  visible,
  onClose,
  type,
  value,
}) {
  return (
    <View>
      <RNDateTimePicker
        display="compact"
        value={value ? new Date(value) : new Date()}
        mode={type ? type : "date"}
      />
    </View>
  );
  return (
    <Modal onRequestClose={onClose} transparent={true} visible={visible}>
      <RNDateTimePicker
        display="compact"
        value={value ? new Date(value) : new Date()}
        mode={type ? type : "date"}
      />
    </Modal>
  );
}
