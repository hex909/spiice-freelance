import { Colors } from "@/constants/Colors";
import { View, Text } from "react-native";
interface IActiveProjectStats {
  projectName: string;
  postedUser: string;
  status: string;
}

const ActiveProjectStats = ({
  projectName,
  postedUser,
  status,
}: IActiveProjectStats) => {
  return (
    <View
      style={{
        padding: 24,
        gap: 9,
        backgroundColor: "white",
        borderRadius: 8,
        shadowColor: "#00000067",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        elevation: 5,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: 600,
          color: Colors.text,
          fontFamily: "red-hat",
        }}
      >
        {projectName}
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 400,
            color: "#99879D",
            fontFamily: "red-hat",
          }}
        >
          {postedUser}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 400,
            color: Colors.text,
            fontFamily: "red-hat",
          }}
        >
          {status}
        </Text>
      </View>
    </View>
  );
};

export default ActiveProjectStats;
