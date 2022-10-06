// All imports from react-native, react and any other libraries are imported here

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TouchableOpacityComponent,
  FlatList,
  ActivityIndicator,
} from 'react-native';
let bFlag = false;
var artists=[];
let noSongs = [];
var tempJSON=[];
// main function of this screen
const Artists = ({navigation, route}) => {
  const [refresh, setRefresh] = useState(true);
  const [data, setData] = useState([]);
  const {
    userAccessToken,
    userIDToken,
    authUsername,
    userID,
    songs,
  } = route.params;

  const getLikedID = async () => {
    fetch('https://sdp-music-app.herokuapp.com/api/private/', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + userAccessToken,
        request_type: 'GetLikedSongsID',
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        console.log("We return: " + json[0].Playlist_ID);
        GetPlaylistSongs(json[0].Playlist_ID);
        return json[0].Playlist_ID;
      })
      .catch(error => {
        console.log(error);
      });
  }
  // const userAccessToken="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkVQeGNQb1dCZWdaQUJ4OFY1VEstMCJ9.eyJpc3MiOiJodHRwczovL2Rldi1tbW1ybzViNS51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjMwMjVmZmM4ZDc5ZjdkNTk1ODE1MjlkIiwiYXVkIjpbImh0dHBzOi8vc2RwLW11c2ljLWFwcC5oZXJva3VhcHAuY29tLyIsImh0dHBzOi8vZGV2LW1tbXJvNWI1LnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2NjM5MjAxNDQsImV4cCI6MTY2Mzk1NjE0NCwiYXpwIjoiSU0xaXpCbnF1S29mVk5zQVhYVVdjOVE2ZnNyMHJFUFMiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIn0.mH-hjIwpM18YDEuoJHL6jYMaf7ZhGoRgtBj9ukpikX7cy_-J0XD-E58Gz_GgI4GSgWYwuORRLLDTunq0cGliVyjSxcNt3Oha1jF_1TMRqc_4xmx6nF86O7eEhRnGJUaxrVshkjCn3V4GI_AC012XGI7Y1OdXWnwLlI3b_54wwRt19B0e9Uyd2vt0X0fruuHnP7Hn4GIKw3_5WQu5LVhvM89GHuUTz1b4TSZRf5ArtbDOhrNjRlS3s7MOw2Z-NNOVo-Wf4CUkySjl1X-daavWwxXtiwdtIuWsvrSexxC2VFa0WT9-EuoVCStlKg8Mt0rG0sdtBzE1lKvSOgUNHNneSQ";
  // API call to get all playlists
  const GetPlaylistSongs = async (likedID) => {
    fetch('https://sdp-music-app.herokuapp.com/api/private/', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + userAccessToken,
        request_type: 'GetPlaylistSongs',
        playlist_id: likedID,
      },
    })
      .then(response => response.json())
      .then(json => {
        noSongs.clear;
        console.log(json);
        //console.log(json[0].Album_Cover);
        console.log('Json length:' + json.length);
        bFlag = false;
        if (typeof json.length !== 'undefined') {
          //setData(json);
          tempJSON=json;
          for (var j = 0; j <= artists.length; j++) {
            artists.shift();
          }
          bFlag = true;
          var bFlag2=false;
          for(var i=0;i<json.length;i++){
            bFlag2=false;
            for(var k=0;k<artists.length;k++){
              if(json[i].Artist_Name === artists[k].artist){
                bFlag2=true;
              }
            }
            if(bFlag2==false){
              let tempItem={
                artist:json[i].Artist_Name,
                albumArt:json[i].Album_Cover,
              }
              artists.push(tempItem);
              //console.log("songs length:"+songs.length);
            //console.log("artist length:"+artists.length);
              }
          }
          console.log(artists);
          setData(artists);
        }
      })
      .then(() => {
        if (bFlag == true) {
          console.log('inside refresh');
          setRefresh(false);
        } else {
          for (var j = 0; j < noSongs.length; j++) {
            noSongs.shift();
          }
          let tempItem = {
            id: 0,
            Song_Name: 'Oops no songs', //displays if no songs in db return
            albumArt: songs[0].albumArt,
          };
          noSongs.push(tempItem);
          //setData(noSongs);
          
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      //console.log(userAccessToken);
      getLikedID()
      // GetPlaylistSongs();
      setRefresh(false);
    });

    return unsubscribe;
  }, [navigation]);
  //const {songs} = route.params;
  // UI for the library screen
  // useEffect(() => {
    //console.log("----------------------------------------------------")
    
    
  // }, []);
  if (refresh == true) {
    //loading icon
    return (
      <SafeAreaView style={styles.body}>
        <ActivityIndicator size="large" color="#000000" />
      </SafeAreaView>
    );
  }
  // Function to render the list of playlists
  else if (refresh == false) {
    return (
      <SafeAreaView style={styles.body}>
        <View style={styles.backButtonView}>
          <TouchableOpacity onPress={() => {
            navigation.goBack();
          }}
          style={{flexDirection: 'row'}}>
            <Image style={styles.backButton} source={require('./Assets/Buttons/back-icon.png')} />
            <Text style={styles.backButtonText}>Library</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          style={styles.list}
          ListHeaderComponent={() => (
            <View style={styles.header}>
              
              <Text style={styles.headerText}>Artists</Text>
            </View>
          )}
          renderItem={({item}) => (
            <View style={styles.song}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ArtistSongs', {userIDToken:userIDToken, userAccessToken:userAccessToken, authUsername:authUsername, userID:userID,artistName:item.artist, songs:tempJSON});
                }}>
                <View style={styles.songDetails}>
                <View>
                  <Image style={styles.albumCover} source={item.albumArt} />
                </View>
                  <View>
                    <Text style={styles.songArtist}>{item.artist}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            
          )}
        />
      </SafeAreaView>
    );
  }
  
  
};
export default Artists;

// Styles for the UI
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 75,
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
    marginBottom: 2.5,
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
    paddingBottom:10,
    paddingTop:10,
    paddingLeft:10,
  },
  songArtist: {
    paddingLeft: 10,
    color: '#000',
    fontSize:20,
    marginTop:10,
  },
  albumCover: {
    width: 50,
    height: 50,
  },
  
});
