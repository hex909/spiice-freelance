import { View, Text, Pressable } from "react-native";
import { ReactNode } from "react";
import { Entypo } from "@expo/vector-icons";

interface IAccordion {
  itemIdentifier: number;
  activeAccordion: number;
  callback: (n: number) => void;
  title: string;
  data: string | number;
  content: ReactNode;
}

const Accordion = ({
  itemIdentifier,
  activeAccordion,
  callback,
  data,
  title,
  content,
}: IAccordion) => {
  return (
    <>
      <Pressable
        onPress={() =>
          callback(itemIdentifier === activeAccordion ? -1 : itemIdentifier)
        }
        style={{
          padding: 16,
          backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "red-hat",
            fontWeight: "500",
            fontSize: 20,
            color: "#120E21",
          }}
        >
          {title}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 11 }}>
          <Text
            style={{
              fontFamily: "red-hat",
              fontWeight: "900",
              fontSize: 40,
              color: "#120E21",
            }}
          >
            {data}
          </Text>
          <View
            style={{
              transform: [
                {
                  rotate:
                    itemIdentifier === activeAccordion ? "180deg" : "0deg",
                },
              ],
            }}
          >
            <Entypo name="chevron-small-down" size={24} color="#99879D" />
          </View>
        </View>
      </Pressable>

      <View
        style={{
          backgroundColor: "white",
          height: itemIdentifier === activeAccordion ? "auto" : 0,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            padding: 16,
          }}
        >
          {content}
        </View>
      </View>
    </>
  );
};

export default Accordion;
