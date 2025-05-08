import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation";

import EditProcessModal from "@/components/EditProcessModal";
import { doc, updateDoc, collection, getDocs } from "firebase/firestore";
import Toast from "react-native-toast-message";

import ProcessCard from "@/components/ProcessCard";
import SearchBar from "@/components/SearchBar";
import FilterButtons from "@/components/FilterButtons";
import FilterModal from "@/components/FilterModal";
import SortModal from "@/components/SortModal";
import AddProcessoButton from "@/components/AddProcess";

import { db } from "@/services/firebase";

import { ProcessType } from "@/interface/Process";
import colors from "@/styles/globalStyles";

// Opções para filtros
const statusOptions = [
  "Todos",
  "Distribuído",
  "Em andamento",
  "Concluso para decisão",
  "Aguardando audiência",
  "Setenciado",
  "Recursal",
  "Suspenso",
  "Arquivado",
  "Trânsito em julgado",
  "Extinto",
];
const tribunalOptions = ["Todos", "TJSP", "TJMG", "TRF1", "STJ", "STF"];

// Opções para ordenação
const sortOptions = [
  { value: "dataAtualizacao", label: "Data de atualização" },
  { value: "cliente", label: "Cliente" },
  { value: "tribunal", label: "Tribunal" },
  { value: "numero", label: "Número do processo" },
];

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProcessesView() {
  const navigation = useNavigation<NavigationProp>();
  const [processos, setProcessos] = useState<ProcessType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [tribunalFilter, setTribunalFilter] = useState("Todos");
  const [orderBy, setOrderBy] = useState("dataAtualizacao");
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState<ProcessType | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const handleEditProcess = (id: string) => {
    const process = processos.find(p => p.id === id);
    if (process) {
      setSelectedProcess(process);
      setEditModalVisible(true);
    }
  };

  // Função para salvar as alterações
  const handleSaveProcess = async (id: string, data: { status: string; proximaAudiencia: string }) => {
    try {
      // Referência para o documento no Firestore
      const processRef = doc(db, "processes", id);
      
      // Preparar os dados para atualização
      // Nota: Você precisa mapear o status para o formato armazenado no seu banco de dados
      const statusParaDB = traduzirStatusParaDB(data.status);
      
      // Converter a data de DD/MM/YYYY para Date
      const [dia, mes, ano] = data.proximaAudiencia.split("/").map(Number);
      const dataAudiencia = new Date(ano, mes - 1, dia);
      
      // Atualizar no Firestore
      await updateDoc(processRef, {
        status: statusParaDB,
        nextHearing: dataAudiencia,
        lastUpdate: new Date(), // Atualizar a data de atualização
      });
      
      // Atualizar o estado local
      setProcessos(prevProcessos => 
        prevProcessos.map(p => 
          p.id === id
            ? {
                ...p,
                status: data.status,
                proximaAudiencia: data.proximaAudiencia,
                dataAtualizacao: formatarData(new Date()),
              }
            : p
        )
      );
      
      // Fechar o modal e mostrar feedback
      setEditModalVisible(false);
      Toast.show({
        type: 'success',
        text1: 'Processo atualizado com sucesso!',
      });
      
    } catch (error) {
      console.error("Erro ao atualizar processo:", error);
      Toast.show({
        type: 'error',
        text1: 'Erro ao atualizar processo',
        text2: 'Tente novamente mais tarde',
      });
    }
  };
  
  // Função para traduzir o status para o formato do banco de dados
  function traduzirStatusParaDB(status: string): string {
    const mapa: { [key: string]: string } = {
      "Em andamento": "em_andamento",
      "Aguardando manifestação": "aguardando_manifestacao",
      "Concluso para decisão": "concluso_para_decisao",
      "Prazo em curso": "prazo_em_curso",
      // Adicione os demais status conforme necessário
    };
    return mapa[status] || status.toLowerCase().replace(/ /g, "_");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "processes"));
        const processosFirebase: ProcessType[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();

          processosFirebase.push({
            id: doc.id,
            numero: data.processNumber,
            cliente: data.client,
            assunto: data.subject,
            tribunal: data.court,
            status: traduzirStatus(data.status),
            dataAtualizacao: formatarData(data.lastUpdate?.toDate?.()),
            proximaAudiencia: formatarData(data.nextHearing?.toDate?.()),
          });
        });

        setProcessos(processosFirebase);
      } catch (error) {
        console.error("Erro ao buscar processos:", error);
      }
    };

    fetchData();
  }, []);

  function formatarData(date?: Date): string {
    if (!date || !(date instanceof Date)) return "";
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const ano = date.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  function traduzirStatus(status: string): string {
    const mapa: { [key: string]: string } = {
      em_andamento: "Em andamento",
      aguardando_manifestacao: "Aguardando manifestação",
      concluso_para_decisao: "Concluso para decisão",
      prazo_em_curso: "Prazo em curso",
    };
    return mapa[status] || status;
  }

  // Aplicar filtros e ordenação
  const processosExibidos = processos
    .filter(
      (processo) =>
        (statusFilter === "Todos" || processo.status === statusFilter) &&
        (tribunalFilter === "Todos" || processo.tribunal === tribunalFilter) &&
        (processo.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
          processo.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
          processo.assunto.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (orderBy === "dataAtualizacao") {
        // Conversão de data no formato DD/MM/YYYY para objeto Date
        const dateA = a.dataAtualizacao.split("/").reverse().join("-");
        const dateB = b.dataAtualizacao.split("/").reverse().join("-");
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      }
      if (orderBy === "cliente") {
        return a.cliente.localeCompare(b.cliente);
      }
      if (orderBy === "tribunal") {
        return a.tribunal.localeCompare(b.tribunal);
      }
      return a.numero.localeCompare(b.numero);
    });

  // Limpar todos os filtros
  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("Todos");
    setTribunalFilter("Todos");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.homePosition}
        onPress={() => navigation.navigate("Home")}
      >
        <Image
          style={styles.homeIcon}
          source={require("@/assets/icons/yellow-home.png")}
        />
      </TouchableOpacity>
      
      <View style={styles.header}>
        <Text style={styles.title}>Processos</Text>
        <Text style={styles.subtitle}>
          Gerencie todos os seus processos em um só lugar
        </Text>
      </View>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <FilterButtons
        openFilterModal={() => setFilterModalVisible(true)}
        openSortModal={() => setSortModalVisible(true)}
      />

      <Text style={styles.resultsText}>
        {processosExibidos.length} processos encontrados
      </Text>

      <FlatList
        data={processosExibidos}
        renderItem={({ item }) => (
          <ProcessCard 
            processo={item} 
            onEdit={handleEditProcess}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.processList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              Nenhum processo encontrado com os filtros atuais.
            </Text>
            <TouchableOpacity
              style={styles.clearFiltersButton}
              onPress={clearFilters}
            >
              <Text style={styles.clearFiltersText}>Limpar filtros</Text>
            </TouchableOpacity>
          </View>
        }
      />

      <AddProcessoButton />

      <FilterModal
        visible={filterModalVisible}
        statusFilter={statusFilter}
        tribunalFilter={tribunalFilter}
        statusOptions={statusOptions}
        tribunalOptions={tribunalOptions}
        setStatusFilter={setStatusFilter}
        setTribunalFilter={setTribunalFilter}
        closeModal={() => setFilterModalVisible(false)}
      />

      <SortModal
        visible={sortModalVisible}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        sortOptions={sortOptions}
        closeModal={() => setSortModalVisible(false)}
      />

      <EditProcessModal
        visible={editModalVisible}
        process={selectedProcess}
        onClose={() => setEditModalVisible(false)}
        onSave={handleSaveProcess}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
  },
  subtitle: {
    fontSize: 14,
    color: colors.white,
    marginTop: 5,
  },
  resultsText: {
    paddingHorizontal: 20,
    marginBottom: 10,
    color: colors.white,
    fontSize: 12,
  },
  processList: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  emptyState: {
    padding: 20,
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  emptyStateText: {
    color: colors.darkGray,
    textAlign: "center",
    marginBottom: 15,
  },
  clearFiltersButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  clearFiltersText: {
    color: colors.yellow,
    fontWeight: "bold",
  },
  homePosition: {
    zIndex: 50,
    position: "absolute",
    top: 50,
    right: 40,
  },
  homeIcon: {
    width: 40,
    height: 40,
  },
});