// All necessary imports are declared here

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Login from './Login';
import Home from './Home';
import Library from './Library';

const Stack = createNativeStackNavigator();

/*
This file is responsible for handling the use of multiple screens
All new pages should be added in the stack navigator below.
*/

// This is the main function that is called when the app is run
const App = () => {
  // This return statement is responsible for displaying the screens
  // It is made up of a stack that contains all the screens
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: () => null,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

/*
Note:
All relevant Assets are stored in the Assets folder
Music used in the app is stored in the Assets/TestMusic folder
Images used in the app are stored in the Assets/Images folder
Button Icons used in the app are stored in the Assets/Buttons folder
*/