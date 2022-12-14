// All imports from react-native, react and any other libraries are imported here

import React, {useEffect, useState, useRef} from 'react';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {useTrackPlayerProgress} from 'react-native-track-player/lib/hooks';
import {
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  TouchableOpacityComponent,
  StyleSheet,
  Image,
} from 'react-native';
import Slider from '@react-native-community/slider';

// constants declared here
const {height, width} = Dimensions.get('window');
const buffer = 2;

// main function of the app
const Home = ({route, navigation}) => {
  // all necessary variables are declared here
  const {position, buffered, duration} = useProgress();
  const [isSeeking, setIsSeeking] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const isMountedRef = useRef(false);
  const [seek, setSeek] = useState(0);
  const {songIndex, songs} = route.params;
  const [trackIndex, setTrackIndex] = useState(1);
  const [state, setState] = useState(true);
  const [currentAlbumCover, setCurrentAlbumCover] = useState(
    require('./Assets/Images/Default_Cover.png'),
  );
  const [currentTitle, setCurrentTitle] = useState('Song Name'); // Used to set song title on rendered UI
  const [currentArtist, setCurrentArtist] = useState('Artist Name'); // Used to set artist name on rendered UI
  const playbackState = usePlaybackState(); // Keeps track of the current playback state of the music player
  const [playerStatus, setPlayerStatus] = useState(false);

  // function to set up the music player
  const setupPlayer = async () => {
    // await TrackPlayer.setupPlayer({
    //   waitForBuffer: true,
    //   playBuffer: buffer,
    //   minBuffer: buffer * 2,
    //   maxBuffer: buffer * 2,
    // });
    // console.log(songs);
    // TrackPlayer.reset().then(()=>{
    //   TrackPlayer.add(songs);
    //})
    // await TrackPlayer.add(songs);
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

  // This function formats the time of the scrub bar
  const formatTime = secs => {
    let minutes = Math.floor(secs / 60);
    let seconds = Math.ceil(secs - minutes * 60);

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    if (seconds == 60) {
      seconds = '00';
      minutes = minutes + 1;
    }

    return `${minutes}:${seconds}`;
  };

  // This function is used to update the UI when the song changes
  const handleChange = val => {
    TrackPlayer.seekTo(val);
    TrackPlayer.play().then(() => {
      setTimeout(() => {
        setIsSeeking(false);
      }, 1000);
    });
  };

  // Check if player is playing
  const ifPlaying = async () => {
    const playerState = await TrackPlayer.getState();
    if (playerState == State.Playing) {
      setState(true);
    } else {
      setState(false);
    }
  };

  // This function is used to update the UI when the song changes
  // and setup the player on startup
  useEffect(() => {
    console.log("This is the playback state: " + playbackState);
    if (playbackState === 'paused' && !isSeeking) {
      setState(false);
    }
    else {
      setState(true);
    }
    if (songs.length != 0) {
      // ifPlaying();
      if (songIndex === 'undefined') {
        songIndex = 0;
      }
      // setupPlayer().then(() => {
      // TrackPlayer.skip(songIndex);
      // getImage();
      // getName();
      // TrackPlayer.play();
      // });
      console.log(songIndex);
      if (isMountedRef.current) {
        TrackPlayer.addEventListener(Event.PlaybackTrackChanged, () => {
          setIsSeeking(false);
        });
      }
    }
    //TrackPlayer.reset();
    //TrackPlayer.add(songs);
    return () => {
      isMountedRef.current = false;
      // TrackPlayer.destroy();
    };
  }, [playbackState]);

  // This function is used to update the UI when the song changes
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
      getImage();
      getName();
      console.log("Track Changed");
    }
  });

  // useTrackPlayerEvents([Event.PlaybackState], async event => {
  //   if (event.state === State.Playing) {
  //     setPlaying(true);
  //   } else {
  //     setPlaying(false);
  //   }
  // });

  // The UI is rendered here

  if (songs.length == 0) {
    return (
      <SafeAreaView style={styles.body}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#000',
          }}>
          No songs in queue.
        </Text>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.body}>
        <Image
          style={styles.albumArt}
          source={{uri: currentAlbumCover.toString()}}
        />
        <Text style={styles.songTitle}>{currentTitle}</Text>
        <Text style={styles.artist}>{currentArtist}</Text>
        <View style={styles.sliderView}>
          <Slider
            style={{
              width: 320,
              height: 40,
              Left: 0,
            }}
            minimumValue={0}
            value={isSeeking ? seek : position}
            onValueChange={value => {
              TrackPlayer.pause();
              setIsSeeking(true);
              setSeek(value);
            }}
            maximumValue={duration}
            minimumTrackTintColor="#000"
            onSlidingComplete={handleChange}
            maximumTrackTintColor="rgba(0, 0, 0, .5)"
            thumbTintColor={'#000'}
          />

          <View style={styles.timeView}>
            <Text style={styles.timers}>
              {formatTime(isSeeking ? seek : position)}
            </Text>
            <Text style={styles.timers}>{formatTime(duration)}</Text>
          </View>
        </View>
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
          {state == true ? (
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => {
                TrackPlayer.pause();
              }}>
              <Image
                style={{width: 30, height: 40}}
                source={require('./Assets/Buttons/pause-solid.png')}
              />
            </TouchableOpacity>
          ) : state == false ? (
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => {
                {
                  TrackPlayer.play();
                }
              }}>
              <Image
                style={{width: 30, height: 40}}
                source={require('./Assets/Buttons/play-solid.png')}
              />
            </TouchableOpacity>
          ) : null}
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
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              console.log('Pressed');
              setIsLooping(!isLooping);
              if (isLooping) {
                TrackPlayer.setRepeatMode(RepeatMode.Off);
              } else {
                TrackPlayer.setRepeatMode(RepeatMode.Track);
              }
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: isLooping ? '#FF1655' : '#000',
              }}>
              {isLooping ? 'Repeat: On' : 'Repeat: Off'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
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
  sliderView: {
    height: 30,
    marginTop: 40,
  },
  timers: {
    color: '#000',
    fontSize: 16,
  },
  timeView: {
    marginHorizontal: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  playButton: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 40,
    marginHorizontal: 35,
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
