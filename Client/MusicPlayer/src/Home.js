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

// Array of songs in the library with their respective properties

const songs = [
  {
    id: 0,
    artist: 'Gorillaz',
    url: require('./Assets/TestMusic/song1.mp3'),
    title: 'Feel Good Inc.',
    albumArt: require('./Assets/Images/Feel_Good_Inc.jpeg'),
    imageLink: './Assets/Images/Feel_Good_Inc.jpeg',
  },
  {
    id: 1,
    artist: 'Rick Astley',
    url: require('./Assets/TestMusic/song2.mp3'),
    title: 'Never Gonna Give You Up',
    albumArt: require('./Assets/Images/Rickroll.jpeg'),
    imageLink: './Assets/Images/Rickroll.jpeg',
  },
  {
    id: 2,
    artist: 'Undertale',
    url: require('./Assets/TestMusic/Megalovania.mp3'),
    title: 'Megalovania',
    albumArt: require('./Assets/Images/Megalovania.jpeg'),
    imageLink: './Assets/Images/Megalovania.jpeg',
  },
  {
    id: 3,
    artist: 'Darude',
    url: require('./Assets/TestMusic/Sandstorm.mp3'),
    title: 'Sandstorm',
    albumArt: require('./Assets/Images/Sandstorm.png'),
    imageLink: './Assets/Images/Sandstorm.png',
  },
  {
    id: 4,
    artist: 'Smash Mouth',
    url: require('./Assets/TestMusic/All_Star.mp3'),
    title: 'All Star',
    albumArt: require('./Assets/Images/All_Star.jpeg'),
    imageLink: './Assets/Images/All_Star.jpeg',
  },
  {
    id: 5,
    artist: 'Foster The People',
    url: require('./Assets/TestMusic/Pumped_up_Kicks.mp3'),
    title: 'Pumped Up Kicks',
    albumArt: require('./Assets/Images/Pumped_Up_Kicks.jpeg'),
    imageLink: './Assets/Images/Pumped_Up_Kicks.jpeg',
  },
  {
    id: 6,
    artist: 'a-ha',
    url: require('./Assets/TestMusic/Take_On_Me.mp3'),
    title: 'Take On Me',
    albumArt: require('./Assets/Images/Take_On_Me.jpeg'),
    imageLink: './Assets/Images/Take_On_Me.jpeg',
  },
  {
    id: 7,
    artist: 'Yes',
    url: require('./Assets/TestMusic/Roundabout.mp3'),
    title: 'Roundabout',
    albumArt: require('./Assets/Images/Roundabout.jpeg'),
    imageLink: './Assets/Images/Roundabout.jpeg',
  },
  {
    id: 8,
    artist: 'Getter Jaani',
    url: require('./Assets/TestMusic/Rockefeller_Street.mp3'),
    title: 'Rockefeller Street (Nightcore)',
    albumArt: require('./Assets/Images/Rockefeller_Street.jpeg'),
    imageLink: './Assets/Images/Rockefeller_Street.jpeg',
  },
  {
    id: 9,
    artist: 'Caramella Girls',
    url: require('./Assets/TestMusic/Caramelldansen.mp3'),
    title: 'Caramelldansen',
    albumArt: require('./Assets/Images/Caramelldansen.jpeg'),
    imageLink: './Assets/Images/Caramelldansen.jpeg',
  },
];

// function to set up the music player
const setupPlayer = async () => {
  await TrackPlayer.setupPlayer();

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

// main function of the app
const Home = ({route, navigation}) => {
  // all necessary variables are declared here
  const {songIndex} = route.params; // This is the index of the song that was clicked on the previous screen
  const [trackIndex, setTrackIndex] = useState(1);
  const [currentAlbumCover, setCurrentAlbumCover] = useState(
    require('./Assets/Images/Default_Cover.png'),
  ); // Used to set album cover on rendered UI
  const [currentTitle, setCurrentTitle] = useState('Song Name'); // Used to set song title on rendered UI
  const [currentArtist, setCurrentArtist] = useState('Artist Name'); // Used to set artist name on rendered UI
  const playbackState = usePlaybackState(); // Keeps track of the current playback state of the music player

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
    setupPlayer().then(() => {
      TrackPlayer.skip(songIndex);
      getImage();
      getName();
      TrackPlayer.play();
    });
    console.log(songIndex);

    return () => TrackPlayer.destroy();
  }, []);

  // The UI is rendered here
  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.backButtonImage}
            source={require('./Assets/Buttons/back-icon.png')}
          />
        </TouchableOpacity>
      </View>
      <Image style={styles.albumArt} source={currentAlbumCover} />
      <Text style={styles.songTitle}>{currentTitle}</Text>
      <Text style={styles.artist}>{currentArtist}</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            TrackPlayer.skipToPrevious(), getImage(), getName();
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
            TrackPlayer.skipToNext(), getImage(), getName();
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
