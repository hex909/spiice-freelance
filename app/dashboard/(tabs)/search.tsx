import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { globalStyles } from "@/styles/globel";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ProposalCard from "@/components/search/ProposalCard";
import { Link } from "expo-router";
import { formatDistanceToNow } from "date-fns";
import { getProposals } from "@/query/getProposals";

const Search = () => {
  const { data, isLoading } = getProposals();

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
        <Text style={[globalStyles.pageMainTitle, { paddingBottom: 28 }]}>
          Search
        </Text>
        <View style={{ gap: 32, paddingBottom: 32 }}>
          <View style={{ width: "100%", position: "relative" }}>
            <TextInput
              placeholder="Search"
              style={[
                globalStyles.TextInput,
                {
                  backgroundColor: "white",
                  shadowColor: "#00000089",
                  shadowOpacity: 0.1,
                  shadowRadius: 0.68,
                  elevation: 20,
                },
              ]}
              // onBlur={onBlur}
              // onChangeText={onChange}
              // value={value}
            />
            <View
              style={{
                position: "absolute",
                right: 10,
                bottom: 52 / 2 - 12,
                zIndex: 2,
              }}
            >
              <AntDesign name="search1" size={24} color="black" />
            </View>
          </View>

          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              paddingLeft: 4,
            }}
          >
            <Ionicons name="filter-outline" size={24} color="#99879D" />
            <Text style={{ color: "#99879D" }}>Filter</Text>
          </Pressable>
        </View>
      </View>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={"small"} color={Colors.primary} />
        </View>
      ) : (
        <View style={{ paddingHorizontal: 8, gap: 14 }}>
          {data?.map((proposal) => {
            const distance = formatDistanceToNow(new Date(proposal.created_at));
            const image = Array.isArray(proposal.user)
              ? proposal?.user?.[0]?.imageUrl
              : proposal?.user?.imageUrl;
            const fullName = Array.isArray(proposal?.user)
              ? proposal?.user?.[0]?.fullName
              : proposal?.user?.fullName;

            return (
              <Link
                href={`dashboard/search/${proposal?.id}`}
                key={proposal?.id}
                asChild
              >
                <Pressable>
                  <ProposalCard
                    image={image || ""}
                    userName={fullName || ""}
                    title={proposal.title}
                    description={proposal.shortDescription}
                    price={proposal.price}
                    tags={proposal?.tags || []}
                    date={distance}
                    totalProposal={10}
                  />
                </Pressable>
              </Link>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
};

export default Search;
