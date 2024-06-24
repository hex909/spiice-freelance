import LoadingScreen from "@/components/Loading";
import OnBoarding from "@/components/on-board/OnBoarding";
import { useOnBoardSlice } from "@/store/boardSlice";
import { useAuth } from "@clerk/clerk-expo";
import { SplashScreen } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

export default function Index() {
  const [fontsLoaded, fontError] = useFonts({
    "red-hat": require("../assets/fonts/red-hat.ttf"),
  });
  const [isLoading, setIsLoading] = useState(true);
  const { isLoaded } = useAuth();
  const isOnBoarding = useOnBoardSlice((state) => state.isOnBoarding);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    if (isOnBoarding !== "" && isLoaded) {
      setIsLoading(false);
    }
  }, [isLoaded, isOnBoarding]);

  if ((!fontsLoaded && !fontError) || isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <OnBoarding />
    </SafeAreaView>
  );
}
