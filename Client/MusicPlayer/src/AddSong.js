import React, {useEffect, useState} from 'react';
import {
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';
import ytdl from 'react-native-ytdl';

const Search = ({navigation, route}) => {
  // All necessary variables are declared here
  const {
    userIDToken,
    userAccessToken,
    authUsername,
    userID,
    songs,
    playlistID,
  } = route.params;
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [flatListTitle, setFlatListTitle] = useState('');
  const [songID, setSongID] = useState(null);
  const [refresh, setRefresh] = useState(false);

  // API call to add a song to a playlist
  const addSongToPlaylist = async song => {
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
        } else {
          Alert.alert(
            'Song added to playlist',
            'This song has been added to the playlist.',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
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

  // Process the search results
  const processSearchResults = async results => {
    let searchResults = [];
    let result = {};
    for (let i = 0; i < results.length; i++) {
      result = {
        id: results[i].Song_ID,
        title: results[i].Song_Name,
        artist: results[i].Artist_Name,
        album: results[i].Album_Name,
        albumCover: results[i].Album_Cover,
        // url: urls[0].url,
      };
      if (result.Album_Cover == null) {
        result.Album_Cover = './Assets/Images/Default_Cover.png';
      }
      searchResults.push(result);
    }
    setSearchResults(searchResults);
    setRefresh(!refresh);
    console.log('These are the results: ');
    console.log(searchResults);
  };

  // Function to make GET request to search
  // for songs by song name
  const searchSongs = async () => {
    fetch('https://sdp-music-app.herokuapp.com/api/private/', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + userAccessToken,
        request_type: 'SearchSongByName',
        song_name: searchText,
      },
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        // check if text contains error
        if (json['No results']) {
          setFlatListTitle('No Results');
        } else {
          setFlatListTitle('Results');
        }
        processSearchResults(json);
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Error', 'There was an error searching for songs.');
      });
  };

  // Render the UI for the search results
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
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchBarInput}
          placeholder="Search for songs to add."
          placeholderTextColor="#000000"
          onChangeText={newText => setSearchText(newText)}
          defaultValue={''}
          maxLength={30}
          ref={input => {
            this.textInput = input;
          }}
        />
        <TouchableOpacity
          onPress={() => {
            console.log(searchText);
            this.textInput.clear();
            searchSongs();
          }}>
          <Image
            style={styles.searchBarIcon}
            source={require('./Assets/Buttons/search-icon.png')}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={searchResults}
        showsVerticalScrollIndicator={false}
        style={styles.list}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerText}>{flatListTitle}</Text>
          </View>
        )}
        renderItem={({item}) => (
          <View style={styles.song}>
            <View style={styles.row}>
              <View style={styles.songDetails}>
                <View>
                  <Image
                    style={styles.albumCover}
                    source={{uri: item.albumCover}}
                  />
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
                    // console.log(item.id);
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
export default Search;

// Styles for the screen
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  searchBar: {
    backgroundColor: '#EEEEEE',
    borderRadius: 15,
    marginHorizontal: 20,
    marginTop: 15,
    flexDirection: 'row',
  },
  searchBarInput: {
    height: 40,
    width: 250,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 15,
  },
  searchBarIcon: {
    width: 20,
    height: 20,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 50,
    marginRight: 5,
  },
  list: {
    flex: 2,
    marginTop: 20,
    marginLeft: 20,
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
