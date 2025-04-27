import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '@/pages/Login';
import Home from '@/pages/Home';
import AddProcesses from '@/pages/AddProcesses';

export type RootStackParamList = {
  Login: undefined;
  AddProcesses: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddProcesses" component={AddProcesses} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
