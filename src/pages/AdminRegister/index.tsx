import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Alert
} from 'react-native'

import { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/services/firebase'
import colors from '@/styles/globalStyles'

export default function AdminRegister() {
  const [email, setEmail] = useState('')
  const [user, setuser] = useState('')
  const [password, setpassword] = useState('')

  const handleRegister = async () => {
    if (!email || !user || !password) {
      Alert.alert('Erro', 'Preencha todos os campos')
      return
    }

    try {
      await addDoc(collection(db, 'users'), {
        email,
        user,
        password,
        criadoEm: new Date(),
      })
      Alert.alert('Sucesso', 'Usuário registrado!')
      setEmail('')
      setuser('')
      setpassword('')
    } catch (error) {
      console.error('Erro ao registrar usuário:', error)
      Alert.alert('Erro', 'Não foi possível registrar o usuário.')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastre-se</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#CCC"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          placeholderTextColor="#CCC"
          value={user}
          onChangeText={setuser}
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          placeholderTextColor="#CCC"
          secureTextEntry
          value={password}
          onChangeText={setpassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: colors.yellow,
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  input: {
    width: '80%',
    borderWidth: 2,
    borderColor: colors.yellow,
    color: colors.white,
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  button: {
    backgroundColor: colors.white,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 30,
  },
  buttonText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
})
