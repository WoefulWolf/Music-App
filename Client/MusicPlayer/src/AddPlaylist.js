import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
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

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.backButtonView}>
        <TouchableOpacity onPress={() => {
          navigation.goBack();
        }}
        style={{flexDirection: 'row'}}>
          <Image style={styles.backButton} source={require('./Assets/Buttons/back-icon.png')} />
          <Text style={styles.backButtonText}>Playlists</Text>
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