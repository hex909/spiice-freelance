import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Link, useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { Feather } from "@expo/vector-icons";
import { globalStyles } from "@/styles/globel";
import { SimpleLineIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

const profile = () => {
  const { signOut } = useAuth();
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
      <View
        style={{
          paddingHorizontal: 16,
          paddingBottom: 8,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={[globalStyles.pageMainTitle]}>Profile</Text>

        <Link push href={"dashboard/update-profile"}>
          <Feather name="edit" size={16} color={Colors.text} />
        </Link>
      </View>

      <View>
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
            signOut();
          }}
          style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
        >
          <SimpleLineIcons name="logout" size={16} color={Colors.error} />
          <Text style={{ fontSize: 16, color: Colors.error }}>Log out</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default profile;
