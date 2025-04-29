import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import {
  AntDesign,
  Feather,
  FontAwesome,
  MaterialIcons,
} from '@expo/vector-icons'

const colors = {
  black: '#000',
  white: '#FFF',
  yellow: '#EEAD2D',
  gray: '#F2F2F2',
  lightGray: '#E0E0E0',
  darkGray: '#707070',
  blue: '#E6F0FF',
  darkBlue: '#0066CC',
}

// Componente para cartão de processo
export default function ProcessCard({processo}) {
  return (
    <View style={styles.card}>
      <View style={styles.cardBorder} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.processNumber}>{processo.numero}</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{processo.status}</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <FontAwesome
              name="user"
              size={14}
              color={colors.darkGray}
              style={styles.icon}
            />
            <Text style={styles.infoText}>{processo.cliente}</Text>
          </View>
          <View style={styles.infoRow}>
            <Feather
              name="file-text"
              size={14}
              color={colors.darkGray}
              style={styles.icon}
            />
            <Text style={styles.infoText}>{processo.assunto}</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons
              name="gavel"
              size={14}
              color={colors.darkGray}
              style={styles.icon}
            />
            <Text style={styles.infoText}>Tribunal: {processo.tribunal}</Text>
          </View>
        </View>

        <View style={styles.dateSection}>
          <View style={styles.dateRow}>
            <AntDesign
              name="calendar"
              size={12}
              color={colors.darkGray}
              style={styles.icon}
            />
            <Text style={styles.dateText}>
              Atualizado: {processo.dataAtualizacao}
            </Text>
          </View>
          <View style={styles.dateRow}>
            <AntDesign
              name="calendar"
              size={12}
              color={colors.darkGray}
              style={styles.icon}
            />
            <Text style={styles.dateText}>
              Próxima audiência: {processo.proximaAudiencia}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     backgroundColor: 'black',
  //   },
  //   header: {
  //     paddingHorizontal: 20,
  //     paddingTop: 20,
  //     paddingBottom: 10,
  //   },
  //   title: {
  //     fontSize: 24,
  //     fontWeight: 'bold',
  //     color: colors.white,
  //   },
  //   subtitle: {
  //     fontSize: 14,
  //     color: colors.white,
  //     marginTop: 5,
  //   },
  //   searchContainer: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     backgroundColor: colors.white,
  //     borderRadius: 8,
  //     marginHorizontal: 20,
  //     marginVertical: 10,
  //     paddingHorizontal: 10,
  //     height: 45,
  //     elevation: 2,
  //   },
  //   searchIcon: {
  //     marginRight: 10,
  //   },
  //   searchInput: {
  //     flex: 1,
  //     height: '100%',
  //   },
  //   filterRow: {
  //     flexDirection: 'row',
  //     paddingHorizontal: 20,
  //     marginBottom: 10,
  //   },
  //   filterButton: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     backgroundColor: colors.white,
  //     borderRadius: 8,
  //     paddingHorizontal: 15,
  //     paddingVertical: 8,
  //     marginRight: 10,
  //     elevation: 1,
  //   },
  //   filterButtonText: {
  //     marginLeft: 5,
  //     color: colors.gray,
  //   },
  //   resultsText: {
  //     paddingHorizontal: 20,
  //     marginBottom: 10,
  //     color: colors.white,
  //     fontSize: 12,
  //   },
  //   processList: {
  //     paddingHorizontal: 20,
  //     paddingBottom: 80, // Espaço para o botão flutuante
  //   },

  // Começa o card aqui

  card: {
    backgroundColor: colors.gray,
    borderRadius: 8,
    marginBottom: 15,
    flexDirection: 'row',
    overflow: 'hidden',
    elevation: 2,
  },
  cardBorder: {
    width: 4,
    backgroundColor: colors.yellow,
  },
  cardContent: {
    flex: 1,
    padding: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  processNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.black,
    flex: 1,
  },
  statusBadge: {
    backgroundColor: colors.blue,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    color: colors.darkBlue,
  },
  infoSection: {
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    marginRight: 6,
  },
  infoText: {
    fontSize: 13,
    color: colors.darkGray,
    flex: 1,
  },
  dateSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    paddingTop: 8,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 11,
    color: colors.darkGray,
  },

  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: colors.yellow,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
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

  // Estilos para modais
  //   modalContainer: {
  //     flex: 1,
  //     justifyContent: 'flex-end',
  //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
  //   },
  //   modalContent: {
  //     backgroundColor: colors.white,
  //     borderTopLeftRadius: 20,
  //     borderTopRightRadius: 20,
  //     paddingBottom: 20,
  //     maxHeight: '70%',
  //   },
  //   modalHeader: {
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //     alignItems: 'center',
  //     padding: 20,
  //     borderBottomWidth: 1,
  //     borderBottomColor: colors.lightGray,
  //   },
  //   modalTitle: {
  //     fontSize: 18,
  //     fontWeight: 'bold',
  //   },
  //   modalBody: {
  //     padding: 20,
  //   },
  //   filterLabel: {
  //     fontSize: 16,
  //     fontWeight: 'bold',
  //     marginBottom: 10,
  //     color: colors.black,
  //   },
  //   filterOption: {
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //     alignItems: 'center',
  //     paddingVertical: 12,
  //     paddingHorizontal: 5,
  //     borderBottomWidth: 1,
  //     borderBottomColor: colors.lightGray,
  //   },
  //   filterOptionSelected: {
  //     backgroundColor: 'rgba(238, 173, 45, 0.1)',
  //   },
  //   filterOptionText: {
  //     fontSize: 14,
  //     color: colors.darkGray,
  //   },
  //   filterOptionTextSelected: {
  //     color: colors.black,
  //     fontWeight: '500',
  //   },
  //   separator: {
  //     height: 20,
  //   },
  //   applyButton: {
  //     backgroundColor: colors.yellow,
  //     marginHorizontal: 20,
  //     padding: 15,
  //     borderRadius: 8,
  //     alignItems: 'center',
  //   },
  //   applyButtonText: {
  //     color: colors.white,
  //     fontWeight: 'bold',
  //     fontSize: 16,
  //   },
})
