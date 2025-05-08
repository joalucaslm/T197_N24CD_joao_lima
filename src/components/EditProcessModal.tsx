// Caminho: /components/EditProcessModal.tsx

import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  Pressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";
import { ProcessType } from "@/interface/Process";
import colors from "@/styles/globalStyles";

// Opções de status
const statusOptions = [
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

interface EditProcessModalProps {
  visible: boolean;
  process: ProcessType | null;
  onClose: () => void;
  onSave: (id: string, data: { status: string; proximaAudiencia: string }) => void;
}

export default function EditProcessModal({
  visible,
  process,
  onClose,
  onSave,
}: EditProcessModalProps) {
  const [status, setStatus] = useState("");
  const [proximaAudiencia, setProximaAudiencia] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  useEffect(() => {
    if (process) {
      setStatus(process.status);
      
      // Converter a data no formato DD/MM/YYYY para objeto Date
      if (process.proximaAudiencia) {
        const [day, month, year] = process.proximaAudiencia.split("/").map(Number);
        setProximaAudiencia(new Date(year, month - 1, day));
      } else {
        setProximaAudiencia(new Date());
      }
    }
  }, [process]);

  const handleSave = () => {
    if (!process) return;
    
    // Formatar a data para o formato DD/MM/YYYY
    const dia = String(proximaAudiencia.getDate()).padStart(2, "0");
    const mes = String(proximaAudiencia.getMonth() + 1).padStart(2, "0");
    const ano = proximaAudiencia.getFullYear();
    const dataFormatada = `${dia}/${mes}/${ano}`;
    
    onSave(process.id, {
      status,
      proximaAudiencia: dataFormatada,
    });
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setProximaAudiencia(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const formatDate = (date: Date) => {
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const ano = date.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  if (!process) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Editar Processo</Text>
            <TouchableOpacity onPress={onClose}>
              <AntDesign name="close" size={24} color={colors.black} />
            </TouchableOpacity>
          </View>

          <View style={styles.processInfo}>
            <Text style={styles.processNumber}>{process.numero}</Text>
            <Text style={styles.clientName}>{process.cliente}</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Status</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={status}
                onValueChange={(itemValue) => setStatus(itemValue)}
                style={styles.picker}
              >
                {statusOptions.map((option) => (
                  <Picker.Item key={option} label={option} value={option} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Próxima Audiência</Text>
            <Pressable onPress={showDatepicker} style={styles.dateInput}>
              <Text>{formatDate(proximaAudiencia)}</Text>
            </Pressable>
            {showDatePicker && (
              <DateTimePicker
                value={proximaAudiencia}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  processInfo: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: colors.yellow,
    borderRadius: 5,
  },
  processNumber: {
    fontWeight: "bold",
    fontSize: 14,
  },
  clientName: {
    fontSize: 14,
    marginTop: 5,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "500",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 5,
    overflow: "hidden",
  },
  picker: {
    height: 50,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 5,
    padding: 12,
    height: 45,
    justifyContent: "center",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: colors.lightGray,
  },
  cancelButtonText: {
    color: colors.darkGray,
    fontWeight: "500",
  },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: colors.yellow,
  },
  saveButtonText: {
    color: colors.black,
    fontWeight: "500",
  },
});