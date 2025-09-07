import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Sensor from './components/Sensor';
import Button from './components/Button';
import WelcomeScreen from './components/Welcome';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#010033" },
            headerTintColor: "#d6d7dc",
          }}
        >
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ title: "Inicio" }}
          />
          <Stack.Screen
            name="Sensor"
            component={Sensor}
            options={({ route }) => ({ title: route.params.sensor.location })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: "#010033",
  },
});
