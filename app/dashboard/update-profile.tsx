import BackBtn from "@/components/BackBtn";
import { Colors } from "@/constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import { ScrollView, Text, View } from "react-native";
import { globalStyles } from "@/styles/globel";
import ImageUpdate from "@/components/dashboard/update-profile/ImageUpdate";

const UpdateProfile = () => {
  const { user } = useUser();

  return (
    <ScrollView
      style={{ backgroundColor: Colors.pageBackground }}
      contentContainerStyle={[globalStyles.pageStyle]}
    >
      <BackBtn />

      <View
        style={{
          marginTop: 20,
          gap: 10,
          alignItems: "center",
        }}
      >
        <ImageUpdate />

        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            fontWeight: 700,
            color: Colors.text,
            fontFamily: "red-hat",
          }}
        >
          {user?.fullName}
        </Text>
      </View>
    </ScrollView>
  );
};

export default UpdateProfile;
