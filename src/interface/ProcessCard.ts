import { ProcessType } from "./Process";

export interface ProcessCardType {
    processo: ProcessType;
    onPress?: () => void; 
  }