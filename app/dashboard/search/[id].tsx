import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
  BackHandler,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import BackBtn from "@/components/BackBtn";
import { globalStyles } from "@/styles/globel";
import { Colors } from "@/constants/Colors";
import Tags from "@/components/dashboard/Tags";
import ImageShowCase from "@/components/dashboard/project/ImageShowCase";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { MotiText } from "moti";
import PrimaryBtn from "@/components/PrimaryBtn";

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import UserProfile from "@/components/user/UserProfile";
import { useLocalSearchParams } from "expo-router";
import { getProposal } from "@/query/getProposals";

const Page = () => {
  const params = useLocalSearchParams<{ id: string }>();
  const { data: proposal, isLoading } = getProposal(params.id || "");

  const image = Array.isArray(proposal?.user)
    ? proposal?.user?.[0]?.imageUrl
    : proposal?.user?.imageUrl;
  const fullName = Array.isArray(proposal?.user)
    ? proposal?.user?.[0]?.fullName
    : proposal?.user?.fullName;

  const [bigImage, setBigImage] = useState<string | null>();

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["50%"], []);
  const [isOpen, setIsOpen] = useState(false);

  const renderBackDrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  const handleOpenSheet = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);
  const handleCloseSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (isOpen) {
        bottomSheetRef.current?.close();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [isOpen]);

  return (
    <ScrollView
      style={{ backgroundColor: Colors.pageBackground }}
      contentContainerStyle={[
        globalStyles.pageStyle,
        { paddingHorizontal: 0, minHeight: "100%" },
      ]}
    >
      <View style={{ paddingHorizontal: 16 }}>
        <BackBtn />
      </View>

      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"small"} color={Colors.primary} />
        </View>
      ) : (
        <>
          <View
            style={{
              paddingHorizontal: 16,
              paddingTop: 32,
              flex: 1,
            }}
          >
            <UserProfile
              userImageUrl={image || ""}
              userName={fullName || "Not Mentioned"}
            />

            <View>
              <Text
                style={{
                  fontWeight: 200,
                  fontSize: 13,
                  color: Colors.gray,
                  fontFamily: "red-hat",
                }}
              >
                Posted 8 days ago
              </Text>
              <Text style={styles.subTitle}>Wireframes</Text>
              <Text
                style={{
                  fontWeight: 400,
                  fontSize: 16,
                  color: Colors.text,
                  fontFamily: "red-hat",
                }}
              >
                {proposal?.description}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                paddingTop: 32,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 300,
                  color: "#AD9FB1",
                }}
              >
                16 propositions
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: Colors.primary,
                  fontFamily: "red-hat",
                }}
              >
                $ {proposal?.price}
              </Text>
            </View>

            <View
              style={{
                flexWrap: "wrap",
                flexDirection: "row",
                gap: 8,
                marginTop: 24,
              }}
            >
              {proposal?.tags?.map((item) => (
                <Tags tag={item} key={item} />
              ))}
            </View>

            <View style={{ marginTop: 16 }}>
              <ImageShowCase setImageCallback={setBigImage} />
            </View>

            <View
              style={{
                alignSelf: "center",
                flex: 1,
                marginTop: 24,
                justifyContent: "flex-end",
              }}
            >
              <PrimaryBtn
                style={[globalStyles.primaryBtn, { marginTop: "auto" }]}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
                  handleOpenSheet();
                }}
              >
                <MotiText
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: 500,
                  }}
                >
                  Make a proposition
                </MotiText>
              </PrimaryBtn>
            </View>
          </View>

          {bigImage ? (
            <BlurView
              style={{
                ...StyleSheet.absoluteFillObject,
              }}
              intensity={100}
            >
              <LinearGradient
                colors={["rgba(0,0,0,.45)", "rgba(5, 5, 5, 0.6)"]}
                style={[
                  globalStyles.authBox,
                  { height: "100%", paddingHorizontal: 10 },
                ]}
              >
                <Pressable
                  style={styles.modalCloseBtn}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
                    setBigImage(null);
                  }}
                >
                  <Text style={{}}>
                    <AntDesign name="close" size={24} color={Colors.text} />
                  </Text>
                </Pressable>
                <Image
                  source={{ uri: bigImage }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="contain"
                />
              </LinearGradient>
            </BlurView>
          ) : null}

          <BottomSheetModal
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            enableDynamicSizing
            backdropComponent={renderBackDrop}
            maxDynamicContentSize={500}
            enablePanDownToClose
            onChange={(i) => {
              setIsOpen(i === 1);
            }}
          >
            <BottomSheetView
              style={{
                flex: 1,
                padding: 16,
                gap: 14,
                justifyContent: "space-between",
              }}
            >
              <View style={{ gap: 14 }}>
                <Text style={styles.subTitle}>Make a proposition</Text>
                <TextInput
                  style={[
                    globalStyles.TextInput,
                    {
                      height: 160,
                      overflow: "scroll",
                      lineHeight: 24,
                      textAlignVertical: "top",
                      paddingTop: 12,
                      paddingBottom: 12,
                      backgroundColor: "#F2F2F2",
                    },
                  ]}
                  multiline={true}
                  placeholder="Message"
                />
              </View>

              <View
                style={{
                  margin: 15,
                }}
              >
                <PrimaryBtn
                  style={[
                    globalStyles.primaryBtn,
                    {
                      maxWidth: 300,
                      marginHorizontal: "auto",
                      width: "100%",
                    },
                  ]}
                >
                  <Text style={[globalStyles.PrimaryBtnTitle]}>Send</Text>
                </PrimaryBtn>
              </View>
            </BottomSheetView>
          </BottomSheetModal>
        </>
      )}
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
  modalCloseBtn: {
    position: "absolute",
    zIndex: 10,
    left: 10,
    top: 10,
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderRadius: 100,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  subTitle: {
    fontWeight: "700",
    fontSize: 25,
    color: Colors.text,
    fontFamily: "red-hat",
    paddingBottom: 16,
  },
});
