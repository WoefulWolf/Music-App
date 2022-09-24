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

// main function of this screen
const Songs = ({navigation, route}) => {
  const {songs} = route.params;

  // UI for the library screen
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
        data={songs}
        showsVerticalScrollIndicator={false}
        style={styles.list}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerText}>Songs</Text>
          </View>
        )}
        renderItem={({item}) => (
          <View style={styles.song}>
            <TouchableOpacity
              onPress={() => {
                TrackPlayer.reset();
                TrackPlayer.add(songs);
                TrackPlayer.skip(item.id);
                TrackPlayer.play();
                navigation.navigate('Player');
              }}>
              <View style={styles.songDetails}>
                <View>
                  <Image style={styles.albumCover} source={item.albumArt} />
                </View>
                <View>
                  <Text style={styles.songTitle}>{item.title}</Text>
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
export default Songs;

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
  },
  songArtist: {
    paddingLeft: 10,
    color: '#000',
  },
  albumCover: {
    width: 50,
    height: 50,
  },
});
