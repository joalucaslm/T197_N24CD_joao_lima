  import { StatusBar } from "expo-status-bar";
  import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
  import { useState } from "react";
  import { Picker } from "@react-native-picker/picker";
  import DateTimePicker from "@react-native-community/datetimepicker";
  import colors from "@/styles/globalStyles";

  import { collection, addDoc, Timestamp } from "firebase/firestore";
  import { db } from "@/services/firebase";
  import { Alert } from "react-native";

  import WaveShape from "@/components/WaveShape";
  import InputIcon from "@/components/InputIcon";


export default function AddProcesses() {
  const [processNumber, setProcessNumber] = useState("");
  const [client, setClient] = useState("");
  const [subject, setSubject] = useState("");
  const [court, setCourt] = useState("");
  const [nextHearing, setNextHearing] = useState("");
  const [status, setStatus] = useState("");

  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleAddProcess = async () => {
    if (!processNumber || !client || !subject || !court || !nextHearing || !status) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    try {
      await addDoc(collection(db, "processes"), {
        processNumber,
        client,
        subject,
        court,
        nextHearing,
        status,
        createdAt: Timestamp.now(),
        lastUpdate: Timestamp.now(),
      });

      Alert.alert("Sucesso", "Processo adicionado com sucesso!");

      setProcessNumber("");
      setClient("");
      setSubject("");
      setCourt("");
      setNextHearing("");
      setStatus("");
    } catch (error) {
      console.error("Erro ao adicionar processo:", error);
      Alert.alert("Erro", "Não foi possível adicionar o processo");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <WaveShape />
      <View style={styles.inputsContainer}>
        <Text style={styles.text}>Adicione o processo</Text>
        <InputIcon
          placeholder="Número do processo"
          value={processNumber}
          onChangeText={setProcessNumber}
          firstIcon={false}
        />
        <InputIcon
          placeholder="Email do cliente"
          value={client}
          onChangeText={setClient}
          firstIcon={false}
        />
        <InputIcon
          placeholder="Assunto"
          value={subject}
          onChangeText={setSubject}
          firstIcon={false}
        />
        <InputIcon
          placeholder="Tribunal"
          value={court}
          onChangeText={setCourt}
          firstIcon={false}
        />

        <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateButton}>
          <Text style={styles.dateText}>
            {nextHearing
              ? `Data da audiência: ${new Date(nextHearing).toLocaleDateString()}`
              : "Selecionar data da próxima audiência"}
          </Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || date;
              setShowPicker(false);
              setDate(currentDate);
              setNextHearing(currentDate.toISOString());
            }}
          />
        )}

        <Picker
          selectedValue={status}
          onValueChange={(itemValue) => setStatus(itemValue)}
          style={styles.picker}
          dropdownIconColor={colors.yellow}
        >
          <Picker.Item label="Selecione um status" value="" />
          <Picker.Item label="Distribuído" value="Distribuído" />
          <Picker.Item label="Em andamento" value="Em Andamento" />
          <Picker.Item label="Concluso para decisão" value="Concluso para Decisão" />
          <Picker.Item label="Aguardando audiência" value="Aguardando audiência" />
          <Picker.Item label="Sentenciado" value="Setenciado" />
          <Picker.Item label="Recursal" value="Recursal" />
          <Picker.Item label="Suspenso" value="Suspenso" />
          <Picker.Item label="Arquivado" value="Arquivado" />
          <Picker.Item label="Trânsito em julgado" value="Trânsito em julgado" />
          <Picker.Item label="Extinto" value="Extinto" />
        </Picker>

        <TouchableOpacity style={styles.button} onPress={handleAddProcess}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0e0e0e",
    alignItems: "center",
    paddingTop: 60,
  },
  inputsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top: 100,
  },
  text: {
    fontSize: 25,
    color: colors.white,
    position: "relative",
    bottom: 40,
    right: 30,
  },
  dateButton: {
    backgroundColor: "#1e1e1e",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
    width: 250,
  },
  dateText: {
    color: colors.yellow,
    textAlign: "center",
  },
  picker: {
    height: 50,
    width: 250,
    color: colors.yellow,
    backgroundColor: "#1e1e1e",
    borderRadius: 8,
    marginTop: 5,
  },
  button: {
    backgroundColor: colors.yellow,
    marginTop: 20,
    padding: 10,
  },
  buttonText: {
    color: colors.black,
    fontSize: 25,
  },
});
