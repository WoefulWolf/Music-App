import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from './Login';
import Home from './Home';

const Stack = createNativeStackNavigator();

/*
This file is responsible for handling the use of multiple screens
All new pages should be added in the stack navigator below.
*/

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: () => null
        }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="Home"
          component={Home}
        />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
};

export default App;