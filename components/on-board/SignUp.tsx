import {
  View,
  Text,
  useWindowDimensions,
  TextInput,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { globalStyles } from "@/styles/globel";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { useSignUp } from "@clerk/clerk-expo";
import { useRef, useState } from "react";
import { useOnBoardSlice } from "@/store/boardSlice";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import PrimaryBtn from "../PrimaryBtn";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";
import PasswordEye from "../PasswordEye";
import { supabase } from "@/util/supabase";

interface FormValue {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
}

const SignUp = () => {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const schema = z.object({
    firstName: z.string({ required_error: "Required" }),
    lastName: z.string().min(1),
    emailAddress: z.string().email("Invalid email address"),
    password: z.string().min(8, "Minimum 8 characters"),
  });
  const lastNameRef = useRef<TextInput>(null);
  const emailAddressRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    resolver: zodResolver(schema),
  });
  const [showPwd, setShowPwd] = useState(false);

  const { isLoaded, signUp, setActive } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState(false);

  const [code, setCode] = useState("");
  const [isOnBoard, setOnBoardingCompletion] = useOnBoardSlice((state) => [
    state.isOnBoarding,
    state.onBoardingCompletion,
  ]);

  const onSubmit = async (v: FormValue) => {
    Keyboard.dismiss();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    setIsLoading(true);

    const { firstName, lastName, emailAddress, password } = v;
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
      Toast.show({
        type: "success",
        text1: "Verification on the Way!",
        text2: `We've sent a verification code to ${emailAddress}. Look for it soon!`,
        position: "top",
      });
    } catch (err: any) {
      Toast.show({
        type: "success",
        text1: "Verification Code Not Sent",
        text2: `There was a problem sending the verification code. Please try again`,
        position: "top",
      });
    }
    setIsLoading(false);
  };

  const onError = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  };

  const onPressVerify = async () => {
    setIsLoading(true);
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      setActive({ session: completeSignUp.createdSessionId }).then(async () => {
        await supabase.from("users").insert([
          {
            userId: completeSignUp.createdUserId,
            fullName: `${completeSignUp.firstName} + ${completeSignUp.lastName}`,
          },
        ]);
        setOnBoardingCompletion();
      });

      router.replace("/dashboard");
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setIsLoading(false);
    }
  };

  return (
    <View
      style={{
        width,
        height: "100%",
        flex: 1,
        padding: 20,
        alignItems: "center",
        justifyContent: "space-between",
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
            {pendingVerification ? (
              <>
                <Text
                  style={{
                    color: Colors.text,
                    fontSize: 27,
                    fontWeight: 500,
                    fontFamily: "red-hat",
                  }}
                >
                  Verify
                </Text>

                <TextInput
                  placeholder="Verification Code"
                  onChangeText={setCode}
                  value={code}
                  placeholderTextColor={"#848484"}
                  style={[globalStyles.TextInput]}
                  keyboardType="number-pad"
                />
              </>
            ) : (
              <>
                <Text
                  style={{
                    color: Colors.text,
                    fontSize: 27,
                    fontWeight: 500,
                    fontFamily: "red-hat",
                  }}
                >
                  Sign Up
                </Text>

                <Controller
                  control={control}
                  render={({ field: { name, onBlur, onChange, value } }) => (
                    <TextInput
                      placeholder="First Name"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholderTextColor={"#848484"}
                      style={[globalStyles.TextInput]}
                      enterKeyHint="next"
                      onSubmitEditing={() => {
                        lastNameRef.current?.focus();
                      }}
                    />
                  )}
                  name="firstName"
                />
                <Controller
                  control={control}
                  render={({ field: { onBlur, onChange, value } }) => (
                    <TextInput
                      ref={lastNameRef}
                      placeholder="Last Name"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholderTextColor={"#848484"}
                      style={[globalStyles.TextInput]}
                      enterKeyHint="next"
                      onSubmitEditing={() => {
                        emailAddressRef.current?.focus();
                      }}
                    />
                  )}
                  name="lastName"
                />
                <Controller
                  control={control}
                  render={({ field: { onBlur, onChange, value } }) => (
                    <TextInput
                      ref={emailAddressRef}
                      placeholder="Email"
                      onBlur={onBlur}
                      keyboardType="email-address"
                      onChangeText={onChange}
                      value={value}
                      placeholderTextColor={"#848484"}
                      style={[globalStyles.TextInput]}
                      autoCapitalize="none"
                      enterKeyHint="next"
                      onSubmitEditing={() => {
                        passwordRef.current?.focus();
                      }}
                    />
                  )}
                  name="emailAddress"
                />
                <Controller
                  control={control}
                  render={({ field: { onBlur, onChange, value } }) => (
                    <View style={{ width: "100%", position: "relative" }}>
                      <TextInput
                        ref={passwordRef}
                        placeholder="Password"
                        secureTextEntry={!showPwd}
                        style={[globalStyles.TextInput]}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                      <PasswordEye
                        showPwd={showPwd}
                        onPress={() => setShowPwd((e) => !e)}
                      />
                    </View>
                  )}
                  name="password"
                />
              </>
            )}
          </LinearGradient>
        </BlurView>
        <View
          style={{
            marginBottom: "auto",
            paddingHorizontal: 15,
            paddingVertical: 10,
          }}
        >
          {errors.firstName ? (
            <Text style={globalStyles.formErrorText}>
              First Name: {errors.firstName?.message}
            </Text>
          ) : null}
          {errors.lastName ? (
            <Text style={globalStyles.formErrorText}>
              Last Name: {errors.lastName?.message}
            </Text>
          ) : null}
          {errors.emailAddress ? (
            <Text style={globalStyles.formErrorText}>
              Email: {errors.emailAddress?.message}
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
          onPress={
            pendingVerification
              ? onPressVerify
              : handleSubmit(onSubmit, onError)
          }
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size={"small"} color={"white"} />
          ) : (
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                color: "white",
                textAlign: "center",
                fontFamily: "red-hat",
              }}
            >
              {pendingVerification ? "Verify" : "Sign up"}
            </Text>
          )}
        </PrimaryBtn>

        <Text
          style={{ fontSize: 14, textAlign: "center", fontFamily: "red-hat" }}
        >
          You have an account?{" "}
          <Text
            style={{
              fontWeight: 600,
              textDecorationLine: "underline",
              fontFamily: "red-hat",
            }}
            onPress={() =>
              isOnBoard === "done"
                ? router.replace("/auth")
                : router.push("/auth")
            }
          >
            Log-in
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default SignUp;
