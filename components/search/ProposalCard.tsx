import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Tags from "../dashboard/Tags";
import { Colors } from "@/constants/Colors";

interface IProposalCard {
  userName: string;
  image: string;
  date: string;
  title: string;
  description: string;
  price: number | string;
  totalProposal: number;
  tags: string[];
}

const ProposalCard = ({
  userName,
  image,
  date,
  title,
  description,
  price,
  totalProposal,
  tags,
}: IProposalCard) => {
  return (
    <View
      style={{
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <View style={[styles.header]}>
        <Image
          source={{ uri: image }}
          height={40}
          width={40}
          style={{ borderRadius: 100 }}
        />
        <Text
          style={{ fontFamily: "red-hat", fontSize: 20, fontWeight: "600" }}
        >
          {userName}
        </Text>
      </View>

      <View style={{ gap: 24, padding: 16, backgroundColor: "white" }}>
        <Text style={[styles.lightText]}>{date}</Text>
        <Text style={[styles.title]}>{title}</Text>
        <View>
          <Text style={[styles.descriptionTitle]}>Description</Text>
          <Text style={[styles.descriptionParagraph]}>{description}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={[styles.lightText]}>
            {totalProposal} proposition{totalProposal > 1 ? "s" : null}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: Colors.primary,
              fontFamily: "red-hat",
            }}
          >
            $ {price}
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
          {tags.map((tag, index) => (
            <Tags tag={tag} key={tag + index} />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    flexDirection: "row",
    backgroundColor: "#EFEDF0",
    alignItems: "center",
    gap: 8,
  },
  lightText: {
    color: Colors.gray,
    fontFamily: "red-hat",
    fontWeight: 100,
  },
  title: {
    fontFamily: "red-hat",
    fontWeight: "700",
    fontSize: 25,
    color: Colors.text,
  },
  descriptionTitle: {
    fontFamily: "red-hat",
    fontWeight: "600",
    fontSize: 20,
    paddingBottom: 8,
  },
  descriptionParagraph: {
    fontFamily: "red-hat",
    fontSize: 16,
    lineHeight: 22,
  },
});

export default ProposalCard;
