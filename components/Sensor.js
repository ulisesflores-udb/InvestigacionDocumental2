import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from 'react-native';
import Button from "./Button";
import Icon from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";

const Sensor = ({ route, navigation, sensors, setSensors, obtenerClima}) => {
    const { index } = route.params; 
    const sensor = sensors[index];

    const handleRefresh = async () => {
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
                visibilityTime: 2000,
            });
        }
    };

    useEffect(() => {
        navigation.setParams({ sensors });
    }, [sensors]);

    useEffect(() => {
        const interval = setInterval(() => {
            handleRefresh();
        }, 5000);

        
        return () => clearInterval(interval);
    }, [index]); // Se reinicia si el usuario cambia de sensor


    if (!sensor) {
        return (
            <View style={styles.container2}>
                <Text style={styles.text}>Sensor no encontrado</Text>
            </View>
        );
    }

    // const prevSensor = sensors && index > 0 ? sensors[index - 1] : sensors[sensors.length - 1];
    // const nextSensor = sensors && index < sensors.length - 1 ? sensors[index + 1] : sensors[0];

    return (
        <View style={styles.container2}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.iconCircle}>
                        <Icon name="thermometer-outline" size={22} color="#fff" />
                    </View>
                    <Text style={styles.title}>{sensor.location}</Text>
                </View>
                <Text style={styles.text}>Temperature: {sensor.temperature}°C</Text>
                <Text style={styles.text}>Humidity: {sensor.humidity}%</Text>
                <View style={styles.buttonRow}>
                    <Button
                        name="arrow-back-outline"
                        size={22}
                        color="#333"
                        onPress={() => navigation.setParams({
                            index: index > 0 ? index - 1 : sensors.length - 1
                        })}
                    />
                    <Button
                        name="arrow-forward-outline"
                        size={22}
                        color="#333"
                        onPress={() => navigation.setParams({
                            index: index < sensors.length - 1 ? index + 1 : 0
                        })}
                    />
                    <Button
                        name="refresh"
                        size={36}
                        color="#333"
                        onPress={handleRefresh}
                        style={styles.fab}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container2: {
        flex: 1,
        width: '100%',
        backgroundColor: "#010033",
        alignItems: "center",
    },

    buttonRow: {
        flexDirection: "row",
        marginRight: "auto",
    },

    container: {
        marginTop: 50,
        marginLeft: 'auto', 
        marginRight: 'auto',
        backgroundColor: "#38b6ff",
        borderRadius: 16,
        padding: 16,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 4,
        width: 250,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    iconCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#38b6ff", // verde
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    text: {
        fontSize: 14,
        color: "#333",
        marginBottom: 4,
    },
    locationRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
    },
    fab: {
        position: "absolute",
        bottom: 24,
        right: 24,
        zIndex: 10,
    },
});

export default Sensor;