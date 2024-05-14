import React from "react";

import {Colors} from './styles';
const {primary, tertiary} = Colors;

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from "./LoginScreen";
import SignupScreen from "./SignupScreen";
import ProfileScreen from "./ProfileScreen";
import LocationScreen from "./LocationScreen";
import ChatScreen from "./ChatScreen";
import CandyScreen from "./CandyScreen";

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'transparent'
        },
        headerTintColor: tertiary,
        headerTransparent: true,
        headerTitle: '',
        headerLeftContainerStyle: {
          paddingLeft: 20
        }
      }}
      initialRouteName="LoginScreen"
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen options={{headerTintColor: primary}} name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="LocationScreen" component={LocationScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="CandyScreen" component={CandyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
