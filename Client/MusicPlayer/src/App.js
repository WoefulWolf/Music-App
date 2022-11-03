// All necessary imports are declared here

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import Login from './Login';
import Home from './Home';
import Library from './Library';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {LogBox} from 'react-native';

LogBox.ignoreAllLogs();

// Declare necessary variables here
const Stack = createNativeStackNavigator();
const buffer = 2;

// Empty array used for testing
const songs = [];

/*
This file is responsible for handling the use of multiple screens
All new pages should be added in the stack navigator below.
*/

// This is the main function that is called when the app is run
const App = () => {
  // function to set up the music player
  const setupPlayer = async () => {
    await TrackPlayer.setupPlayer({
      waitForBuffer: true,
      playBuffer: buffer,
      minBuffer: buffer * 2,
      maxBuffer: buffer * 2,
    });
    // await TrackPlayer.add(songs);
  };

  useEffect(() => {
    // Initialize player on start up
    setupPlayer().then(() => {
      console.log('Player setup');
    });
    return () => {
      TrackPlayer.destroy();
    };
  }, []);

  // This return statement is responsible for displaying the screens
  // It is made up of a stack that contains all the screens
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: () => null,
        }}>
        <Stack.Screen
          name="Login"
          component={Login}
          initialParams={{songs: songs}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          initialParams={{songs: songs}}
        />
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
