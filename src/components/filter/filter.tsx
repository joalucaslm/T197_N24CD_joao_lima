import React from 'react'
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  ScrollView 
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { colors } from './styles/colors'

export default function FilterModal({
  filterModalVisible,
  setFilterModalVisible,
  statusFilter,
  setStatusFilter,
  tribunalFilter,
  setTribunalFilter,
}) {
  // Opções para filtros
  const statusOptions = [
    'Todos', 
    'Em andamento', 
    'Aguardando manifestação', 
    'Concluso para decisão', 
    'Prazo em curso'
  ];
  
  const tribunalOptions = ['Todos', 'TJSP', 'TJMG', 'TRF1', 'STJ', 'STF'];

  return (
    <Modal
      visible={filterModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setFilterModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filtros</Text>
            <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
              <AntDesign name="close" size={24} color={colors.black} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalBody}>
            <Text style={styles.filterLabel}>Status</Text>
            {statusOptions.map(status => (
              <TouchableOpacity 
                key={status}
                style={[
                  styles.filterOption,
                  statusFilter === status && styles.filterOptionSelected
                ]}
                onPress={() => setStatusFilter(status)}
              >
                <Text 
                  style={[
                    styles.filterOptionText,
                    statusFilter === status && styles.filterOptionTextSelected
                  ]}
                >
                  {status}
                </Text>
                {statusFilter === status && (
                  <AntDesign name="check" size={16} color={colors.yellow} />
                )}
              </TouchableOpacity>
            ))}
            
            <View style={styles.separator} />
            
            <Text style={styles.filterLabel}>Tribunal</Text>
            {tribunalOptions.map(tribunal => (
              <TouchableOpacity 
                key={tribunal}
                style={[
                  styles.filterOption,
                  tribunalFilter === tribunal && styles.filterOptionSelected
                ]}
                onPress={() => setTribunalFilter(tribunal)}
              >
                <Text 
                  style={[
                    styles.filterOptionText,
                    tribunalFilter === tribunal && styles.filterOptionTextSelected
                  ]}
                >
                  {tribunal}
                </Text>
                {tribunalFilter === tribunal && (
                  <AntDesign name="check" size={16} color={colors.yellow} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          <TouchableOpacity 
            style={styles.applyButton}
            onPress={() => setFilterModalVisible(false)}
          >
            <Text style={styles.applyButtonText}>Aplicar filtros</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalBody: {
    padding: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.black,
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  filterOptionSelected: {
    backgroundColor: 'rgba(238, 173, 45, 0.1)',
  },
  filterOptionText: {
    fontSize: 14,
    color: colors.darkGray,
  },
  filterOptionTextSelected: {
    color: colors.black,
    fontWeight: '500',
  },
  separator: {
    height: 20,
  },
  applyButton: {
    backgroundColor: colors.yellow,
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
})