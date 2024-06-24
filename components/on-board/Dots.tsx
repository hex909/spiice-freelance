import { Colors } from "@/constants/Colors";
import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const Dots = ({
  currentIndex,
  totalSlide,
}: {
  totalSlide: number;
  currentIndex: number;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 4,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {Array.from(Array(totalSlide).keys()).map((item) => {
        const animatedStyle = useAnimatedStyle(() => {
          const size = withTiming(item === currentIndex ? 8 : 6, {
            duration: 100,
          });
          return {
            height: size,
            width: size,
            backgroundColor: withTiming(
              currentIndex === item ? Colors.primary : Colors.primary + "42",
              { duration: 200 }
            ),
          };
        });
        return (
          <Animated.View
            style={[
              {
                borderRadius: 100,
              },
              animatedStyle,
            ]}
            key={item}
          ></Animated.View>
        );
      })}
    </View>
  );
};

export default Dots;
