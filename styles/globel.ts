import PrimaryBtn from "@/components/PrimaryBtn";
import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  TextInput: {
    width: "100%",
    backgroundColor: "#E2DBFF",
    height: 52,
    borderRadius: 5,
    paddingHorizontal: 16,
    color: "#2c2c2c",
    fontFamily: "red-hat",
  },
  pageMainTitle: {
    color: Colors.text,
    fontSize: 39,
    fontWeight: 800,
    fontFamily: "red-hat",
  },
  primaryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 50,
    paddingHorizontal: 40,
    paddingVertical: 17,
  },
  PrimaryBtnTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
    fontFamily: "red-hat",
  },
  authBox: {
    padding: 20,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FBEAFF",
    gap: 16,
  },
  pageStyle: {
    paddingVertical: 40,
    paddingHorizontal: 16,
    backgroundColor: Colors.pageBackground,
  },
  formErrorText: {
    color: Colors.error,
    fontSize: 12,
    fontFamily: "red-hat",
  },
});
