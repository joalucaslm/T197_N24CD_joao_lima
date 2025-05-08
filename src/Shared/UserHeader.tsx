import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  Image,
} from "react-native";
import { UserHeaderType } from "@/interface/UseHeader";
import colors from "@/styles/globalStyles";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation";

const images = {
  homemUm: require("@/assets/character/HomemUm.png"),
  homemDois: require("@/assets/character/HomemDois.png"),
  mulherUm: require("@/assets/character/MulherUm.png"),
  mulherDois: require("@/assets/character/MulherDois.png"),
};

type Props = UserHeaderType;

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function UserHeader({ user, job, image }: Props) {
  const navigation = useNavigation<NavigationProp>();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => navigation.navigate("Login")}
        >
          <Image source={require("@/assets/icons/black-left-arrow.png")} />
        </TouchableOpacity>
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
    position: "static",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.yellow,
    paddingTop: 20,
    paddingBottom: 10,
    zIndex: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
  },
  header: {
    marginTop: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  character: {
    width: 80,
    height: 80,
    marginRight: 10,
    marginLeft: -20
  },
  user: {
    fontSize: 20,
    color: colors.black,
  },
  userJob: {
    color: colors.black,
  },
  arrow: {
    resizeMode: "contain",
    width: 80,
    height: "auto",
  },
});
