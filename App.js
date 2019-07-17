import React from 'react';
import { createAppContainer, createStackNavigator, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation';

import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Details from "./Details";

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home
  },
  Details: {
    screen: Details
  },
  About: {
    screen: About
  },
},{headerLayoutPreset: 'center'});

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: Home
  },

})

const DrawerNavigation = createDrawerNavigator({
  Home: {
    screen: Home
  },
});



const App = createAppContainer(AppNavigator);
export default App;
