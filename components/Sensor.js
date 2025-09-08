import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View } from 'react-native';
import Button from "./Button";
import Icon from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import {
  ViroARSceneNavigator,
  ViroARScene,
  ViroText,
  ViroQuad,
  ViroConstants,
  ViroMaterials,
  ViroFlexView
} from '@reactvision/react-viro';

ViroMaterials.createMaterials({
  labelBackground: {
    diffuseColor: "#000",
  },
});

const SensorARScene = (props) => {
  const { sensor } = props;

  return (
    <ViroARScene>
        <ViroText
          text={`Ubicación: ${sensor.location}`}
          position={[0, 0.3, -1]}   // más cerca del centro
          scale={[.1, .1, .1]}
          style={styles.arText}
          width={2}
          height={1}
        />
        <ViroText
          text={`Temperatura: ${sensor.temperature}°C`}
          position={[0, 0.1, -1]}   // solo un poco abajo
          scale={[.1, .1, .1]}
          style={styles.arText}
          width={2.5}
          height={0.5}
        />
        <ViroText
          text={`Humedad: ${sensor.humidity}%`}
          position={[0, -0.1, -1]}  // más cerca del anterior
          scale={[.1, .1, .1]}
          style={styles.arText}
          width={2.5}
          height={0.5}
        />
    </ViroARScene>
  );
};

const Sensor = ({ route, navigation, sensors, setSensors, obtenerClima }) => {
  const { index } = route.params;
  const sensor = sensors[index];
  const intervalRef = useRef(null);

  const startAutoRefresh = () => {
    if (intervalRef.current)
      clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      handleRefresh(false);
    }, 5000);
  };

  const handleRefresh = async (manual = true) => {
    const newSensors = [...sensors];
    const climaData = await obtenerClima(sensor.lat, sensor.lon);
    if (climaData) {
      newSensors[index] = {
        ...newSensors[index],
        temperature: climaData.current.temp_c,
        humidity: climaData.current.humidity,
        location: climaData.location.name
      };
      setSensors(newSensors);

      Toast.show({
        type: 'success',
        text1: 'Datos actualizados',
        text2: `Temperatura: ${climaData.current.temp_c}°C, Humedad: ${climaData.current.humidity}%`,
        position: 'bottom',
        visibilityTime: 2000
      });

      if (manual)
        startAutoRefresh();
    }
  };

  useEffect(() => {
    navigation.setParams({ sensors });
  }, [sensors]);

  useEffect(() => {
    startAutoRefresh();
    return () => clearInterval(intervalRef.current);
  }, [index]);

  if (!sensor) {
    return (
      <View style={styles.container2}>
        <ViroText text="Sensor no encontrado" position={[0, 0, -1]} style={styles.arText} />
      </View>
    );
  }

  return (
    <View style={styles.container2}>
      <View style={{ flex: 1, width: '100%' }}>
        <ViroARSceneNavigator
          autofocus={true}
          initialScene={{ scene: () => <SensorARScene sensor={sensor} /> }}
          style={{ flex: 1 }}
        />
      </View>
      <View style={styles.buttonRow}>
        <Button
          name="refresh"
          size={36}
          color="#333"
          onPress={handleRefresh}
          style={styles.fab}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container_flex: {
    width: 100,
    height: 100
  },
  container2: {
    flex: 1,
    width: '100%',
    backgroundColor: "#010033",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonRow: {
    flexDirection: "row",
    marginBottom: 24,
    justifyContent: "center",
    alignItems: "center"
  },
  arText: {
    fontFamily: 'Arial',
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    padding: 10,
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    zIndex: 10,
  },
});

export default Sensor;