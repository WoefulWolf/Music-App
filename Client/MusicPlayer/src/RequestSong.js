import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const RequestSong = ({navigation, route}) => {
  // Variables needed for API calls
  const {userIDToken, userAccessToken, authUsername, userID} =
    route.params;
  const [url, setUrl] = useState('');

  // API call to create a playlist
  const createPlaylist = async () => {
    fetch('https://sdp-music-app.herokuapp.com/api/private/', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + userAccessToken,
        request_type: 'CreatePlaylist',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        playlist_name: playlistName,
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

  // UI for user to create a playlist
  return (
    <SafeAreaView style={styles.body}>
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
          <Text style={styles.backButtonText}>Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Request a song.</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Enter a valid YouTube URL"
          placeholderTextColor="#bbbbbb"
          onChangeText={newText => setUrl(newText)}
          defaultValue={''}
          maxLength={60}
        />
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={() => {
            console.log('This is the URL: ' + url);
            // check if text contains either https://www.youtube.com/watch
            // or https://music.youtube.com/watch
            // or https://youtube.com/watch
            
            // first convert the url to lower case
            // setUrl(url.toLowerCase());
            // console.log('This is the URL: ' + url);
            // console.log(url.includes('https://www.youtube.com/watch'));

            if(url.toLowerCase().includes('https://m.youtube.com/watch') == false) {
                Alert.alert("Invalid URL", "URL should be of the form https://www.youtube.com/watch?v=VIDEO_ID");
            }
            else{
                Alert.alert("Success", "Your request has been submitted.");
            }

            // navigation.goBack();
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default RequestSong;

// Styles for the UI
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
  heading: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 50,
  },
  headingText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  inputView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 300,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  buttonView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  button: {
    margin: 15,
    padding: 15,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: '#FF1655',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});