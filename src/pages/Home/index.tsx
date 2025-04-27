import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Text } from 'react-native'
import UserHeader from '@/Shared/UserHeader'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/navigation'
import colors from '@/styles/globalStyles'

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>

export default function Home() {
  const navigation = useNavigation<NavigationProp>()

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <UserHeader />
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
})
