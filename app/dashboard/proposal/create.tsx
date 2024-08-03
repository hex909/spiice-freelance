import { View, Text, ScrollView } from "react-native";
import { Colors } from "@/constants/Colors";
import { globalStyles } from "@/styles/globel";
import BackBtn from "@/components/BackBtn";
import CreateProposalForm from "@/components/dashboard/proposal/createForm";

const create = () => {
  return (
    <ScrollView
      style={{ backgroundColor: Colors.pageBackground }}
      contentContainerStyle={[globalStyles.pageStyle]}
    >
      <View>
        <BackBtn />
        <View style={{ paddingTop: 32 }}>
          <Text
            style={{
              color: Colors.text,
              fontSize: 25,
              fontWeight: 700,
              fontFamily: "red-hat",
            }}
          >
            Create a proposal
          </Text>
        </View>
      </View>

      <View style={{ gap: 12, paddingTop: 24 }}>
        <CreateProposalForm />
      </View>
    </ScrollView>
  );
};

export default create;
