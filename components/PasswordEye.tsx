import { Pressable } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const PasswordEye = ({
  showPwd,
  onPress,
}: {
  showPwd: boolean;
  onPress: () => void;
}) => {
  return (
    <Pressable
      style={{
        position: "absolute",
        right: 10,
        bottom: 52 / 2 - 12,
      }}
      onPress={onPress}
    >
      {!showPwd ? (
        <Feather name="eye" size={24} color="#2c2c2c" />
      ) : (
        <Feather name="eye-off" size={24} color="#2c2c2c" />
      )}
    </Pressable>
  );
};

export default PasswordEye;
