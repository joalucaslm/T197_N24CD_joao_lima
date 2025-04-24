import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/navigation'
import colors from '@/styles/globalStyles'

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>

export default function Login() {
  const navigation = useNavigation<NavigationProp>()

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.logoContainer}>
        <Image source={require('@/assets/logo/yellow-logo.png')} />
      </View>
      <View style={styles.inputContainer}>
        <Image
          source={require('@/assets/icons/yellow-mail.png')}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#FFF"
        />
      </View>

      <View style={styles.inputContainer}>
        <Image
          source={require('@/assets/icons/yellow-lock.png')}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#FFF"
          secureTextEntry
        />
      </View>

      <View style={styles.containerAuth}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text
          style={styles.text}
          onPress={() => navigation.navigate('Register')}
        >
          Esqueceu a senha?
        </Text>
      </View>

      <View style={styles.containerRegister}>
        <Text
          style={styles.text}
          onPress={() => navigation.navigate('Register')}
        >
          Junte-se a nós! Crie uma conta.
        </Text>
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
  },
  logoContainer: {
    position: 'relative',
    bottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.yellow,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    width: 250,
  },
  containerAuth: {
    marginTop: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 24,
  },
  containerRegister: {
    position: 'absolute',
    bottom: 40,
  },
  text: {
    marginTop: 20,
    color: colors.white,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'normal',
  },
  input: {
    flex: 1,
    color: colors.white,
    paddingVertical: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  button: {
    width: 200,
    backgroundColor: colors.yellow,
    padding: 12,
    borderRadius: 30,
    marginVertical: 5,
  },
  buttonText: {
    color: colors.white,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
})
