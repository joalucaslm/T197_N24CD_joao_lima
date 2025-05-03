export interface InputIconType {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  icon: any; 
  secureTextEntry?: boolean;
  eyeSecurity?: boolean;
}
