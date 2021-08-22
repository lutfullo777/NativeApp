import React from "react";
import { StyleSheet, ActivityIndicator } from "react-native";

export default function Spinner({color}) {
  return (
    <ActivityIndicator
      animating={true}
      color={color}
      size={60}
      style={styles.spinner}
    />
  );
}

const styles = StyleSheet.create({
  spinner: {
    zIndex: 1,
    position: "absolute",
    top: 50,
  },
});
