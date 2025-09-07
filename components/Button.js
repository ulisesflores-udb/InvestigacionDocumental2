import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Button = ({ name, size = 28, color = "#333", onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Icon name={name} size={size} color={color} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 50,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 4,
        margin: 6,
    },
});

export default Button;