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
  {
    id: 11,
    artist: 'Caramella Girls',
    url: require('./Assets/TestMusic/Caramelldansen.mp3'),
    title: 'Caramelldansen',
    albumArt: require('./Assets/Images/Caramelldansen.jpeg'),
  },
];
var artists=[];

// main function of this screen
const Artists = ({navigation, route}) => {
  // UI for the library screen
  // useEffect(() => {
    //console.log("----------------------------------------------------")
    
    var bFlag=false;
    for(var i=0;i<songs.length;i++){
      bFlag=false;
      for(var k=0;k<artists.length;k++){
        if(songs[i].artist === artists[k].artist){
          bFlag=true;
      }
    }
      if(bFlag==false){
        let tempItem={
          artist:songs[i].artist,
          albumArt:songs[i].albumArt
        }
         artists.push(tempItem);
         //console.log("songs length:"+songs.length);
       //console.log("artist length:"+artists.length);
         }
      
      
    }
  // }, []);
  
  
  return (
    <SafeAreaView style={styles.body}>
      <FlatList
        data={artists}
        showsVerticalScrollIndicator={false}
        style={styles.list}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            
            <Text style={styles.headerText}>Artists</Text>
          </View>
        )}
        renderItem={({item}) => (
          <View style={styles.song}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ArtistSongs', {artistName:item.artist});
              }}>
              <View style={styles.songDetails}>
                <View>
                  <Image style={styles.albumCover} source={item.albumArt} />
                </View>
                <View>
                  <Text style={styles.songArtist}>{item.artist}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          
        )}
      />
    </SafeAreaView>
  );
};
export default Artists;

// Styles for the UI
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 75,
  },
  list: {
    flex: 2,
    marginBottom: 2.5,
  },
  header: {
    marginLeft: 20,
    paddingBottom: 5,
  },
  headerText: {
    fontSize: 30,
    color: '#000',
  },
  song: {
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 20,
  },
  songTitle: {
    fontSize: 18,
    paddingLeft: 10,
    color: '#000',
  },
  songDetails: {
    flexDirection: 'row',
    paddingBottom:10,
    paddingTop:10,
    paddingLeft:10,
  },
  songArtist: {
    paddingLeft: 10,
    color: '#000',
    fontSize:20,
    marginTop:10,
  },
  albumCover: {
    width: 50,
    height: 50,
  },
  
});
