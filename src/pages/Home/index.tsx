import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { db } from "@/services/firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { ClientCardType } from "@/interface/ClientCard";
import { ProcessType } from "@/interface/Process";
import ProcessCard from "@/components/ProcessCard";
import ClientCard from "@/components/ClientCard";

import UserHeader from "@/Shared/UserHeader";
import colors from "@/styles/globalStyles";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Home() {
  const navigation = useNavigation<NavigationProp>();
  const user = useSelector((state: RootState) => state.user);

  const [processos, setProcessos] = useState<ProcessType[]>([]);
  const [clientCards, setClientCards] = useState<ClientCardType[]>([]);

  useEffect(() => {
    const fetchProcessos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "processes"));
        const fetchedProcessos: ProcessType[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedProcessos.push({
            id: doc.id,
            numero: data.processNumber,
            cliente: data.client,
            assunto: data.subject,
            tribunal: data.court,
            status: data.status,
            dataAtualizacao: new Date(
              data.lastUpdate?.seconds * 1000
            ).toLocaleDateString("pt-BR"),
            proximaAudiencia: new Date(data.nextHearing).toLocaleDateString(
              "pt-BR"
            ),
          });
        });

        setProcessos(fetchedProcessos);
      } catch (error) {
        console.error("Erro ao buscar processos:", error);
      }
    };

    fetchProcessos();
  }, []);

  useEffect(() => {
    const fetchClientCards = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "client"));
        const clientCards: ClientCardType[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          clientCards.push({
            id: doc.id,
            image: data.image,
            name: data.name,
            nextHearing: data.nextHearing,
          });
        });

        setClientCards(clientCards);
      } catch (error) {
        console.error("Erro ao buscar os clientes:", error);
      }
    };

    fetchClientCards();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <UserHeader user={user.user} job={user.job} image={user.image} />

      <View style={styles.mainContainer}>
        <View style={styles.headerButtons}>
         

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("AdminRegister")}
          >
            <Text style={styles.buttonText}>Cadastrar novo administrado</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recentProcess}>
          <Text style={styles.sectionTitle}>Processos recentes</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("ProcessesView")}
          >
            <Text style={styles.processAcess}>Ver processos</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.cardContainer}
          showsVerticalScrollIndicator={false}
        >
          {processos.map((processo, index) => (
            <View
              key={`${processo.id}-${index}`}
              style={{ marginBottom: index === processos.length - 1 ? 0 : 20 }}
            >
              <ProcessCard processo={processo} />
            </View>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Clientes</Text>
        <ScrollView
          style={styles.cardContainer}
          showsVerticalScrollIndicator={false}
        >
          {clientCards.map((client, index) => (
            <View  key={`${client.id}-${index}`}>
              <ClientCard
                image={client.image}
                name={client.name}
                nextHearing={client.nextHearing}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  mainContainer: {
    backgroundColor: colors.darkGray,
    padding: 10,
    borderRadius: 20,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardContainer: {
    backgroundColor: colors.black,
    maxHeight: 250,
    padding: 10,
    gap: 10,
    marginBottom: 20,
  },
  headerButtons: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.yellow,
    padding: 12,
    borderRadius: 30,
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "800",
  },
  recentProcess: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
  },
  processAcess: {
    fontSize: 14,
    fontWeight: 500,
  },
});
