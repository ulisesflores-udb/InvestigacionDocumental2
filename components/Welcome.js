import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import SensorPreview from "./SensorPreview";


const WelcomeScreen = ( { navigation, sensors, setSensors } ) => {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Bienvenido</Text>
                <Text style={styles.subtitle}>Seleccione un sensor</Text>
            </View>

            <FlatList
                data={sensors}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={({ item, index }) => (
                <SensorPreview
                    location={item.location}
                    onPress={() =>
                    navigation.navigate("Sensor", { 
                        index: index,
                    })
                    }
                />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#010033",
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        
    },
    header: {
        marginTop: 50,
        marginBottom: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#d6d7dc",
    },
    subtitle: {
        fontSize: 16,
        color: "#d6d7dc",
        marginTop: 4,
    },
});

export default WelcomeScreen;
