import * as  React from 'react';
import { StyleSheet, TextInput, Button, Text, View, FlatList, ListItem, ActivityIndicator } from 'react-native';
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
        const apiKey = '065226c21b8d826696463ac947f8b12c';

        const [weatherData, setWeatherData] = React.useState([]);

        React.useEffect(() => {
            const fetchWeather = async () => {
                try {

                    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=7&appid=${apiKey}&units=metric`);

                    const cityWeather = response.data.list;
                    const iconWeather = [];

                    setWeatherData(cityWeather);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchWeather();
        }, [city]);

        if (!cityWeather) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator color={"firebrick"} size={"large"} />
                </View>
            );
        };

        return (
            <View>
                {weatherData.map((day, index) => (
                    <View key={index} style={styles.container}>
                        <Text style={styles.day}>{day.dayOfWeek}</Text>
                        <Image style={styles.icon}
                            source={{ uri: `http://openweathermap.org/img/w/${day.weatherIcon}.png` }}

                        />
                        <Text style={styles.temperature}>{day.temperature}°C</Text>
                    </View>
                ))}
            </View>
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
    weatherItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    day: {
        marginRight: 10,
        fontSize: 18,
    },
    icon: {
        width: 50,
        height: 50,
    },
    temperature: {
        fontSize: 18,
    },
})


