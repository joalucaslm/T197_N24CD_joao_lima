import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation";

import { collection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase";

import InputIcon from "@/components/InputIcon";
import colors from "@/styles/globalStyles";

import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/user/userSlice";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

export default function Login() {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch(); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    try {
      const usersRef = collection(db, "users");
      const querySnapshot = await getDocs(usersRef);

      let userFound = false;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.email === email && data.password === password) {
          userFound = true;

          dispatch(setUser({
            criadoEm: data.criadoEm?.toDate().toString() || "", 
            email: data.email,
            image: data.image,
            job: data.job,
            password: data.password,
            user: data.user,
          }));

          navigation.navigate("Home");
        }
      });

      if (!userFound) {
        Alert.alert("Erro", "E-mail ou senha incorretos");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      Alert.alert("Erro", "Ocorreu um erro ao tentar fazer login");
    }
  };

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
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
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
