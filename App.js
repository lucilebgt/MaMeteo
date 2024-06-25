
import React from 'react';
import About from './components/about';
import Search from './components/search';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const App = () => {


  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#a2273C',
            borderTopWidth: 1,
            borderColor: '#3f101c',
          },

          tabBarIndicatorStyle: {
            backgroundColor: '#fff',
            height: 3,
          },
          tabBarShowLabel: false,
          options: {
            tabBarPosition: 'bottom',
            tabBarPressColor: 'firebrick ',
            tabBarShowIcon: true,

            tabBarItemStyle: { width: 100 }
          },
        }}
      >
        < Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={30} color="lemonchiffon" />
            ),
          }}



        />
        <Tab.Screen
          name="A propos de l'application"
          component={About}
          options={{

            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="user-circle-o" size={30} color="lemonchiffon" />
            ),
            tabBarLabelStyle: {
              tabBarShowLabel: 'false',
            }
          }}
        />
      </Tab.Navigator>
    </NavigationContainer >
  )
}
export default App;

