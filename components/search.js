import * as  React from 'react';
import { StyleSheet, TextInput, Button, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';



const HomeView = () => {


    //=create un search component and its style

    const SearchScreen = ({ navigation }) => {

        const [city, setCity] = React.useState('');


        return (
            <>
                <Text style={styles.title}>Trouvez votre ville</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Recherche par ville"
                    onChangeText={newCity => setCity(newCity)}
                    defaultValue={city}
                />
                <Button
                    onPress={() => navigation.push('ResultsScreen', { city })}
                    title="Valider votre recherche"
                    color="firebrick"
                />
            </>
        )
    };



    // = create a screen for show results' search
    const ResultsScreen = ({ route, navigation }) => {

        const { city } = route.params;
        const [weather, setWeather] = React.useState('');

        React.useEffect(() => {
            //     const fetchWeather = async () => {
            //         try {
            //             // const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`);
            //             setWeather(response.data);
            //         } catch (error) {
            //             console.error(error);
            //         }
            //     };
            //     fetchWeather();
        }, [city]);

        return (
            <>
                {weather.main ? (
                    <View style={styles.container}>
                        <Text>Meteo de {city}</Text>
                        <Text>Temperature: {weather.main.temp}°C</Text>
                        <Text>Humidite: {weather.main.humidity}%</Text>
                        <Text>Condition meteo: {weather.weather[0].description}</Text>
                    </View>
                ) : (
                    <Text Style={styles.title} >En attente de chargement...</Text >
                )}
            </>
        )
    };


    const Stack = createStackNavigator();

    return (

        <Stack.Navigator initialRouteName="Search"
            screenOptions={{
                headerStyle: { backgroundColor: 'firebrick' },
                headerTintColor: 'white',
                fontSize: 30,
            }}>

            <Stack.Screen
                name="La Meteo de votre Ville"
                component={SearchScreen}
                style={styles.title}
                options={{ title: "La Meteo par ville" }}

            />

            < Stack.Screen
                name="ResultsScreen"
                component={ResultsScreen}
                style={styles.title}
                options={{ title: "Resultat de la Recherche" }}
            />
        </Stack.Navigator>

    )


}
export default HomeView;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: "column",
    },
    input: {
        height: 40,
        margin: 20,
        marginBottom: 30,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'lemonchiffon',
        borderColor: "grey",
        borderWidth: 1,
        paddingHorizontal: 10,
        fontSize: 20,
    },
    title: {
        fontSize: 30,
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 60
    },
})


