import { Stack, useRouter } from "expo-router";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { useOnBoardSlice } from "@/store/boardSlice";
import { useEffect } from "react";
import { Colors } from "@/constants/Colors";

import Toast from "react-native-toast-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const RootLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const isOnBoarding = useOnBoardSlice((state) => state.isOnBoarding);
  const router = useRouter();

  useEffect(() => {
    if (isOnBoarding !== "" && isLoaded) {
      if (isSignedIn) router.replace("/dashboard");
      else if (isOnBoarding === "not" && isSignedIn === false) {
        router.replace("/");
      } else if (isOnBoarding === "done" && isSignedIn === false) {
        router.replace("/auth");
      }
    }
  }, [isOnBoarding, isLoaded, isSignedIn]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarColor: Colors.pageBackground,
        statusBarStyle: "dark",
      }}
      initialRouteName="/"
    />
  );
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <GestureHandlerRootView>
        <QueryClientProvider client={queryClient}>
          <BottomSheetModalProvider>
            <RootLayout />
          </BottomSheetModalProvider>
        </QueryClientProvider>
        <Toast />
      </GestureHandlerRootView>
    </ClerkProvider>
  );
};

export default App;
