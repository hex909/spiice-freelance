import { View, Text, Button, Platform, Pressable } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";

const DocumentPickerInput = () => {
  const [doc, setDoc] = useState<DocumentPicker.DocumentPickerAsset>();
  const pickDocument = async () => {
    const result: DocumentPicker.DocumentPickerResult =
      await DocumentPicker.getDocumentAsync({
        type: "application/zip",
        copyToCacheDirectory: true,
      });

    if (result.canceled) return;
    setDoc(result.assets[0]);
  };

  const postDocument = () => {
    const formData = new FormData();

    if (doc) {
      formData.append("document", {
        uri: doc.uri,
        name: doc.name,
        type: doc.mimeType,
      } as any);

      const options = {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      };
    }
  };

  return (
    <Pressable
      style={{
        position: "relative",
        height: 56,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#F2F2F2",
        borderRadius: 8,
        alignItems: "center",
        paddingHorizontal: 16,
      }}
      onPress={pickDocument}
    >
      <Text
        style={{
          fontFamily: "red-hat",
          color: "#2c2c2c",
          flex: 1,
          marginRight: 45,
        }}
      >
        {doc?.name ?? "Upload File"}
      </Text>
      <Pressable
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => (doc?.uri ? setDoc(undefined) : pickDocument())}
      >
        {doc?.uri ? (
          <AntDesign name="close" size={24} color="black" />
        ) : (
          <Feather name="upload" size={24} color="#2c2c2c" />
        )}
      </Pressable>
    </Pressable>
  );
};

export default DocumentPickerInput;
