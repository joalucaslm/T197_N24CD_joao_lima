import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '@/pages/Login';
import AddProcesses from '@/pages/AddProcesses';

export type RootStackParamList = {
  Login: undefined;
  AddProcesses: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="AddProcesses" component={AddProcesses} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
