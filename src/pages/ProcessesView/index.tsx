import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";

import ProcessCard from "@/components/ProcessCard";
import SearchBar from "@/components/SearchBar";
import FilterButtons from "@/components/FilterButtons";
import FilterModal from "@/components/FilterModal";
import SortModal from "@/components/SortModal";
import AddProcessoButton from "@/components/AddProcess";

import { collection, getDocs } from "firebase/firestore";
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

export default function ProcessesView() {
  const [processos, setProcessos] = useState<ProcessType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [tribunalFilter, setTribunalFilter] = useState("Todos");
  const [orderBy, setOrderBy] = useState("dataAtualizacao");
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);

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
            proximaAudiencia: formatarData(new Date(data.nextHearing)),
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
        return new Date(dateB) - new Date(dateA);
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
        renderItem={({ item }) => <ProcessCard processo={item} />}
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
    paddingTop: 40,
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
});
