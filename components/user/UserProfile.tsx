import { View, Text, Image } from "react-native";
import React from "react";

interface IUserProfile {
  userName: string;
  userImageUrl: string;
  lineOfWork?: string;
}

const UserProfile = ({ userName, userImageUrl, lineOfWork }: IUserProfile) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingBottom: 8,
      }}
    >
      <Image
        source={{ uri: userImageUrl }}
        height={50}
        width={50}
        style={{ borderRadius: 100 }}
      />
      <View style={{ gap: 4 }}>
        <Text style={{ fontFamily: "red-hat", fontSize: 25, fontWeight: 700 }}>
          {userName}
        </Text>
        {lineOfWork ? (
          <Text
            style={{ fontFamily: "red-hat", fontSize: 14, fontWeight: 400 }}
          >
            {lineOfWork}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default UserProfile;
