import React, {useEffect, useState} from 'react';
import {
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';

const Search = ({navigation, route}) => {
  const {userIDToken, userAccessToken, authUsername, userID, songs} = route.params;
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [flatListTitle, setFlatListTitle] = useState('');

  // Process the search results 
  const processSearchResults = (results) => {
    let searchResults = [];
    let result = {};
    for (let i = 0; i < results.length; i++) {
      result = {
        id: results[i].Song_ID,
        title: results[i].Song_Name,
        artist: results[i].Artist_Name,
        album: results[i].Album_Name,
        albumCover: results[i].Album_Cover,
      };
      if (result.Album_Cover == null) {
        result.Album_Cover = './Assets/Images/Default_Cover.png';
      }
      searchResults.push(result);
    }
    setSearchResults(searchResults);
  }

  // Function to make GET request to search
  // for songs by song name
  const searchSongs = async () => {
    fetch('https://sdp-music-app.herokuapp.com/api/private/', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + userAccessToken,
        request_type: 'SearchSongByName',
        song_name: searchText,
      }
    })
      .then(response => response.text())
      .then(text => {
        console.log(text);
        setFlatListTitle('Results');
        processSearchResults(JSON.parse(text));
      })
      .catch(error => {
        console.log(error);
        Alert.alert(
          'Error',
          'There was an error searching for songs.',
        );
      });
  }

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchBarInput}
          placeholder="What do you want to listen to?"
          placeholderTextColor="#000000"
          onChangeText={newText => setSearchText(newText)}
          defaultValue={''}
          maxLength={30}
          ref={input => {this.textInput = input}}
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
            <TouchableOpacity
              onPress={() => {
                console.log("Pressed");
              }}>
              <View style={styles.songDetails}>
                <View>
                  <Image style={styles.albumCover} source={{uri: item.albumCover}} />
                </View>
                <View>
                  <Text style={styles.songTitle}>{item.title}</Text>
                  <Text style={styles.songArtist}>{item.artist}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};
export default Search;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    backgroundColor: '#EEEEEE',
    borderRadius: 15,
    marginHorizontal: 30,
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
});
