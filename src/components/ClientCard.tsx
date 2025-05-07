import { StyleSheet, View, Image, Text } from "react-native";
import { ClientCardType } from "@/interface/ClientCard";

import colors from "@/styles/globalStyles";

export default function ClientCard({
  image,
  name,
  nextHearing,
}: ClientCardType) {
  const images = {
    homemUm: require("@/assets/character/HomemUm.png"),
    homemDois: require("@/assets/character/HomemDois.png"),
    mulherUm: require("@/assets/character/MulherUm.png"),
    mulherDois: require("@/assets/character/MulherDois.png"),
  };

  const hearing = "Proxima audiencia: " + nextHearing;
  return (
    <View style={styles.clientCard}>
      <Image
        style={styles.character}
        source={images[image] || images["homemUm"]}
      />

      <View style={styles.clientInfos}>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text}>{hearing}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  clientCard: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.yellow,
    padding: 10,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  character: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  clientInfos: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  text: {
    color: colors.white,
    fontSize: 14,
  },
});
