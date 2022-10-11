import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Auth0 from 'react-native-auth0';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import ytdl from 'react-native-ytdl';

const auth0 = new Auth0({
  domain: 'dev-mmmro5b5.us.auth0.com',
  clientId: 'IM1izBnquKofVNsAXXUWc9Q6fsr0rEPS',
});

const Profile = ({navigation, route}) => {
  const {userIDToken, userAccessToken, authUsername, userID} = route.params;

  const getPlaylists = async () => {
    fetch('https://sdp-music-app.herokuapp.com/api/private/', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + userAccessToken,
        request_type: 'GetPlaylists',
      },
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        console.log('returns: ' + json);
      })
      .then(() => {
        setRefresh(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <Text style={{fontSize: 30, marginBottom: 10, color: '#000'}}>
        You are logged in as:
      </Text>
      <Text style={{fontSize: 30, marginBottom: 100, color: '#000'}}>
        {authUsername}
      </Text>

      <TouchableOpacity
        onPress={() => {
          // logout of Auth0
          auth0.webAuth
            .clearSession({})
            .then(success => {
              console.log(success);
              navigation.navigate('Login');
            })
            .catch(error => console.log(error));
          // getPlaylists();
        }}>
        <Text style={{color: '#000'}}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Profile;
