export interface InputIconType {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  icon?: any; 
  firstIcon?: boolean;
  secureTextEntry?: boolean;
  eyeSecurity?: boolean;
}
