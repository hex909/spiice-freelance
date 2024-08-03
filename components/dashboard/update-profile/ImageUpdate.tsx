import { useState } from "react";
import { Image, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useUser } from "@clerk/clerk-expo";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Toast from "react-native-toast-message";
import { supabase } from "@/util/supabase";

export default function ImageUpdate() {
  const { user } = useUser();

  const initialValue = () => ({
    uri: user?.imageUrl || "",
    height: 0,
    width: 0,
  });

  const [image, setImage] = useState<ImagePicker.ImagePickerAsset>(() =>
    initialValue()
  );

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const saveImage = async () => {
    if (image.base64) {
      user
        ?.setProfileImage({ file: `data:image/png;base64,${image?.base64}` })
        .then(() => {
          user.reload().then(async () => {
            await supabase
              .from("users")
              .update([{ imageUrl: user.imageUrl }])
              .eq("userId", user.id)
              .select();
            setImage(() => initialValue());
          });
          Toast.show({
            type: "success",
            text1: "Uploaded",
            text2: "Successfully updated",
            position: "bottom",
          });
        })
        .catch(() => {
          Toast.show({
            type: "error",
            text1: "Upload failed ",
            text2: "Something went wrong please try again after sometime.",
            position: "bottom",
          });
        });
    }
  };

  return (
    <Pressable
      onPress={pickImage}
      style={{
        borderRadius: 100,
        position: "relative",
      }}
    >
      <Image
        source={{ uri: image?.uri ?? user?.imageUrl }}
        width={100}
        height={100}
        style={{
          borderRadius: 100,
          objectFit: "cover",
          borderWidth: 2,
          borderColor: Colors.primary,
        }}
      />

      <Pressable
        onPress={image?.uri === user?.imageUrl ? pickImage : saveImage}
        style={{
          position: "absolute",
          backgroundColor: "white",
          padding: 5,
          borderRadius: 100,
          bottom: 0,
          right: 0,
        }}
      >
        {image?.uri === user?.imageUrl ? (
          <Feather name="edit-3" size={24} color={Colors.text} />
        ) : (
          <Feather name="save" size={24} color={Colors.text} />
        )}
      </Pressable>
    </Pressable>
  );
}
