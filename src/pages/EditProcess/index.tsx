import { StyleSheet, View } from "react-native";
import colors from "@/styles/globalStyles";

export default function EditProcess() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});
