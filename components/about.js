import React from "react";
import { StyleSheet, Text, View, Button } from 'react-native';

export default function About({ navigation }) {

    return (

        <View
            options={{
                flex: 1,
                alignItems: 'center',
                flexDirection: "column",
            }} >

            <Text style={style.title}> A propos de Lou Meteo</Text>

            <Text style={style.paragraph}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias a velit natus illum temporibus, iure consequuntur. Hic blanditiis laboriosam officia nihil delectus assumenda cupiditate! Soluta ad eum molestiae. Nisi, ipsum.
            </Text>
            <Text style={style.paragraph}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias a velit natus illum temporibus, iure consequuntur. Hic blanditiis laboriosam officia nihil delectus assumenda cupiditate! Soluta ad eum molestiae. Nisi, ipsum.
            </Text>

            {/* <ActivityIndicator style={style.view} color="blue" size="large" animating={true} /> */}

            <Button onPress={() => navigation.navigate('SearchScreen')} title="Rechercher" color="firebrick" fontColor="lemonchiffon" />
        </View >
    )
}
const style = StyleSheet.create({
    view: {
        margin: 20,
    },
    paragraph:
    {
        textAlign: "justify",
        margin: 30,
    },
    title: {
        fontSize: 22,
        marginBottom: 20,
        fontWeight: "bold",
        textAlign: 'center'
    }
})