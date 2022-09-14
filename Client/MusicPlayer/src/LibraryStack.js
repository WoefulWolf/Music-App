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

const Stack = createNativeStackNavigator();

const LibraryStack = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Library"
          component={Library}
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
      </Stack.Navigator>
  );
};

export default LibraryStack;