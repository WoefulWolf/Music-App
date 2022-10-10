import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
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

let bFlag = false;
let noSongs = [];

const Playlists = ({navigation, route}) => {
  const [refresh, setRefresh] = useState(true);
  const [data, setData] = useState([]);

  // Variables needed for API calls
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
          setData(json);
          bFlag = true;
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
          setData(noSongs);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const generatePlaylistArray = async (dataArr, songsArr) => {
    let PlaylistSongs = [];
    console.log(data);
    for (let i = 0; i < dataArr.length; i++) {
      let youtubeURL = "https://www.youtube.com/watch?v=" + dataArr[i].Song_URL;
      console.log(youtubeURL);
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
      let tempItem = {
        id: dataArr[i].Song_ID,
        url: urls[0].url,
        title: dataArr[i].Song_Name,
        artist: dataArr[i].Artist_Name,
        albumArt: dataArr[i].Album_Cover,
      };
      PlaylistSongs.push(tempItem);
    }

    // for (let i = 0; i < dataArr.length; i++) {
    //   for (let j = 0; j < songsArr.length; j++) {
    //     if (dataArr[i].Song_ID == songsArr[j].id) {
    //       PlaylistSongs.push(songsArr[j]);
    //     }
    //   }
    // }
    return PlaylistSongs;
  };

  const getIndex = async (playlistArr, songID) => {
    for (let i = 0; i < playlistArr.length; i++) {
      if (playlistArr[i].id == songID) {
        return i;
      }
    }
  };

  // useEffect hook to call the API call function
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log(userAccessToken);
      getLikedID()
      // GetPlaylistSongs();
      setRefresh(false);
    });

    return unsubscribe;
  }, [navigation]);

  // Function to render a loading icon if the data is not yet loaded
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
        </View>
        <FlatList
          data={data} //renders playlist
          showsVerticalScrollIndicator={false}
          style={styles.list}
          ListHeaderComponent={() => (
            <View style={styles.header}>
              <Text style={styles.headerText}>Liked Songs</Text>
            </View>
          )}
          renderItem={({item}) => (
            <View style={styles.playlist}>
              <TouchableOpacity
                onPress={() => {
                   generatePlaylistArray(data, songs).then(PlaylistSongs => {
                    getIndex(PlaylistSongs, item.Song_ID).then(index => {
                      TrackPlayer.reset();
                      TrackPlayer.add(PlaylistSongs);
                      TrackPlayer.skip(index);
                      TrackPlayer.play();
                      navigation.navigate('Player', {songs : [1]});
                    });
                  });

                  // console.log(PlaylistSongs);
                  // console.log("This is the index")
                  // console.log(index);
                  // TrackPlayer.reset();
                  // TrackPlayer.add(PlaylistSongs);
                  // TrackPlayer.skip(index);
                  // TrackPlayer.play();
                  // navigation.navigate('Player');
                }}>
                <View style={styles.songDetails}>
                  <View>
                    <Image
                      style={styles.albumCover}
                      source={{uri: item.Album_Cover}}
                    />
                  </View>
                  <View>
                    <Text style={styles.songArtist}>{item.Song_Name}</Text>
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
export default Playlists;

// Stylesheet for the Playlists screen
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
  playlist: {
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 20,
  },
  songDetails: {
    flexDirection: 'row',
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 10,
  },
  songArtist: {
    paddingLeft: 10,
    color: '#000',
    fontSize: 20,
    marginTop: 10,
  },
  albumCover: {
    width: 50,
    height: 50,
  },
});
