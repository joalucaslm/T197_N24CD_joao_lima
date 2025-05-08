import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {
  AntDesign,
  Feather,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation";

import { ProcessType } from "@/interface/Process";

const colors = {
  black: "#000",
  white: "#FFF",
  yellow: "#EEAD2D",
  gray: "#F2F2F2",
  lightGray: "#E0E0E0",
  darkGray: "#707070",
  blue: "#E6F0FF",
  darkBlue: "#0066CC",
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export interface ProcessCardProps {
  processo: ProcessType;
  onPress?: () => void;
  onEdit?: (id: string) => void;
}

export default function ProcessCard({ processo, onPress, onEdit }: ProcessCardProps) {
  const navigation = useNavigation<NavigationProp>();
  const handlePress = onPress ? onPress : () => navigation.navigate("EditProcess");

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.7}
    >
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
        
        {onEdit && (
          <TouchableOpacity 
            style={styles.editButton}
            onPress={(e) => {
              // Evitar que o toque no botão dispare o onPress do card
              e.stopPropagation();
              onEdit(processo.id);
            }}
          >
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.gray,
    borderRadius: 8,
    marginBottom: 15,
    flexDirection: "row",
    overflow: "hidden",
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  processNumber: {
    fontSize: 14,
    fontWeight: "bold",
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
    flexDirection: "row",
    alignItems: "center",
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
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    paddingTop: 8,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontSize: 11,
    color: colors.darkGray,
  },
  editButton: {
    alignSelf: 'flex-end',
    backgroundColor: colors.yellow,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginTop: 8,
  },
  editButtonText: {
    color: colors.black,
    fontSize: 12,
    fontWeight: '500',
  },
});