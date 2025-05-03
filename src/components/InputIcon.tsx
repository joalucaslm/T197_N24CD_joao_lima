import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import colors from "@/styles/globalStyles";
import { InputIconType } from "@/interface/InputIcon";

export default function InputIcon({
  placeholder,
  value,
  onChangeText,
  icon,
  firstIcon = true,
  secureTextEntry = false,
  eyeSecurity = false,
}: InputIconType) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.inputContainer}>
      {firstIcon && <Image source={icon} style={styles.icon} />}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#FFF"
        secureTextEntry={secureTextEntry && !showPassword}
        value={value}
        onChangeText={onChangeText}
      />

      {eyeSecurity && (
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Image
            source={
              showPassword
                ? require("@/assets/icons/gray-opened-eye.png")
                : require("@/assets/icons/gray-closed-eye.png")
            }
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.yellow,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    width: 250,
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
});
