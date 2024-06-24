import { FlatList, Image, Pressable } from "react-native";

const images = [
  "https://images.unsplash.com/photo-1715630914955-d91c67c20c2d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1717012455028-437f3223065a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1716908520076-4acd8a09f537?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1715313676060-43e777f5ed48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMHx8fGVufDB8fHx8fA%3D%3D",
];

const ImageShowCase = ({
  setImageCallback,
}: {
  setImageCallback: (value: string) => void;
}) => {
  return (
    <FlatList
      data={images}
      keyExtractor={(item) => item}
      showsHorizontalScrollIndicator={false}
      horizontal
      contentContainerStyle={{ gap: 2 }}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            setImageCallback(item);
          }}
          style={{
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <Image
            source={{ uri: item }}
            style={{
              height: 200,
              width: 200,
              resizeMode: "cover",
            }}
          />
        </Pressable>
      )}
    />
  );
};

export default ImageShowCase;
