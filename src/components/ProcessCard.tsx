import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  AntDesign,
  Feather,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";

import { ProcessCardType } from "@/interface/ProcessCard";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";

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

export default function ProcessCard({ processo, onPress }: ProcessCardType) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...processo });
  const [showPicker, setShowPicker] = useState(false);
  const [pickerTarget, setPickerTarget] = useState<
    "dataAtualizacao" | "proximaAudiencia" | null
  >(null);
  const [date, setDate] = useState(new Date());

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (event.type === "set" && selectedDate && pickerTarget) {
      const day = selectedDate.getDate().toString().padStart(2, "0");
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
      const year = selectedDate.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      setFormData({ ...formData, [pickerTarget]: formattedDate });
    }

    setShowPicker(false);
    setPickerTarget(null);
  };

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const toggleEdit = () => {
    if (isEditing) {
      setIsEditing(false); 
    } else {
      setIsEditing(true); 
      if (onPress) onPress();
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={toggleEdit}
      activeOpacity={0.9}
    >
      <View style={styles.cardBorder} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={formData.numero}
              onChangeText={(text) => handleChange("numero", text)}
            />
          ) : (
            <Text style={styles.processNumber}>{formData.numero}</Text>
          )}

          <View style={styles.statusBadge}>
            {isEditing ? (
              <TextInput
                style={[styles.input, styles.smallInput]}
                value={formData.status}
                onChangeText={(text) => handleChange("status", text)}
              />
            ) : (
              <Text style={styles.statusText}>{formData.status}</Text>
            )}
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
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={formData.cliente}
                onChangeText={(text) => handleChange("cliente", text)}
              />
            ) : (
              <Text style={styles.infoText}>{formData.cliente}</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <Feather
              name="file-text"
              size={14}
              color={colors.darkGray}
              style={styles.icon}
            />
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={formData.assunto}
                onChangeText={(text) => handleChange("assunto", text)}
              />
            ) : (
              <Text style={styles.infoText}>{formData.assunto}</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons
              name="gavel"
              size={14}
              color={colors.darkGray}
              style={styles.icon}
            />
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={formData.tribunal}
                onChangeText={(text) => handleChange("tribunal", text)}
              />
            ) : (
              <Text style={styles.infoText}>Tribunal: {formData.tribunal}</Text>
            )}
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
            {isEditing ? (
              <TouchableOpacity
                onPress={() => {
                  setShowPicker(true);
                  setPickerTarget("dataAtualizacao");
                }}
              >
                <Text style={styles.dateText}>
                  Atualizado: {formData.dataAtualizacao}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.dateText}>
                Atualizado: {formData.dataAtualizacao}
              </Text>
            )}
          </View>

          <View style={styles.dateRow}>
            <AntDesign
              name="calendar"
              size={12}
              color={colors.darkGray}
              style={styles.icon}
            />
            {isEditing ? (
              <TouchableOpacity
                onPress={() => {
                  setShowPicker(true);
                  setPickerTarget("proximaAudiencia");
                }}
              >
                <Text style={styles.dateText}>
                  Próxima audiência: {formData.proximaAudiencia}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.dateText}>
                Próxima audiência: {formData.proximaAudiencia}
              </Text>
            )}
          </View>

          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
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
  input: {
    fontSize: 13,
    color: colors.black,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 4,
    paddingHorizontal: 6,
    flex: 1,
  },
});
