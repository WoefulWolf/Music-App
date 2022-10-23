import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TouchableOpacityComponent,
  FlatList,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Profile from './Profile';
import RequestSong from './RequestSong';

// Stack to store the screens for the Playlists screen
const Stack = createNativeStackNavigator();

const LibraryStack = ({navigation, route}) => {
  const {userIDToken, userAccessToken, authUsername, userID, songs} =
    route.params;

  // Add the screens to the stack
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        initialParams={{
          userIDToken,
          userAccessToken,
          authUsername,
          userID,
          songs,
        }}
      />
      <Stack.Screen name="RequestSong" component={RequestSong} />
    </Stack.Navigator>
  );
};

export default LibraryStack;