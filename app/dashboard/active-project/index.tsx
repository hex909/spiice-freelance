import { View, Text, ScrollView, Pressable } from "react-native";
import BackBtn from "@/components/BackBtn";
import { globalStyles } from "@/styles/globel";
import { Colors } from "@/constants/Colors";
import ActiveProjectStats from "@/components/dashboard/home/ActiveProjectStats";
import { Link } from "expo-router";

const ACTIVE_DATA = [
  {
    id: 10,
    projectName: "Project Alpha",
    postedUser: "user1",
    status: "In Progress",
  },
  {
    id: 20,
    projectName: "Project Beta",
    postedUser: "user2",
    status: "Completed",
  },
  {
    id: 30,
    projectName: "Project Gamma",
    postedUser: "user3",
    status: "Pending",
  },
  {
    id: 40,
    projectName: "Project Delta",
    postedUser: "user4",
    status: "In Progress",
  },
  {
    id: 5,
    projectName: "Project Epsilon",
    postedUser: "user5",
    status: "Cancelled",
  },
  {
    id: 60,
    projectName: "Project Zeta",
    postedUser: "user6",
    status: "Completed",
  },
  {
    id: 70,
    projectName: "Project Eta",
    postedUser: "user7",
    status: "In Progress",
  },
  {
    id: 80,
    projectName: "Project Theta",
    postedUser: "user8",
    status: "Pending",
  },
  {
    id: 90,
    projectName: "Project Iota",
    postedUser: "user9",
    status: "Completed",
  },
  {
    id: 670,
    projectName: "Project Kappa",
    postedUser: "user10",
    status: "In Progress",
  },
];

const index = () => {
  return (
    <ScrollView contentContainerStyle={[globalStyles.pageStyle]}>
      <BackBtn />
      <View style={{ marginTop: 16 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: Colors.text,
            fontFamily: "red-hat",
          }}
        >
          Active Projects{" "}
        </Text>
      </View>

      <View style={{ gap: 10, marginTop: 14 }}>
        {ACTIVE_DATA.map((item) => (
          <Link
            href={`dashboard/active-project/${item.id}`}
            key={item.projectName}
            asChild
          >
            <Pressable>
              <ActiveProjectStats
                postedUser={item.postedUser}
                projectName={item.projectName}
                status={item.status}
              />
            </Pressable>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
};

export default index;
