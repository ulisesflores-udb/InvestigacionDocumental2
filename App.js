import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Sensor from './components/Sensor';
import Button from './components/Button';
import WelcomeScreen from './components/Welcome';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {

    const [sensors, setSensors] = useState([
        { id: "1", temperature: 21.3, humidity: 43, location: "Park Area" },
        { id: "2", temperature: 19.8, humidity: 50, location: "Garden" },
        { id: "3", temperature: 23.1, humidity: 40, location: "Playground" },
        { id: "4", temperature: 20.5, humidity: 47, location: "Lake Side" },
    ])
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
            options={{ title: "Inicio" }}
          >
            {props => (
              <WelcomeScreen
                {...props}
                sensors={sensors}
                setSensors={setSensors}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Sensor"
            options={({ route }) => {
              const { index } = route.params;
              const sensor = sensors && typeof index === "number" ? sensors[index] : null;
              return { title: sensor ? sensor.location : "Sensor" };
            }}
          >
            {props => (
              <Sensor
                {...props}
                sensors={sensors}
                setSensors={setSensors}
              />
            )}
          </Stack.Screen>
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
