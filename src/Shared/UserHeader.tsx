import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, View, Text, Image } from "react-native";
import { UserHeaderType } from "@/interface/UseHeader";
import colors from "@/styles/globalStyles";

const images = {
  homemUm: require("@/assets/character/HomemUm.png"),
  homemDois: require("@/assets/character/HomemDois.png"),
  mulherUm: require("@/assets/character/MulherUm.png"),
  mulherDois: require("@/assets/character/MulherDois.png"),
};

type Props = UserHeaderType;

export default function UserHeader({ user, job, image }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Image style={styles.character} source={images[image]} />
        <View>
          <Text style={styles.user}>{user}</Text>
          <Text style={styles.userJob}>{job}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.yellow,
    paddingTop: 20,
    paddingBottom: 10,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
  },
  header: {
    marginTop: 20,
    marginLeft: 100,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
  character: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  user: {
    fontSize: 20,
    color: colors.black,
  },
  userJob: {
    color: colors.black,
  },
});
