import { Text, ScrollView, View, Pressable } from "react-native";
import React, { useEffect } from "react";
import { Colors } from "@/constants/Colors";
import { CartesianChart, Bar } from "victory-native";
import ActiveCard from "@/components/dashboard/home/ActiveProjectStats";
import { globalStyles } from "@/styles/globel";
import { Link } from "expo-router";
import { LinearGradient, vec } from "@shopify/react-native-skia";

const Index = () => {
  const DATA = [
    { x: "Jan", y: 50 },
    { x: "Feb", y: 60 },
    { x: "Mar", y: 70 },
    { x: "May", y: 55 },
  ];

  return (
    <ScrollView
      style={{
        backgroundColor: Colors.pageBackground,
      }}
      contentContainerStyle={{
        paddingVertical: 56,
      }}
    >
      <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
        <Text style={[globalStyles.pageMainTitle]}>Feed</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: Colors.text,
              fontSize: 25,
              fontWeight: 700,
              fontFamily: "red-hat",
            }}
          >
            Resume
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
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          paddingHorizontal: 16,
          gap: 30,
          justifyContent: "space-evenly",
        }}
      >
        <View
          style={{
            height: 250,
            flex: 1,
            maxWidth: 176,
          }}
        >
          <CartesianChart data={DATA} xKey="x" yKeys={["y"]} domainPadding={23}>
            {({ points, chartBounds }) => {
              return (
                <Bar
                  points={points.y}
                  chartBounds={chartBounds}
                  color="#9378ffa6"
                  roundedCorners={{ topLeft: 4, topRight: 4 }}
                  barWidth={31}
                >
                  <LinearGradient
                    start={vec(chartBounds.bottom, chartBounds.right)}
                    end={vec(chartBounds.top, chartBounds.top)}
                    colors={[Colors.primary, "#481bfadf"]}
                  />
                </Bar>
              );
            }}
          </CartesianChart>
        </View>

        <View style={{ flexShrink: 0 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              textTransform: "uppercase",
              color: "#99879D",
              fontFamily: "red-hat",
            }}
          >
            Total gains
          </Text>
          <Text
            style={{
              fontSize: 60,
              fontWeight: "800",
              color: Colors.text,
              fontFamily: "red-hat",
            }}
          >
            27 k
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              color: "#9D8787",
              fontFamily: "red-hat",
            }}
          >
            18%
          </Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: 16, paddingTop: 20 }}>
        <Link href={"dashboard/proposal/create/"}>
          <Text style={{ textDecorationLine: "underline" }}>
            Create a proposal
          </Text>
        </Link>
      </View>

      {/* Active Projects */}
      <View style={{ paddingBottom: 20 }}>
        <View style={{ paddingHorizontal: 16, paddingTop: 26 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                color: Colors.text,
                fontSize: 25,
                fontWeight: 700,
                fontFamily: "red-hat",
              }}
            >
              Active projects
            </Text>

            <Link
              href={"dashboard/active-project"}
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

          <View style={{ gap: 12 }}>
            <Link href={`dashboard/active-project/11`} asChild>
              <Pressable>
                <ActiveCard
                  postedUser="Wireframes"
                  projectName="Francisco Fisher"
                  status="Active"
                />
              </Pressable>
            </Link>
            <Link href={`dashboard/active-project/11`} asChild>
              <Pressable>
                <ActiveCard
                  postedUser="Need a new logo"
                  projectName="Amel Rio"
                  status="Pending"
                />
              </Pressable>
            </Link>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Index;
