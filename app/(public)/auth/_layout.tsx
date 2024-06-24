import { useAuth } from "@clerk/clerk-expo";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

const Layout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("dashboard");
    }
  }, [isSignedIn]);
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerTitle: "Log in" }} />
      <Stack.Screen name="signup" options={{ headerTitle: "Sign-up" }} />
    </Stack>
  );
};

export default Layout;
