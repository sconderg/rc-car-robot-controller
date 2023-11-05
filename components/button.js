import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

export default function Button(props) {
  const { onPress, title = "Save", style } = props;
  return (
    <Pressable style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 30,
    elevation: 3,
    backgroundColor: "black",
    margin: 0.5,
    borderRadius: 10,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
});
