
import React from 'react';
import About from './components/about';
import Search from './components/search';
import { TabNavigator } from 'react-navigation';

const Tab = TabNavigator({
  Search: { screen: Search },
  About: { screen: About }

})

export default function App() {
  return (
    <>
      <Tab />

    </>
  )
}

