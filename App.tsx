import { StatusBar } from "expo-status-bar";
import Routes from "./src/navigation";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <Routes />
      <Toast />
    </Provider>
    
  );
}
