import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  SafeAreaView,
  TouchableOpacity
} from 'react-native';

import ProcessCard from './ProcessCard';
import SearchBar from './SearchBar';
import FilterButtons from './FilterButtons';
import FilterModal from './FilterModal';
import SortModal from './SortModal';
import AddButton from './AddButton';
import { colors } from './styles/colors';
import { processosIniciais } from './data/processosData';

export default function ProcessScreen() {
  const [processos, setProcessos] = useState(processosIniciais);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [tribunalFilter, setTribunalFilter] = useState('Todos');
  const [orderBy, setOrderBy] = useState('dataAtualizacao');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  
  // Aplicar filtros e ordenação
  const processosExibidos = processos
    .filter(processo => 
      (statusFilter === 'Todos' || processo.status === statusFilter) &&
      (tribunalFilter === 'Todos' || processo.tribunal === tribunalFilter) &&
      (processo.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
       processo.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
       processo.assunto.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (orderBy === 'dataAtualizacao') {
        // Conversão de data no formato DD/MM/YYYY para objeto Date
        const dateA = a.dataAtualizacao.split('/').reverse().join('-');
        const dateB = b.dataAtualizacao.split('/').reverse().join('-');
        return new Date(dateB) - new Date(dateA);
      }
      if (orderBy === 'cliente') {
        return a.cliente.localeCompare(b.cliente);
      }
      if (orderBy === 'tribunal') {
        return a.tribunal.localeCompare(b.tribunal);
      }
      return a.numero.localeCompare(b.numero);
    });

  const handleAddProcess = () => {
    // Implementar função para adicionar novo processo
    console.log('Adicionar novo processo');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Processos</Text>
        <Text style={styles.subtitle}>Gerencie todos os seus processos em um só lugar</Text>
      </View>
      
      {/* Barra de pesquisa */}
      <SearchBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />
      
      {/* Botões de filtros e ordenação */}
      <FilterButtons 
        setFilterModalVisible={setFilterModalVisible} 
        setSortModalVisible={setSortModalVisible} 
      />
      
      {/* Número de resultados */}
      <Text style={styles.resultsText}>{processosExibidos.length} processos encontrados</Text>
      
      {/* Lista de processos */}
      <FlatList
        data={processosExibidos}
        renderItem={({ item }) => <ProcessCard processo={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.processList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Nenhum processo encontrado com os filtros atuais.</Text>
            <TouchableOpacity 
              style={styles.clearFiltersButton}
              onPress={() => {
                setSearchTerm('');
                setStatusFilter('Todos');
                setTribunalFilter('Todos');
              }}
            >
              <Text style={styles.clearFiltersText}>Limpar filtros</Text>
            </TouchableOpacity>
          </View>
        }
      />
      
      {/* Botão flutuante para adicionar processo */}
      <AddButton onPress={handleAddProcess} />
      
      {/* Modal para filtros */}
      <FilterModal 
        filterModalVisible={filterModalVisible}
        setFilterModalVisible={setFilterModalVisible}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        tribunalFilter={tribunalFilter}
        setTribunalFilter={setTribunalFilter}
      />
      
      {/* Modal para ordenação */}
      <SortModal 
        sortModalVisible={sortModalVisible}
        setSortModalVisible={setSortModalVisible}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
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
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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
    paddingBottom: 80, // Espaço para o botão flutuante
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  emptyStateText: {
    color: colors.darkGray,
    textAlign: 'center',
    marginBottom: 15,
  },
  clearFiltersButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  clearFiltersText: {
    color: colors.yellow,
    fontWeight: 'bold',
  },
})