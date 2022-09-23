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
import Songs from './Songs';
import Library from './Library';
import Artists from './Artists';
import ArtistSongs from './ArtistSongs'
import PlaylistStack from './PlaylistStack';

// Stack to store the screens for the Library screen
const Stack = createNativeStackNavigator();

// This function adds the screens to the stack
const LibraryStack = ({navigation, route}) => {
  const {userIDToken, userAccessToken, authUsername, userID, songs} = route.params;

  return (
      <Stack.Navigator screenOptions={{
        header: () => null,
      }}>
        <Stack.Screen
          name="Library"
          component={Library}
          initialParams={{userIDToken, userAccessToken, authUsername, userID, songs}}
        />
        <Stack.Screen
          name="Songs"
          component={Songs}
        />
        <Stack.Screen
          name="Artists"
          component={Artists}
        />
        <Stack.Screen
          name="ArtistSongs"
          component={ArtistSongs}
          />
          <Stack.Screen
          name="PlaylistStack"
          component={PlaylistStack}
        />
      </Stack.Navigator>
  );
};

export default LibraryStack;