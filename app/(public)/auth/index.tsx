import {
  View,
  Text,
  TextInput,
  ScrollView,
  ImageBackground,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { globalStyles } from "@/styles/globel";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { useSignIn } from "@clerk/clerk-expo";
import { useOnBoardSlice } from "@/store/boardSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import PrimaryBtn from "@/components/PrimaryBtn";
import * as Haptics from "expo-haptics";
import Toast from "react-native-toast-message";
import { Feather } from "@expo/vector-icons";
import PasswordEye from "@/components/PasswordEye";

interface FormValue {
  identifier: string;
  password: string;
}

const Page = () => {
  const router = useRouter();
  const passwordRef = useRef<TextInput>(null);

  const { isLoaded, signIn, setActive } = useSignIn();
  const [isOnBoard, setOnBoardingCompletion] = useOnBoardSlice((state) => [
    state.isOnBoarding,
    state.onBoardingCompletion,
  ]);
  const schema = z.object({
    identifier: z.string().email("Invalid email address"),
    password: z.string().min(8, "Minimum 8 characters"),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    resolver: zodResolver(schema),
    reValidateMode: "onBlur",
    mode: "onBlur",
  });

  const onSubmit = async (v: FormValue) => {
    Keyboard.dismiss();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);

    const { identifier, password } = v;
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier,
        password,
      });

      setActive({
        session: completeSignIn.createdSessionId,
      }).then(() => {
        setOnBoardingCompletion();
      });
    } catch (err: unknown) {
      if (typeof err === "object" && "errors" in (err || {})) {
        (err as { errors: any[] }).errors?.map((error) =>
          Toast.show({
            type: "error",
            text1: error.meta.paramName,
            text2: error.message,
            visibilityTime: 6000,
          })
        );
      }
      setIsLoading(false);
    }
  };
  const onError = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  };

  return (
    <ImageBackground
      source={require("@/assets/images/on-boarding/bubbles.png")}
      style={{ flex: 1, backgroundColor: "#FAF9FE" }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps={"handled"}
      >
        <View
          style={{
            padding: 20,
            alignItems: "center",
            flex: 1,
          }}
        >
          <View
            style={{
              width: "100%",
              marginVertical: "auto",
            }}
          >
            <BlurView intensity={70}>
              <LinearGradient
                colors={["rgba(255,255,255,.2)", "rgba(175, 168, 203, 0.2)"]}
                style={[globalStyles.authBox]}
              >
                <Text
                  style={{
                    color: Colors.text,
                    fontSize: 27,
                    fontWeight: 500,
                    marginVertical: 16,
                    fontFamily: "red-hat",
                  }}
                >
                  Log In
                </Text>

                <Controller
                  control={control}
                  render={({ field: { onBlur, onChange, value } }) => (
                    <>
                      <TextInput
                        placeholder="Email"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholderTextColor={"#848484"}
                        style={[globalStyles.TextInput]}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        returnKeyType="next"
                        onSubmitEditing={() => {
                          passwordRef.current?.focus();
                        }}
                      />
                    </>
                  )}
                  name="identifier"
                />
                <Controller
                  control={control}
                  render={({ field: { onBlur, onChange, value } }) => (
                    <View style={{ width: "100%", position: "relative" }}>
                      <TextInput
                        placeholder="Password"
                        secureTextEntry={!showPwd}
                        style={[globalStyles.TextInput]}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        ref={passwordRef}
                      />
                      <PasswordEye
                        showPwd={showPwd}
                        onPress={() => setShowPwd((e) => !e)}
                      />
                    </View>
                  )}
                  name="password"
                />
              </LinearGradient>
            </BlurView>
            <View
              style={{
                marginBottom: "auto",
                paddingHorizontal: 15,
                paddingVertical: 10,
              }}
            >
              {errors.identifier ? (
                <Text style={globalStyles.formErrorText}>
                  Email: {errors.identifier?.message}
                </Text>
              ) : null}
              {errors.password ? (
                <Text style={globalStyles.formErrorText}>
                  Password: {errors.password?.message}
                </Text>
              ) : null}
            </View>
          </View>

          <View
            style={{
              marginTop: "auto",
              width: "100%",
              gap: 14,
              paddingHorizontal: 20,
            }}
          >
            <PrimaryBtn
              style={[
                globalStyles.primaryBtn,
                {
                  width: "100%",
                },
              ]}
              onPress={handleSubmit(onSubmit, onError)}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size={"small"} color={"white"} />
              ) : (
                <Text style={globalStyles.PrimaryBtnTitle}>Login</Text>
              )}
            </PrimaryBtn>

            <Text
              style={{
                fontSize: 14,
                textAlign: "center",
                fontFamily: "red-hat",
              }}
            >
              Register an account?{" "}
              <Text
                style={{
                  fontWeight: 600,
                  textDecorationLine: "underline",
                  fontFamily: "red-hat",
                }}
                onPress={() =>
                  isOnBoard === "done"
                    ? router.replace("/auth/signup")
                    : router.push("/")
                }
              >
                Sign up
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Page;
