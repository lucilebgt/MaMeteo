
import React from 'react';
import About from './components/about';
import Search from './components/search';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {



  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="About" component={About} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;

