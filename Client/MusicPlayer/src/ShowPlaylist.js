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
  const {userIDToken, userAccessToken, authUsername, userID, songs,Playlist_ID} = route.params;

  // API call to get a single playlist
  const getPlaylist = async () => {
    fetch('https://sdp-music-app.herokuapp.com/api/private/', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + accessToken,
        request_type: 'GetPlaylist',
        id: userID,
        playlist_id: "1",
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

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.ButtonView}>
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
            <Text style={styles.backButtonText}>Playlists</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.addButtonView}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AddSong', {
                userIDToken: userIDToken,
                userAccessToken: userAccessToken,
                authUsername: authUsername,
                userID: userID,
                songs: songs,
              });
            }}>
            <Image
              style={styles.addButton}
              source={require('./Assets/Buttons/plus-icon.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          console.log(userID);
        }}>
        <Text>Hello, world!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
          navigation.navigate('Player', {userIDToken: userIDToken, userAccessToken: userAccessToken, authUsername: authUsername, userID: userID});
        }}>
        <Text>Listen to playlist</Text>
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
  ButtonView: {
    marginLeft: 20,
    marginBottom: 20,
    flexDirection: 'row',
  },
  backButtonView: {
    flexDirection: 'row',
  },
  addButtonView: {
    marginLeft: 230,
  },
  backButton: {
    width: 20,
    height: 20,
  },
  addButton: {
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