// All imports from react-native, react and any other libraries are imported here

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
  SafeAreaView,
  TouchableOpacity,
  TouchableOpacityComponent,
  StyleSheet,
  Image,
} from 'react-native';

// main function of the app
const Home = ({route, navigation}) => {
  // all necessary variables are declared here
  const {songIndex, songs} = route.params; // This is the index of the song that was clicked on the previous screen
  const [trackIndex, setTrackIndex] = useState(1);
  const [currentAlbumCover, setCurrentAlbumCover] = useState(
    require('./Assets/Images/Default_Cover.png'),
  ); // Used to set album cover on rendered UI
  const [currentTitle, setCurrentTitle] = useState('Song Name'); // Used to set song title on rendered UI
  const [currentArtist, setCurrentArtist] = useState('Artist Name'); // Used to set artist name on rendered UI
  const playbackState = usePlaybackState(); // Keeps track of the current playback state of the music player

  // function to set up the music player
const setupPlayer = async () => {
  await TrackPlayer.setupPlayer();
  console.log(songs);
 // TrackPlayer.reset().then(()=>{
 //   TrackPlayer.add(songs);
  //})
  await TrackPlayer.add(songs);
};

// function to update the music player
const togglePlayback = async () => {
  const currentTrack = await TrackPlayer.getCurrentTrack();

  if (currentTrack !== null) {
    if (playbackState == State.Paused) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
};

  // This function is used to update the UI when the song changes
  const getImage = async () => {
    let trackIndex = await TrackPlayer.getCurrentTrack();
    let trackObject = await TrackPlayer.getTrack(trackIndex);

    setCurrentAlbumCover(trackObject.albumArt);
    return trackObject.imageLink;
  };

  // This function is used to update the UI when the song changes
  const getName = async () => {
    let trackIndex = await TrackPlayer.getCurrentTrack();
    let trackObject = await TrackPlayer.getTrack(trackIndex);

    setCurrentTitle(trackObject.title);
    setCurrentArtist(trackObject.artist);
  };

  // This function is used to update the UI when the song changes
  // and setup the player on startup
  useEffect(() => {
    if (songIndex === 'undefined') {
      songIndex = 0;
    }
    setupPlayer().then(() => {
      TrackPlayer.skip(songIndex);
      getImage();
      getName();
      TrackPlayer.play();
    });
    console.log(songIndex);
    //TrackPlayer.reset();
    //TrackPlayer.add(songs);

    return () => TrackPlayer.destroy();
  }, [songIndex]);

  // This function is used to update the UI when the song changes
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
      getImage();
      getName();
    }
  });

  // The UI is rendered here
  return (
    <SafeAreaView style={styles.body}>
      <Image style={styles.albumArt} source={currentAlbumCover} />
      <Text style={styles.songTitle}>{currentTitle}</Text>
      <Text style={styles.artist}>{currentArtist}</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            TrackPlayer.skipToPrevious();
          }}>
          <Image
            style={{width: 40, height: 40}}
            source={require('./Assets/Buttons/backward-solid.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            TrackPlayer.play();
          }}>
          <Image
            style={{width: 30, height: 40}}
            source={require('./Assets/Buttons/play-solid.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => TrackPlayer.pause()}>
          <Image
            style={{width: 30, height: 40}}
            source={require('./Assets/Buttons/pause-solid.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            TrackPlayer.skipToNext();
          }}>
          <Image
            style={{width: 40, height: 40}}
            source={require('./Assets/Buttons/forward-solid.png')}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// styles for the UI
const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginBottom: 75,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  backButton: {},
  backButtonImage: {
    width: 20,
    height: 20,
    marginRight: 300,
  },
  button: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 40,
  },
  albumArt: {
    width: 250,
    height: 250,
    marginTop: 130,
    borderRadius: 10,
  },
  songTitle: {
    color: 'black',
    fontSize: 23,
    paddingTop: 20,
  },
  artist: {
    color: 'black',
    fontSize: 18,
  },
});
export default Home;