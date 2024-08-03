import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Feather } from "@expo/vector-icons";
import { globalStyles } from "@/styles/globel";
import { SimpleLineIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import UserProfile from "@/components/user/UserProfile";

import { Rating } from "react-native-ratings";
import { useGetCurrentProfile } from "@/query/getCurrectProfile";

const profile = () => {
  const { width } = useWindowDimensions();
  const { signOut } = useAuth();
  const { user } = useUser();
  const { data, isLoading } = useGetCurrentProfile(user?.id);

  return (
    <ScrollView
      style={{
        backgroundColor: Colors.pageBackground,
      }}
      contentContainerStyle={[
        globalStyles.pageStyle,
        { paddingHorizontal: 0, paddingVertical: 56 },
      ]}
    >
      {isLoading ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size={"small"} color={Colors.primary} />
        </View>
      ) : (
        <>
          <View style={[{ paddingHorizontal: 16 }]}>
            <View
              style={{
                paddingBottom: 8,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={[globalStyles.pageMainTitle]}>Profile</Text>

              <Link push href={"dashboard/update-profile"}>
                <Feather name="edit" size={16} color={Colors.text} />
              </Link>
            </View>

            {/* User Section */}
            <View style={{ paddingTop: 24 }}>
              <UserProfile
                userImageUrl={data?.imageUrl || ""}
                userName={data?.fullName || ""}
                lineOfWork={data?.occupation}
              />
            </View>

            {/* Description Section */}
            <View style={{ paddingTop: 28 }}>
              <Text
                style={{
                  fontWeight: 700,
                  fontSize: 20,
                  fontFamily: "red-hat",
                  color: Colors.text,
                }}
              >
                Description
              </Text>
              {data?.description ? (
                <Text
                  style={{
                    fontWeight: 400,
                    fontSize: 16,
                    lineHeight: 25,
                    paddingTop: 12,
                    color: "#99879D",
                  }}
                >
                  {data?.description}
                </Text>
              ) : (
                <Link push href="dashboard/update-profile">
                  <Text style={{ textDecorationLine: "underline" }}>
                    Add description about you.
                  </Text>
                </Link>
              )}
            </View>

            {/* Rating Section */}
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: 32,
                }}
              >
                <Text
                  style={{
                    fontWeight: 700,
                    fontSize: 20,
                    fontFamily: "red-hat",
                    color: Colors.text,
                  }}
                >
                  64 Reviews
                </Text>
                <Link
                  href={"dashboard/details"}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    backgroundColor: "#D8CEFF",
                    borderRadius: 4,
                  }}
                >
                  <Text style={{ fontSize: 13 }}>View all</Text>
                </Link>
              </View>

              <View>
                <Text
                  style={{
                    color: "#120E21",
                    fontWeight: 300,
                    fontSize: 16,
                    paddingBottom: 4,
                    paddingTop: 12,
                  }}
                >
                  Average rating
                </Text>
                <Rating
                  type="custom"
                  tintColor={Colors.pageBackground}
                  style={{ alignItems: "flex-start" }}
                  ratingColor="#9378FF"
                  ratingBackgroundColor={"#ede8ff"}
                  readonly
                  startingValue={5}
                />
              </View>
            </View>

            {/* Portfolio */}
            <View style={{ paddingTop: 32 }}>
              <Text
                style={{
                  fontWeight: 700,
                  fontSize: 20,
                  fontFamily: "red-hat",
                  color: Colors.text,
                }}
              >
                Portfolio
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  rowGap: 8,
                  columnGap: 23,
                  paddingTop: 16,
                }}
              >
                {[1, 2, 3, 4, 5].map((item) => (
                  <View
                    key={item}
                    style={{
                      borderWidth: 1,
                      borderColor: "#9378ff9b",
                      width: width / 2 - 28,
                      aspectRatio: "160/101",
                      height: 101,
                      borderRadius: 10,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src="https://s3-alpha-sig.figma.com/img/5d37/58f5/1c3052f7d3eced8d0994cdd6bd406290?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aQoFTmBxA5qj5sgD3AUf4ks8h9TDuZrLEfi45eJwxa1gDUX0l8~WfoMBwbs1ZEPqTVPpoCStChpuE-IG2rnCY--6EO4-zpzRIJArNlPENlUmuM5A6jwho~Pm5Wd5~fNfwHlK66KyRA~B5jL~Nh4eoX6qOFngYqWRdJnPpIF80zhClrbpVlXtc7-AcuLYXZOCBnhwqLshctyFt-oE2fB1m-RDNpLnuyH9Qtv0ruOeMMla6ttpo~-rvviODOslX1OGGJk3V4dU4RoYREGtQYjHtcYhuh8Fc7nOlF0ORYYD4~2fW1fsbdWJcFt8-YpA-Hc23ycO8Uhd22kiCQoJ4oYAjQ__"
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      resizeMode="cover"
                    />
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View>
            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
                signOut();
              }}
              style={{
                flexDirection: "row",
                gap: 8,
                alignItems: "center",
                width: "100%",
                backgroundColor: "white",
                paddingVertical: 14,
                paddingHorizontal: 16,
              }}
            >
              <SimpleLineIcons name="logout" size={16} color={Colors.error} />
              <Text style={{ fontSize: 16, color: Colors.error }}>Log out</Text>
            </Pressable>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default profile;
