import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const Playlists = ({navigation, route}) => {
  // Variables needed for API calls
  const {userIDToken, userAccessToken, authUsername, userID} = route.params;

  // API call to create a playlist
  const createPlaylist = async () => {
    fetch('https://sdp-music-app.herokuapp.com/api/private/', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + accessToken,
        request_type: 'CreatePlaylist',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: userID,
        playlist_name: 'Placeholder',
      }),
    })
      .then(response => response.text())
      .then(text => {
        console.log(text);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // API call to get all playlists
  const getPlaylists = async () => {
    fetch('https://sdp-music-app.herokuapp.com/api/private/', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + accessToken,
        request_type: 'GetPlaylists',
        id: userID,
      },
    })
      .then(response => response.text())
      .then(text => {
        console.log(text);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // API call to add a song to a playlist
  const addSongToPlaylist = async () => {
    fetch('https://sdp-music-app.herokuapp.com/api/private/', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + accessToken,
        request_type: 'RegisterAccount',
        id: userID,
      },
      body: JSON.stringify({
        songID: '1',
        playlistID: '1',
      }),
    })
      .then(response => response.text())
      .then(text => {
        console.log(text);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.body}>
      <TouchableOpacity
        onPress={() => {
          console.log(userID);
        }}>
        <Text>Hello, world!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default Playlists;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
