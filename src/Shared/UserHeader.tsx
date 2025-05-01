import { StatusBar } from 'expo-status-bar'
import { StyleSheet, SafeAreaView, View, Text, Image } from 'react-native'
import colors from '@/styles/globalStyles'

export default function UserHeader() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Image
          style={styles.character}
          source={require('@/assets/character/HomemDois.png')}
        />
        <View>
          <Text style={styles.user}>João Lucas Lima Maia</Text>
          <Text style={styles.userJob}>Estagiário</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'static',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.gray,
    paddingTop: 20,
    paddingBottom: 10,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderBottomColor: colors.yellow,
    borderBottomWidth: 1,
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  character: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  user: {
    fontSize: 20,
    color: colors.white,
  },
  userJob: {
    color: colors.white,
  },
})
