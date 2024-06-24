import { onBoardingData } from "@/data/on-boarding/data";
import { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ImageBackground,
  Text,
  Pressable,
  BackHandler,
} from "react-native";
import Dots from "./Dots";
import OnBoardItems from "./OnBoardItems";
import SignUp from "./SignUp";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { globalStyles } from "@/styles/globel";

const OnBoarding = () => {
  const [currentItem, setCurrentItem] = useState(0);
  const router = useRouter();
  const [firstComponent, setFirstComponent] = useState(true);

  useEffect(() => {
    const backAction = () => {
      if (firstComponent) {
        return false;
      } else {
        setFirstComponent(true);
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [firstComponent]);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("@/assets/images/on-boarding/bubbles.png")}
        style={{
          flex: 1,
          paddingVertical: 48,
          backgroundColor: "#FAF9FE",
        }}
        resizeMode="cover"
      >
        {firstComponent ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 90,
                fontWeight: 500,
                marginVertical: "auto",
                fontFamily: "red-hat",
              }}
            >
              Spiice
            </Text>
            <View style={{ marginTop: "auto", alignItems: "center", gap: 14 }}>
              <Pressable
                style={globalStyles.primaryBtn}
                onPress={() => setFirstComponent(false)}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                    color: "white",
                    fontFamily: "red-hat",
                  }}
                >
                  Discover the platform
                </Text>
              </Pressable>

              <Text style={{ fontSize: 14, fontFamily: "red-hat" }}>
                You have an account?{" "}
                <Text
                  onPress={() => {
                    router.push("/auth");
                  }}
                  style={{
                    fontWeight: 600,
                    textDecorationLine: "underline",
                    fontFamily: "red-hat",
                  }}
                >
                  Log-in
                </Text>
              </Text>
            </View>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 32,
                fontWeight: 500,
                textAlign: "center",
                fontFamily: "red-hat",
              }}
            >
              Splice
            </Text>

            <FlatList
              style={{ flex: 1 }}
              data={onBoardingData}
              renderItem={({ item, index }) => (
                <OnBoardItems item={item} index={index} current={currentItem} />
              )}
              pagingEnabled
              horizontal
              showsHorizontalScrollIndicator={false}
              bounces={false}
              keyExtractor={(item) => item.id.toString()}
              onViewableItemsChanged={(e) => {
                const item = e.viewableItems[0];
                if (typeof item?.index === "number") {
                  if (item.isViewable) setCurrentItem(item.index);
                } else if (e.changed[0].index === onBoardingData.length - 1) {
                  setCurrentItem((i) => i + 1);
                }
              }}
              ListFooterComponent={<SignUp />}
            />
            <Dots
              currentIndex={currentItem}
              totalSlide={onBoardingData.length + 1}
            />
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default OnBoarding;
