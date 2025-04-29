import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { colors } from './styles/colors'

export default function FilterButtons({ setFilterModalVisible, setSortModalVisible }) {
  return (
    <View style={styles.filterRow}>
      <TouchableOpacity style={styles.filterButton} onPress={() => setFilterModalVisible(true)}>
        <Feather name="filter" size={18} color={colors.darkGray} />
        <Text style={styles.filterButtonText}>Filtros</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.filterButton} onPress={() => setSortModalVisible(true)}>
        <Feather name="bar-chart-2" size={18} color={colors.darkGray} />
        <Text style={styles.filterButtonText}>Ordenar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    elevation: 1,
  },
  filterButtonText: {
    marginLeft: 5,
    color: colors.darkGray,
  },
})