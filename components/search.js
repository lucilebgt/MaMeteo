import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TextInput, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/stack';


export function Search({ navigation }) {
    const [text, onChangeText] = React.useState('Useless Text');
    const [city, setCity] = React.useState('');

    const Stack = createNativeStackNavigator();
    const Submit = () => {
        props.navigatio.navigate('Result', { city: city })
    }

    return (
        <>

            <TextInput
                style={styles.input}
                onChangeText={(text) => setCity(text)}
                value={city}
                placeholder="Recherche par ville"



            />
            <Button onPress={() => Submit()} title="Valider votre recherche" color="firebrick" width="50" />
        </>
    )
}
const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 60,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'lemonchiffon',
        borderColor: "grey",
        borderWidth: 1,
        paddingHorizontal: 10,
    },
});

export default StackNavigation({
    Search: {
        Search
    },
    Result: {
        Search
    },
})


