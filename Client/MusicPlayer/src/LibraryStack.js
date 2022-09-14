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
import Playlists from './Playlists';

const Stack = createNativeStackNavigator();

const LibraryStack = ({navigation, route}) => {
  const {userIDToken, userAccessToken, authUsername, userID} = route.params;

  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Library"
          component={Library}
          initialParams={{userIDToken, userAccessToken, authUsername, userID}}
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
          name="Playlists"
          component={Playlists}
        />
      </Stack.Navigator>
  );
};

export default LibraryStack;