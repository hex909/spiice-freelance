import SignUp from "@/components/on-board/SignUp";
import { ImageBackground } from "react-native";

const Page = () => {
  return (
    <ImageBackground
      source={require("@/assets/images/on-boarding/bubbles.png")}
      style={{ flex: 1, backgroundColor: "#FAF9FE" }}
    >
      <SignUp />
    </ImageBackground>
  );
};

export default Page;
