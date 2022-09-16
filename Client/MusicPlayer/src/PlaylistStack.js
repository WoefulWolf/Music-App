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
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Playlists from './Playlists';
import ShowPlaylist from './ShowPlaylist';
import AddPlaylist from './AddPlaylist';
import AddSong from './AddSong';

const Stack = createNativeStackNavigator();

const LibraryStack = ({navigation, route}) => {
  const {userIDToken, userAccessToken, authUsername, userID, songs} = route.params;

  return (
      <Stack.Navigator 
        screenOptions={{
          header: () => null,
      }}>
        <Stack.Screen
          name="Playlists"
          component={Playlists}
          initialParams={{userIDToken, userAccessToken, authUsername, userID, songs}}
        />
        <Stack.Screen
          name="ShowPlaylist"
          component={ShowPlaylist}
        />
        <Stack.Screen
          name="AddPlaylist"
          component={AddPlaylist}
        />
        <Stack.Screen
          name="AddSong"
          component={AddSong}
          />
      </Stack.Navigator>
  );
};

export default LibraryStack;