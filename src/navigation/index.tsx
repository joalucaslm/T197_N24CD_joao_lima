import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '@/pages/Login';

export type RootStackParamList = {
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
