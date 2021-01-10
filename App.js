import React from 'react';
import ResultScreen from './ResultScreen';
import HomeScreen from './HomeScreen';
import SubmitScreen from './SubmitScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator(); 

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
          />
        <Stack.Screen name="ResultScreen" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
