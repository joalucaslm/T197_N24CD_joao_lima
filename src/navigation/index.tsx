import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "@/pages/Login";
import Home from "@/pages/Home";
import AddProcess from "@/pages/AddProcess";
import AdminRegister from "@/pages/AdminRegister";
import ProcessesView from "@/pages/ProcessesView";
import EditProcess from "@/pages/EditProcess";

export type RootStackParamList = {
  Login: undefined;
  AddProcess: undefined;
  Home: undefined;
  AdminRegister: undefined;
  ProcessesView: undefined;
  EditProcess: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AdminRegister" component={AdminRegister} />

        <Stack.Screen name="ProcessesView" component={ProcessesView} />
        <Stack.Screen name="AddProcess" component={AddProcess} />
        <Stack.Screen name="EditProcess" component={EditProcess} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
