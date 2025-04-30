import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const colors = {
  black: '#000',
  white: '#FFF',
  yellow: '#EEAD2D',
};

interface AddProcessoButtonProps {
  onPress?: () => void;
}

const AddProcessoButton: React.FC<AddProcessoButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.addButton} onPress={onPress}>
      <AntDesign name="plus" size={24} color={colors.white} />
    </TouchableOpacity>
  );
};

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

export default AddProcessoButton;