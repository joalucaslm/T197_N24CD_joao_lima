import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation";

import InputIcon from "@/components/InputIcon";
import colors from "@/styles/globalStyles";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

export default function Login() {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.logoContainer}>
        <Image source={require("@/assets/logo/yellow-logo.png")} />
      </View>

      <InputIcon
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        icon={require("@/assets/icons/yellow-mail.png")}
      />

      <InputIcon
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        eyeSecurity
        icon={require("@/assets/icons/yellow-lock.png")}
      />

      <View style={styles.containerAuth}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text
          style={styles.text}
          onPress={() => navigation.navigate("ProcessesView")}
        >
          Esqueceu a senha?
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    position: "relative",
    bottom: 40,
  },
  containerAuth: {
    marginTop: 15,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 24,
  },
  text: {
    marginTop: 20,
    color: colors.white,
    fontSize: 12,
    textAlign: "center",
    fontWeight: "normal",
  },
  button: {
    width: 200,
    backgroundColor: colors.yellow,
    padding: 12,
    borderRadius: 30,
    marginVertical: 5,
  },
  buttonText: {
    color: colors.white,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
});
