import React, { useState, useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Sensor from './components/Sensor';
import Button from './components/Button';
import WelcomeScreen from './components/Welcome';
import axios from 'axios';
import Toast from 'react-native-toast-message';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  const [clima, setClima] = useState(null);

  const [sensors, setSensors] = useState([
    { id: "1", temperature: 0, humidity: 0, location: "", lat: 0, lon: 0 },
    { id: "2", temperature: 0, humidity: 0, location: "", lat: 0, lon: 0 },
    { id: "3", temperature: 0, humidity: 0, location: "", lat: 0, lon: 0 },
    { id: "4", temperature: 0, humidity: 0, location: "", lat: 0, lon: 0 },
  ]);

  // Función para crear las coordenas random
  function getCoordRandom(min, max) {
    return Math.random() * (max - min) + min;
  }

  async function obtenerClima(lat, lon) {
    const peticion = `http://api.weatherapi.com/v1/current.json?key=81eab98a48b146d8a5523459250809&q=${lat},${lon}&aqi=no`;
    try {
      const respuesta = await axios.get(peticion);
      return respuesta.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  useEffect(() => {
    const inicializarSensors = async () => {
      const nuevosSensores = [];
      for (let i = 0; i < sensors.length; i++) {
        const lat = getCoordRandom(13.0, 14.5).toFixed(4);
        const lon = getCoordRandom(-90.3, -88.0).toFixed(4);
        const climaData = await obtenerClima(lat, lon);
        if (climaData) {
          nuevosSensores.push({
            ...sensors[i],
            temperature: climaData.current.temp_c,
            humidity: climaData.current.humidity,
            location: climaData.location.name,
            lat: climaData.location.lat,
            lon: climaData.location.lon
          });
        } else {
          nuevosSensores.push({ ...sensors[i], lat, lon });
        }
      }
      setSensors(nuevosSensores);
    };
    inicializarSensors();
  }, []);

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
                obtenerClima={obtenerClima}
                clima={clima}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: "#010033",
  },
});
