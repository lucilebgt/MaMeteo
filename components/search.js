import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TextInput } from 'react-native';


export default function Search() {
    const [text, onChangeText] = React.useState('Useless Text');
    const [city, setCity] = React.useState('');

    return (
        <TextInput
            style={styles.input}
            onChangeText={(text) => setCity(text)}
            value={city}
            placeholder="Recherche par ville" />
    )
}
const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});


