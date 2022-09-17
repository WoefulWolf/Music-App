import React, { useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Alert,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const Playlists = ({navigation, route}) => {
  // Variables needed for API calls
  const {userIDToken, userAccessToken, authUsername, userID, songs, playlistID} =
    route.params;
  const [songID, setSongID] = useState(null);

  // API call to add a song to a playlist
  const addSongToPlaylist = async (song) => {
    fetch('https://sdp-music-app.herokuapp.com/api/private/', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + userAccessToken,
        request_type: 'AddSongToPlaylist',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        playlist_id: playlistID,
        song_id: song,
      }),
    })
      .then(response => response.text())
      .then(text => {
        console.log(text);
        if (text.includes(`{"Database error":"Key (\\"Playlist_ID\\",`)) {
          Alert.alert(
            'Song already in playlist',
            'This song is already in this playlist.',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
          
        }
        else {
          Alert.alert(
            'Song added to playlist',
            'This song has been added to the playlist.',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          )
        }
      })
      .catch(error => {
        console.log(error);
        Alert.alert(
          'Error',
          'There was an error adding the song to the playlist.',
        );
      });
  };

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
          <Text style={styles.backButtonText}>Playlist</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={songs}
        showsVerticalScrollIndicator={false}
        style={styles.list}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerText}>Songs</Text>
          </View>
        )}
        renderItem={({item}) => (
          <View style={styles.song}>
            <View style={styles.row}>
              <View style={styles.songDetails}>
                <View>
                  <Image style={styles.albumCover} source={item.albumArt} />
                </View>
                <View>
                  <Text style={styles.songTitle}>{item.title}</Text>
                  <Text style={styles.songArtist}>{item.artist}</Text>
                </View>
              </View>
              <View style={styles.addButtonView}>
                <TouchableOpacity
                  onPress={() => {
                    addSongToPlaylist(item.id);
                  }}>
                  <Image
                    style={styles.addButton}
                    source={require('./Assets/Buttons/plus-icon.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
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
  list: {
    flex: 2,
    marginBottom: 50,
  },
  header: {
    marginLeft: 20,
    paddingBottom: 5,
  },
  headerText: {
    fontSize: 30,
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  song: {
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 20,
  },
  songTitle: {
    fontSize: 18,
    paddingLeft: 10,
    color: '#000',
  },
  songDetails: {
    flexDirection: 'row',
  },
  songArtist: {
    paddingLeft: 10,
    color: '#000',
  },
  albumCover: {
    width: 50,
    height: 50,
  },
  addButtonView: {
    marginRight: 30,
  },
  addButton: {
    width: 20,
    height: 20,
  },
});
