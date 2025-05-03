import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';

export default function AddProcesses() {
  const [text_lawyer_name, setText_lawyer_name] = useState('');
  const [text_process_number, setText_process_number] = useState('');
  const [text_observations, setText_observations] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar (admin)</Text>
      <Text style={styles.subtitle}>Informações do processo</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nome do advogado</Text>
        <TextInput
          style={styles.input}
          value={text_lawyer_name}
          onChangeText={setText_lawyer_name}
          placeholder=""
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Num processo</Text>
        <TextInput
          style={styles.input}
          value={text_process_number}
          onChangeText={setText_process_number}
          placeholder=""
          placeholderTextColor="#999"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Observações</Text>
        <TextInput
          style={[styles.input, styles.observationsInput]}
          value={text_observations}
          onChangeText={setText_observations}
          placeholder=""
          placeholderTextColor="#999"
          multiline
        />
      </View>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0e0e',
    alignItems: 'center',
    paddingTop: 60,
  },


  title: {
    color: '#EEAD2D',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#EEAD2D',
    fontSize: 18,
    marginBottom: 30,
  },
  card: {
    backgroundColor:  '#000',
    borderColor: '#EEAD2D',
    borderWidth: 2,
    borderRadius: 20,
    padding: 20,
    width: '85%',
  },
  label: {
    color: '#EEAD2D',
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#1c1c1c',
    borderColor: '#FFF',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    color: '#FFFFFF',
    fontSize: 16,
  },

  observationsInput: {
    height: 100, 
    textAlignVertical: 'top', 
  },
});
