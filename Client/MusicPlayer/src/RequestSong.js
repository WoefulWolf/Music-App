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

// This function sends the URL entered by the user to the API
const RequestSong = ({navigation, route}) => {
  // Variables needed for API calls
  const {userIDToken, userAccessToken, authUsername, userID} = route.params;
  const [url, setUrl] = useState('');

  // API call to request a song
  const reqSong = async songURL => {
    fetch('https://sdp-music-app.herokuapp.com/api/private/', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + userAccessToken,
        request_type: 'AddSongByURL',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        song_url: songURL,
      }),
    })
      .then(response => response.text())
      .then(text => {
        console.log(text);
        if (text.includes(`already exists`)) {
          Alert.alert(
            'Song already exists',
            'This song has been requested by a previous user.',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        } 
        else if (text.includes(`Invalid song_url`)) {
          Alert.alert(
            'Invalid URL',
            'Cannot process the URL.',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        }
        else {
          Alert.alert(
            'Success',
            'Your song has successfully been added to our library.',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        }
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

            lowerURL = url

            console.log('This is the URL we are checking: ' + lowerURL);

            // Here we ensure that the URL entered is in the correct format
            if (
              lowerURL.includes('https://www.youtube.com/watch') ||
              lowerURL.includes('https://m.youtube.com/watch') ||
              lowerURL.includes('https://music.youtube.com/watch') ||
              lowerURL.includes('https://youtu.be/')
            ) {
              console.log('Valid URL - Request sent');
              reqSong(lowerURL);

            } else {
              console.log('Invalid URL - Cannot make request');
              Alert.alert("Invalid URL", "Please enter a valid YouTube URL");
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
