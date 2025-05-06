import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/navigation'

const colors = {
  black: '#000',
  white: '#FFF',
  yellow: '#EEAD2D',
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddProcess'>

export default function AddProcessoButton() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AddProcess")}>
      <AntDesign name="plus" size={24} color={colors.white} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: colors.yellow,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
