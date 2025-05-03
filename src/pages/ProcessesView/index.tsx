import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  SafeAreaView
} from 'react-native';
import ProcessCard from '@/components/ProcessCard';
import SearchBar from '@/components/SearchBar';
import FilterButtons from '@/components/FilterButtons';
import FilterModal from '@/components/FilterModal';
import SortModal from '@/components/SortModal';
import AddProcessoButton from '@/components/AddProcess';
import { ProcessoType } from '@/interface/Process';

const colors = {
  black: '#000',
  white: '#FFF',
  yellow: '#EEAD2D',
  gray: '#F2F2F2',
  lightGray: '#E0E0E0',
  darkGray: '#707070',
  blue: '#E6F0FF',
  darkBlue: '#0066CC',
};

// Dados iniciais de processos
const processosIniciais: ProcessoType[] = [
  {
    id: '1',
    numero: '0001234-56.2023.8.26.0100',
    cliente: 'Maria Silva',
    assunto: 'Ação de Indenização',
    tribunal: 'TJSP',
    status: 'Em andamento',
    dataAtualizacao: '20/04/2025',
    proximaAudiencia: '10/05/2025',
  },
  {
    id: '2',
    numero: '0007654-32.2024.8.26.0100',
    cliente: 'João Pereira',
    assunto: 'Divórcio Litigioso',
    tribunal: 'TJSP',
    status: 'Aguardando manifestação',
    dataAtualizacao: '18/04/2025',
    proximaAudiencia: '15/06/2025',
  },
  {
    id: '3',
    numero: '5004321-45.2024.8.13.0024',
    cliente: 'Empresa ABC Ltda.',
    assunto: 'Execução Fiscal',
    tribunal: 'TJMG',
    status: 'Concluso para decisão',
    dataAtualizacao: '21/04/2025',
    proximaAudiencia: '20/05/2025',
  },
  {
    id: '4',
    numero: '1002345-67.2023.4.01.3400',
    cliente: 'Carlos Mendes',
    assunto: 'Mandado de Segurança',
    tribunal: 'TRF1',
    status: 'Prazo em curso',
    dataAtualizacao: '15/04/2025',
    proximaAudiencia: '30/05/2025',
  },
];

// Opções para filtros
const statusOptions = ['Todos', 'Em andamento', 'Aguardando manifestação', 'Concluso para decisão', 'Prazo em curso'];
const tribunalOptions = ['Todos', 'TJSP', 'TJMG', 'TRF1', 'STJ', 'STF'];

// Opções para ordenação
const sortOptions = [
  { value: 'dataAtualizacao', label: 'Data de atualização' },
  { value: 'cliente', label: 'Cliente' },
  { value: 'tribunal', label: 'Tribunal' },
  { value: 'numero', label: 'Número do processo' }
];

export default function ProcessesView() {
  const [processos, setProcessos] = useState<ProcessoType[]>(processosIniciais);
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

  // Limpar todos os filtros
  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('Todos');
    setTribunalFilter('Todos');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Processos</Text>
        <Text style={styles.subtitle}>Gerencie todos os seus processos em um só lugar</Text>
      </View>
      
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      <FilterButtons 
        openFilterModal={() => setFilterModalVisible(true)}
        openSortModal={() => setSortModalVisible(true)}
      />
      
      <Text style={styles.resultsText}>{processosExibidos.length} processos encontrados</Text>
      
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
    paddingBottom: 80,
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
});