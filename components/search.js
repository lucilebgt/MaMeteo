import * as  React from 'react';
import { StyleSheet, TextInput, Button, Text, View, FlatList, Image, ActivityIndicator, FadeInView } from 'react-native';
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


        const [weatherData, setWeatherData] = React.useState(null);


        //= Requête de météo à chaque changement de ville
        React.useEffect(() => {

            const fetchWeather = async () => {
                try {
                    const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=065226c21b8d826696463ac947f8b12c`);

                    setWeatherData(response.data);

                } catch (error) {
                    console.error(error);
                }
            };
            fetchWeather();
        }, [city]);

        //= Afficher un indicateur de chargement pendant la récupération des données météorologiques
        if (!weatherData) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator color={"firebrick"} size={"large"} />
                </View>
            )
        }

        //= Processus de transformation des données météorologiques
        const weatherFound = weatherData.list.reduce((acc, day) => {
            const date = new Date(day.dt * 1000);
            const dayOfWeek = date.toLocaleString('fr-FR', { weekday: 'short', day: 'numeric', month: 'numeric' });
            const temperature = Math.floor(day.main.temp).toString().slice(0, 2);

            //= Récupérer les deux premiers chiffres de la température
            const weatherIcon = day.weather[0].icon;

            //= Vérifier si le jour n'existe pas déjà dans acc avant de l'ajouter
            if (!acc.find(item => item.dayOfWeek === dayOfWeek)) {
                acc.push({ dayOfWeek, temperature, weatherIcon });
            }

            return acc;
        }, []);

        return (<FadeInView>
            <View style={styles.container}>
                <Text style={[styles.title, styles.cityName]}>Météo {city}</Text>

                <FlatList>
                    style={styles.flatList}
                    data={weatherFound}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <>
                            {
                                index === '0' ? (
                                    <View
                                        style={styles.firstView}>
                                        <View style={styles.firstView.column}>
                                            <Image
                                                source={{ uri: `http://openweathermap.org/img/w/${item.weatherIcon}.png` }}
                                                style={styles.firstView.icon}
                                            />
                                            <Text style={styles.firstView.day}>{item.dayOfWeek}{item.currentDate}</Text>

                                            <Text style={styles.firstView.temperature}>{item.temperature}°C</Text>
                                        </View>
                                    </View>
                                ) : (
                                    < View
                                        style={styles.weatherItem}>
                                        <View style={styles.weatherItem}>
                                            <Image
                                                source={{ uri: `http://openweathermap.org/img/w/${item.weatherIcon}.png` }}
                                                style={styles.icon}
                                            />
                                            <Text style={styles.day}>{item.dayOfWeek}{item.currentDate}</Text>

                                            <Text style={styles.temperature}>{item.temperature}°C</Text>
                                        </View>
                                    </View>
                                )}
                        </>
                    )}
                </FlatList>
            </View >
        </FadeInView >
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
        width: '100%',
        backgroundColor: 'firebrick',
        borderBottomWidth: 1,
        borderBlockColor: '#202340',
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    flatList: {
        width: '100%',
    },
    day: {
        marginRight: 10,
        fontSize: 25,
        alignItems: "center",
        color: '#fff',
        fontWeight: 'bold',
    },
    icon: {
        width: 60,
        height: 60,
        alignItems: "flex-start",
    },
    temperature: {
        fontSize: 25,
        alignItems: "flex-end",
        color: '#fff',
        fontWeight: 'bold',
    },
    cityName: {
        backgroundColor: 'lemonchiffon',
        paddingHorizontal: '90',
        paddingVertical: 4,
    },
    firstView: {

        backgroundColor: '#e54b65',
        paddingVertical: 80,

        day: {

            fontSize: 25,
            alignItems: "flex-start",
            color: '#fff',
            fontWeight: 'bold',
        },
        icon: {
            width: 95,
            alignItems: "flex-start",
        },
        temperature: {
            fontSize: 45,
            alignItems: "flex-end",
            color: '#fff',
            fontWeight: 'bold',
        },
        column: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
        }
    },


})



