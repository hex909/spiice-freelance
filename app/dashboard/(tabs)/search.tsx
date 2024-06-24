import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { globalStyles } from "@/styles/globel";

const Search = () => {
  return (
    <ScrollView
      style={{
        backgroundColor: Colors.pageBackground,
      }}
      contentContainerStyle={{
        paddingVertical: 56,
        flex: 1,
      }}
    >
      <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
        <Text style={[globalStyles.pageMainTitle]}>Search</Text>
      </View>
    </ScrollView>
  );
};

export default Search;
