import { View, Text } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

const Tags = ({ tag }: { tag: string }) => {
  return (
    <View
      style={{
        padding: 6,
        borderWidth: 1,
        borderColor: Colors.gray,
        borderRadius: 4,
        flexGrow: 0,
        width: "auto",
      }}
    >
      <Text
        style={{
          fontSize: 13,
          fontFamily: "red-hat",
          fontWeight: 300,
          color: Colors.gray,
        }}
      >
        {tag}
      </Text>
    </View>
  );
};

export default Tags;
