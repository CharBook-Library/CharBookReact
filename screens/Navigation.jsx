import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import CrudScreen from './CrudScreen';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import ProfileScreen from './ProfileScreen';
import RegisterScreen from './RegisterScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Login"    component={LoginScreen}    />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home"     component={HomeScreen}     />
      <Stack.Screen name="Crud"     component={CrudScreen}     />
      <Stack.Screen name="Profile"  component={ProfileScreen}  />
    </Stack.Navigator>
  );
}