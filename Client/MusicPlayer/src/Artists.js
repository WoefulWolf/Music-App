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

var artists=[];

// main function of this screen
const Artists = ({navigation, route}) => {
  const {songs} = route.params;
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
      <View style={styles.backButtonView}>
        <TouchableOpacity onPress={() => {
          navigation.goBack();
        }}
        style={{flexDirection: 'row'}}>
          <Image style={styles.backButton} source={require('./Assets/Buttons/back-icon.png')} />
          <Text style={styles.backButtonText}>Library</Text>
        </TouchableOpacity>
      </View>
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
                navigation.navigate('ArtistSongs', {artistName:item.artist, songs:songs});
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
  backButtonView: {
    marginLeft: 20,
    marginBottom: 20,
    flexDirection: 'row',
  },
  backButton: {
    width: 20,
    height: 20,
  },
  backButtonText: {
    color: '#000',
    fontSize: 20,
    marginLeft: 5,
    marginBottom: 10,
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
