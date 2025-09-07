import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const SensorPreview = ({ location, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
        <View style={styles.row}>
            <Icon name="location-outline" size={18} color="#010033" />
            <Text style={styles.text}>{location}</Text>
        </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#38b6ff",
        borderRadius: 12,
        padding: 12,    
        alignItems: "center",
        width: '45%',
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
        margin: 6,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        fontSize: 14,
        marginLeft: 6,
        color: "#2c3e50",
        fontWeight: "500",
    },
});

export default SensorPreview;