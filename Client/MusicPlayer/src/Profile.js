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
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <Text style={{fontSize: 30, marginBottom: 10, color: "#000"}}>You are logged in as:</Text>
      <Text style={{fontSize: 30, marginBottom: 100, color: "#000"}}>{authUsername}</Text>

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
        }}>
        <Text style={{color: "#000"}}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          const youtubeURL = 'https://www.youtube.com/watch?v=9boiT64sm0Q';
          const urls = await ytdl(youtubeURL, {
            // quality: 'lowest',
            // filter: "audioonly",
            requestOptions: {
              headers: {
                cookie: 'SIDCC=AEf-XMSTqdOOqVQhPeRSG0lg_v0JQdpgjSU3wlm8EYlZRQofecJTWxhaoj9aMabz6CCFd55HQmQ; __Secure-1PSIDCC=AEf-XMTuxI83mIEQ5jQQmPNJ35Db7VYH99zeP8blqfhhAYfIzOLoBSYofZ5EerqaqMxAx39rqg; __Secure-3PSIDCC=AEf-XMTdsRPz_93IWWwW7tmGNKjAih1orv8p3uG6Rdf8vJTFxhf6ZXyy300BYAFaltw3l8jX5g; PREF=f6=40000080&tz=Africa.Johannesburg&f4=4000000; YSC=72RSxWR99tM; APISID=_MhT0CG7nUuF42iJ/AUUamKnSwpAcYkgfP; HSID=AOgShjL-bdGhPYguR; SAPISID=9wQdQ612YFrwO8PU/ADByvMsm5Dzdmygm9; SID=Owj-0p8VHz0c76Fiq5Pmb2LETbiz2WdZNREUTvbVYvgsoK7xenDXFVcCXCdDJhFZZ4tTzw.; SSID=AoQGOLsofjbYAH4MU; __Secure-1PAPISID=9wQdQ612YFrwO8PU/ADByvMsm5Dzdmygm9; __Secure-1PSID=Owj-0p8VHz0c76Fiq5Pmb2LETbiz2WdZNREUTvbVYvgsoK7x7Ljzqlhwpd9QilqnEMkFtQ.; __Secure-3PAPISID=9wQdQ612YFrwO8PU/ADByvMsm5Dzdmygm9; __Secure-3PSID=Owj-0p8VHz0c76Fiq5Pmb2LETbiz2WdZNREUTvbVYvgsoK7xJFRZHgHRas3Qdmcmv8vBOA.; LOGIN_INFO=AFmmF2swQwIfL8s8n-jDfGdFYzXwrQxFfoOtTxxhXEsOariQZtqXlwIgKHLmF8bq5qs8MB8tJdhSx4uYQs_w6gIYnE2pPHzOvkM:QUQ3MjNmeDlRNVdSaGhiTVEyS2pra1RYNzdCMVQ5X0J1dlVlb2VDcVlGdkxLMm9meVVsSzEwMUJ4R25VRjVKLTdUdGNuREs1WXJjc19iSURZVkNhcHB5ZnJRSlBmRF9wclRlYkJ4dHEtTzdsbHFkWTJOdHUtcEEwazNFLWJoUElTZWhZNVZJTUwycTJFbVRFS3A4enEzZmVnZE1RMDkzaEZR; VISITOR_INFO1_LIVE=4IybVPnbCOM'
              },
            },
        });
          console.log(urls);
          TrackPlayer.reset();
          let song = {
            id: 0,
            artist: 'Test Artist',
            url: urls[0].url,
            title: 'Test Title',
            albumArt: require('./Assets/Images/Feel_Good_Inc.jpeg'),
          }
          TrackPlayer.add(song);
          TrackPlayer.play();
        }}>
        <Text style={{color: "#000"}}>Test Downloader</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Profile;
