import { Text, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";

const BackBtn = () => {
  const router = useRouter();

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);

    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("dashboard");
    }
  };

  return (
    <Pressable
      style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
      onPress={handleBack}
    >
      <AntDesign name="arrowleft" size={16} color={Colors.gray} />
      <Text style={{ fontSize: 14, color: Colors.gray, fontFamily: "red-hat" }}>
        Back
      </Text>
    </Pressable>
  );
};

export default BackBtn;
