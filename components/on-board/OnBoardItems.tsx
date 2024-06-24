import { View, Text, useWindowDimensions, Image } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const OnBoardItems = ({
  item,
  index,
  current,
}: {
  item: {
    id: number;
    image: any;
    description: string;
  };
  index: number;
  current: number;
}) => {
  const { width } = useWindowDimensions();

  const imageContainerStyles = useAnimatedStyle(() => ({
    opacity: withTiming(current === index ? 1 : 0),
    transform: [
      {
        scale: withTiming(current === index ? 1 : 0.5, { duration: 100 }),
      },
    ],
  }));

  const textStyles = useAnimatedStyle(() => ({
    opacity: withTiming(current === index ? 1 : 0, { duration: 70 }),
    transform: [
      {
        translateY: withTiming(current === index ? 0 : 200, { duration: 100 }),
      },
    ],
  }));

  return (
    <View
      style={{
        width,
        alignItems: "center",
        paddingHorizontal: 5,
        paddingBottom: 32,
      }}
    >
      <Animated.View
        style={[
          {
            paddingTop: 58,
            flexDirection: "row",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          },
          imageContainerStyles,
        ]}
      >
        <Image
          source={item.image}
          width={370}
          height={370}
          resizeMethod="scale"
          style={{ objectFit: "contain", flex: 1, maxHeight: 370 }}
        />
      </Animated.View>

      <Animated.Text
        style={[
          {
            fontSize: 16,
            textAlign: "center",
            width: width / 1.5,
          },
          textStyles,
        ]}
      >
        {item.description}
      </Animated.Text>
    </View>
  );
};

export default OnBoardItems;
