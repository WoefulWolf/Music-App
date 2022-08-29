import React, {useEffect, useState} from 'react';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableOpacityComponent,
} from 'react-native';

const songs = [
  {
    id: 1,
    artist: 'Gorillaz',
    url: require('./Assets/TestMusic/song1.mp3'),
    title: 'Gorillaz - Feel Good Inc',
  },
  {
    id: 2,
    artist: 'Rick Astley',
    url: require('./Assets/TestMusic/song2.mp3'),
    title: 'Rick Astley - Never Gonna Give You Up',
  },
];

const setupPlayer = async () => {
  await TrackPlayer.setupPlayer();

  await TrackPlayer.add(songs);
}

const togglePlayback = async () => {
  const currentTrack = await TrackPlayer.getCurrentTrack();

  if (currentTrack !== null) {
    if (playbackState == State.Paused) {
      await TrackPlayer.play();
    }
    else {
      await TrackPlayer.pause();
    }
  }
}

const Home = () => {
  const playbackState = usePlaybackState();

  useEffect(() => {
    setupPlayer();

    // return () => TrackPlayer.destroy();
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={() => TrackPlayer.play()}>
        <Text>Play</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => TrackPlayer.pause()}>
        <Text>Pause</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => TrackPlayer.skipToNext()}>
        <Text>Skip</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => TrackPlayer.skipToPrevious()}>
        <Text>Prev</Text>
      </TouchableOpacity>
      <Text>Hello, world!</Text>
    </View>
  );
};
export default Home;
