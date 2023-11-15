import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from './pages/Home';
import * as React from "react";
import { NavigationContainer } from '@react-navigation/native';

import AuthPage from './pages/Auth';

import 'react-native-gesture-handler';


import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();



export default function App() {



  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthPage">
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="AuthPage" component={AuthPage} />
      </Stack.Navigator>
      <StatusBar style="dark" />
    </NavigationContainer>
  );
}

