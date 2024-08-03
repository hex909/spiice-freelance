import { View, Text } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "moti";
import { globalStyles } from "@/styles/globel";
import BackBtn from "@/components/BackBtn";
import { Colors } from "@/constants/Colors";
import Accordion from "@/components/dashboard/details/Accordion";
import { Bar, CartesianChart } from "victory-native";
import { LinearGradient, useFont, vec } from "@shopify/react-native-skia";

import redHatFont from "@/assets/fonts/red-hat.ttf";

const detailsData = [
  { id: 1, title: "Total gains", data: "27 k" },
  { id: 2, title: "Total projects", data: 80 },
  { id: 3, title: "Total requests", data: 120 },
  { id: 4, title: "Total reviews", data: 64 },
];

const DATA = [
  { x: "Jan", y: 0 },
  { x: "Feb", y: 10 },
  { x: "Mar", y: 20 },
  { x: "Apr", y: 45 },
  { x: "May", y: 10 },
  { x: "Jun", y: 55 },
  { x: "Jul", y: 5 },
  { x: "Sep", y: 0 },
  { x: "Oct", y: 0 },
  { x: "Nov", y: 0 },
  { x: "Dec", y: 0 },
];

const Index = () => {
  const font = useFont(redHatFont, 10);
  const [show, setShow] = useState(-1);

  return (
    <ScrollView
      style={{ backgroundColor: Colors.pageBackground }}
      contentContainerStyle={[globalStyles.pageStyle, { paddingHorizontal: 0 }]}
    >
      <View style={{ paddingHorizontal: 16 }}>
        <BackBtn />
        <View style={{ paddingTop: 32 }}>
          <Text
            style={{
              fontFamily: "red-hat",
              fontWeight: "700",
              fontSize: 20,
              letterSpacing: 0.04,
              textTransform: "uppercase",
              color: "#99879D",
              lineHeight: 26.46,
            }}
          >
            Details
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: 16,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: "#99879D3D",
        }}
      >
        {detailsData.map((item, index) => (
          <View
            key={item.id}
            style={{
              borderBottomWidth: index === detailsData.length - 1 ? 0 : 1,
              borderColor: "#99879D3D",
            }}
          >
            <Accordion
              itemIdentifier={index}
              activeAccordion={show}
              title={item.title}
              data={item.data}
              callback={(n) => setShow(n)}
              content={
                <View
                  style={{
                    height: 266,
                    flex: 1,
                    maxWidth: "100%",
                  }}
                >
                  <CartesianChart
                    data={DATA}
                    xKey="x"
                    yKeys={["y"]}
                    domainPadding={10}
                    padding={5}
                    axisOptions={{
                      font,
                      tickCount: { x: 12, y: 5 },
                      lineColor: { grid: "transparent", frame: "#99879D" },
                    }}
                    domain={{ y: [10] }}
                  >
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
              }
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Index;
