import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '@/pages/Login';
import Home from '@/pages/Home';
import AddProcesses from '@/pages/AddProcesses';
import AdminRegister from '@/pages/AdminRegister';

export type RootStackParamList = {
  Login: undefined;
  AddProcesses: undefined;
  Home: undefined;
  AdminRegister: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddProcesses" component={AddProcesses} />
        <Stack.Screen name="AdminRegister" component={AdminRegister} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
