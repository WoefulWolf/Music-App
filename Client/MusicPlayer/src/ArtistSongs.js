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
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
var artistsSongs = [];

// main function of this screen
const Artists = ({navigation, route}) => {
  const setupPlayer = async songs => {
    await TrackPlayer.setupPlayer();
    console.log(songs);
    // TrackPlayer.reset().then(()=>{
    //   TrackPlayer.add(songs);
    //})
    TrackPlayer.add(songs);
  };

  const {songs} = route.params;
  // UI for the library screen
  // useEffect(() => {
  console.log('----------------------------------------------------');
  const {artistName} = route.params;
  while (artistsSongs.length > 0) {
    artistsSongs.pop();
  }
  //adds the song information for specfic songs(ie. for certain artists)
  for (var i = 0; i < songs.length; i++) {
    if (songs[i].artist === artistName) {
      let tempItem = {
        id: songs[i].id,
        artist: songs[i].artist,
        url: songs[i].url,
        title: songs[i].title,
        albumArt: songs[i].albumArt,
      };
      artistsSongs.push(tempItem);
    }
  }
  //  }, []);

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.backButtonView}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{flexDirection: 'row'}}>
          <Image
            style={styles.backButton}
            source={require('./Assets/Buttons/back-icon.png')}
          />
          <Text style={styles.backButtonText}>Artists</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={artistsSongs}
        showsVerticalScrollIndicator={false}
        style={styles.list}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerText}>{artistName}</Text>
          </View>
        )}
        renderItem={({item}) => (
          <View style={styles.song}>
            <TouchableOpacity
              onPress={() => {
                console.log(artistsSongs);
                TrackPlayer.reset();
                TrackPlayer.add(artistsSongs);
                // TrackPlayer.skip(item.id);
                {
                  console.log(artistsSongs[0].id);
                  console.log(item.id);
                  console.log(item.id - artistsSongs[0].id);
                }
                TrackPlayer.skip(item.id - artistsSongs[0].id);
                TrackPlayer.play();
                // TrackPlayer.skip(item.id);
                // navigation.navigate('Player', {songIndex: item.id, songs: artistsSongs}); //takes you to the player
                navigation.navigate('Player');
              }}>
              <View style={styles.songDetails}>
                <View>
                  <Image style={styles.albumCover} source={item.albumArt} />
                </View>
                <View>
                  <Text style={styles.songTitle}>{item.title}</Text>
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
    paddingLeft: 10,
    color: '#000',
    fontSize: 20,
    marginTop: 10,
  },
  songDetails: {
    flexDirection: 'row',
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 10,
  },
  songArtist: {
    paddingLeft: 10,
    color: '#000',
    fontSize: 20,
    marginTop: 10,
  },
  albumCover: {
    width: 50,
    height: 50,
  },
});
