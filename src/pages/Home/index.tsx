import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/navigation'

import UserHeader from '@/Shared/UserHeader'
import colors from '@/styles/globalStyles'

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'AdminRegister'>

export default function Home() {
  const navigation = useNavigation<NavigationProp>()

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <UserHeader />
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AdminRegister')}
        >
          <Text>Adidiconar novo admin</Text>
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
  },
  button: {
    width: 200,
    backgroundColor: colors.yellow,
    padding: 12,
    borderRadius: 30,
    marginVertical: 5,
  },
})
