import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  Alert,
  Modal,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation";

import { useState, useEffect } from "react";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase";
import colors from "@/styles/globalStyles";
import InputIcon from "@/components/InputIcon";

const characters = [
  { id: "homemUm", img: require("@/assets/character/HomemUm.png") },
  { id: "homemDois", img: require("@/assets/character/HomemDois.png") },
  { id: "mulherUm", img: require("@/assets/character/MulherUm.png") },
  { id: "mulherDois", img: require("@/assets/character/MulherDois.png") },
];

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function AdminRegister() {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState("");
  const [user, setuser] = useState("");
  const [job, setJob] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    setSelectedCharacter(characters[randomIndex]);
  }, []);

  const handleRegister = async () => {
    if (!email || !user || !job || !password || !confirmPassword) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        Alert.alert("Erro", "Já existe um usuário com esse email.");
        return;
      }

      await addDoc(usersRef, {
        email,
        user,
        job,
        password,
        image: selectedCharacter.id,
        criadoEm: new Date(),
      });

      Alert.alert("Sucesso", "Usuário registrado!");
      setEmail("");
      setuser("");
      setJob("");
      setpassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      Alert.alert("Erro", "Não foi possível registrar o usuário.");
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.arrow}
        onPress={() => navigation.navigate("Home")}
      >
        <Image source={require("@/assets/icons/yellow-left-arrow.png")} />
      </TouchableOpacity>

      <Text style={styles.title}>Faça seu cadastro</Text>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image style={styles.characterImage} source={selectedCharacter.img} />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolha seu avatar</Text>
            <ScrollView contentContainerStyle={styles.characterGrid}>
              {characters.map((char) => (
                <TouchableOpacity
                  key={char.id}
                  onPress={() => {
                    setSelectedCharacter(char);
                    setModalVisible(false);
                  }}
                >
                  <Image style={styles.modalCharacterImage} source={char.img} />
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeModal}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.inputContainer}>
        <InputIcon
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          firstIcon={false}
        />
        <InputIcon
          placeholder="Usuário"
          value={user}
          onChangeText={setuser}
          firstIcon={false}
        />
        <InputIcon
          placeholder="Cargo"
          value={job}
          onChangeText={setJob}
          firstIcon={false}
        />
        <InputIcon
          placeholder="Senha"
          value={password}
          onChangeText={setpassword}
          firstIcon={false}
          secureTextEntry
          eyeSecurity
        />
        <InputIcon
          placeholder="Confirme sua senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          firstIcon={false}
          secureTextEntry
          eyeSecurity
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar</Text>
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
    paddingHorizontal: 20,
  },
  title: {
    color: colors.yellow,
    fontSize: 36,
    fontWeight: "bold",
  },
  characterImage: {
    width: 140,
    height: 140,
    margin: 20,
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    gap: 10,
  },
  button: {
    backgroundColor: colors.white,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 30,
  },
  buttonText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContent: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxHeight: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  characterGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  },
  modalCharacterImage: {
    width: 80,
    height: 80,
    marginBottom: 5,
  },
  characterName: {
    textAlign: "center",
    fontSize: 14,
    color: colors.black,
  },
  closeModal: {
    marginTop: 20,
    color: "red",
  },
  characterLabel: {
    color: colors.white,
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
  },
  arrow: {
    position: "absolute",
    top: 60,
    left: 20,
    resizeMode: "contain",
    width: 80,
    height: "auto",
  },
});
