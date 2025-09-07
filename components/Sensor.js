import React from "react"
import { StyleSheet, Text, View } from 'react-native';
import Button from "./Button";
import Icon from "react-native-vector-icons/Ionicons";


const Sensor = ({ route }) => {
    const { sensor } = route.params;
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
                    name="create-outline"
                    size={22}
                    color="#333"
                    onPress={() => navigation.navigate("EditSensor", { sensor })}
                />
                <Button
                    name="arrow-back-outline"
                    size={22}
                    color="#333"
                    onPress={() => prevSensor && navigation.navigate("Sensor", { sensor: prevSensor })}
                />
                <Button
                    name="arrow-forward-outline"
                    size={22}
                    color="#333"
                    onPress={() => nextSensor && navigation.navigate("Sensor", { sensor: nextSensor })}
                />
            </View>
        </View>
    </View>
    )
}

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
});

export default Sensor;