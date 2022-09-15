import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const Playlists = ({navigation, route}) => {
  // Variables needed for API calls
  const {userIDToken, userAccessToken, authUsername, userID} = route.params;

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
      <View style={styles.backButtonView}>
        <TouchableOpacity onPress={() => {
          navigation.goBack();
        }}
        style={{flexDirection: 'row'}}>
          <Image style={styles.backButton} source={require('./Assets/Buttons/back-icon.png')} />
          <Text style={styles.backButtonText}>Playlist</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: '#fff',
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
});