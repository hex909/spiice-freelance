import { Colors } from "@/constants/Colors";
import { globalStyles } from "@/styles/globel";
import { AntDesign } from "@expo/vector-icons";
import { Dispatch, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";

interface ITags {
  name?: string;
  placeholder: string;
  state: string[];
  setState: Dispatch<React.SetStateAction<string[]>>;
}

const TagInput = ({ state, placeholder, name, setState }: ITags) => {
  const [tag, setTag] = useState("");
  const onChange = (s: string) => {
    setTag(s);
    if (s.endsWith(",")) {
      if (state.includes(s)) {
        Toast.show({
          type: "info",
          text1: `Already added to the list`,
          visibilityTime: 3000,
        });
        setTag("");
        return;
      }
      const data = [...state, s.replace(",", "").trim()];
      setState(data);
      setTag("");
    }
  };
  return (
    <View>
      <TextInput
        style={[
          globalStyles.TextInput,
          {
            backgroundColor: "#F2F2F2",
            borderWidth: 1,
            borderColor: "#cfcfcf",
          },
        ]}
        placeholder={placeholder}
        value={tag}
        onChangeText={onChange}
      />
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 4,
          paddingTop: 12,
        }}
      >
        {state.map((tag) => (
          <View
            key={tag}
            style={{
              borderRadius: 20,
              overflow: "hidden",
              paddingHorizontal: 12,
              paddingVertical: 6,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: Colors.primary,
              gap: 4,
            }}
          >
            <Text style={{ color: "white" }}>{tag}</Text>
            <TouchableOpacity
              activeOpacity={0.2}
              onPress={() => {
                setState((e) => e.filter((item) => item !== tag));
              }}
            >
              <AntDesign name="close" size={16} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default TagInput;
