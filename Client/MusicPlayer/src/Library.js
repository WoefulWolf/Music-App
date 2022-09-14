// All imports from react-native, react and any other libraries are imported here

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

// Array of songs in the library with their respective properties
const songs = [
  {
    id: 0,
    artist: 'Gorillaz',
    url: require('./Assets/TestMusic/song1.mp3'),
    title: 'Feel Good Inc.',
    albumArt: require('./Assets/Images/Feel_Good_Inc.jpeg'),
  },
  {
    id: 1,
    artist: 'Rick Astley',
    url: require('./Assets/TestMusic/song2.mp3'),
    title: 'Never Gonna Give You Up',
    albumArt: require('./Assets/Images/Rickroll.jpeg'),
  },
  {
    id: 2,
    artist: 'Undertale',
    url: require('./Assets/TestMusic/Megalovania.mp3'),
    title: 'Megalovania',
    albumArt: require('./Assets/Images/Megalovania.jpeg'),
  },
  {
    id: 3,
    artist: 'Darude',
    url: require('./Assets/TestMusic/Sandstorm.mp3'),
    title: 'Sandstorm',
    albumArt: require('./Assets/Images/Sandstorm.png'),
  },
  {
    id: 4,
    artist: 'Discord',
    url: require('./Assets/TestMusic/Discord_Ping.mp3'),
    title: 'Discord Ping',
    albumArt: require('./Assets/Images/Discord_Ping.png'),
  },
  {
    id: 5,
    artist: 'Smash Mouth',
    url: require('./Assets/TestMusic/All_Star.mp3'),
    title: 'All Star',
    albumArt: require('./Assets/Images/All_Star.jpeg'),
  },
  {
    id: 6,
    artist: 'Foster The People',
    url: require('./Assets/TestMusic/Pumped_up_Kicks.mp3'),
    title: 'Pumped Up Kicks',
    albumArt: require('./Assets/Images/Pumped_Up_Kicks.jpeg'),
  },
  {
    id: 7,
    artist: 'a-ha',
    url: require('./Assets/TestMusic/Take_On_Me.mp3'),
    title: 'Take On Me',
    albumArt: require('./Assets/Images/Take_On_Me.jpeg'),
  },
  {
    id: 8,
    artist: 'Yes',
    url: require('./Assets/TestMusic/Roundabout.mp3'),
    title: 'Roundabout',
    albumArt: require('./Assets/Images/Roundabout.jpeg'),
  },
  {
    id: 9,
    artist: 'Getter Jaani',
    url: require('./Assets/TestMusic/Rockefeller_Street.mp3'),
    title: 'Rockefeller Street (Nightcore)',
    albumArt: require('./Assets/Images/Rockefeller_Street.jpeg'),
  },
  {
    id: 10,
    artist: 'Caramella Girls',
    url: require('./Assets/TestMusic/Caramelldansen.mp3'),
    title: 'Caramelldansen',
    albumArt: require('./Assets/Images/Caramelldansen.jpeg'),
  },
];

// main function of this screen
const Home = ({navigation, route}) => {
  const {userIDToken, userAccessToken, authUsername, userID} = route.params;

  // UI for the library screen
  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.spacer}></View>
      <View style={styles.buttonView}>
        <TouchableOpacity
        onPress={() => {
          navigation.navigate('Songs');
        }}
        >
          <Text style={styles.button}>Songs</Text>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={() => {
          navigation.navigate('Artists');
        }}
        >
          <Text style={styles.button}>Artists</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => {
          navigation.navigate('Playlists', {userIDToken: userIDToken, userAccessToken: userAccessToken, authUsername: authUsername, userID: userID});
        }}
        >
          <Text style={styles.button}>Playlists</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Home;

// Styles for the UI
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 75,
  },
  button:{
    color:'black',
    fontSize:25,
    borderBottomWidth:1,
    borderTopWidth:1,
    borderColor: 'rgba(158, 150, 150, .5)',
    paddingTop:5,
    paddingTop:5,
    paddingLeft:50,
  },
  spacer:{
    paddingTop:20,
  },
  buttonView:{
    paddingLeft:10,
    paddingRight:10,
  }
});
