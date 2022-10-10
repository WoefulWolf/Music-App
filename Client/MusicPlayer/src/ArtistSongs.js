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
var artistsSongs = [];

// main function of this screen
const Artists = ({navigation, route}) => {
  const [refresh, setRefresh] = useState(true);
  const [data, setData] = useState([]);
  const {
    userAccessToken,
    userIDToken,
    authUsername,
    userID,
  } = route.params;

  const getUrls = async (tempURL) =>{
    console.log("in get urls");
    console.log(tempURL);
    let youtubeURL = "https://www.youtube.com/watch?v=" + tempURL;
    console.log(youtubeURL);
    let urls = await ytdl(youtubeURL, {
      requestOptions: {
      headers: {
        cookie: 'SIDCC=AEf-XMSTqdOOqVQhPeRSG0lg_v0JQdpgjSU3wlm8EYlZRQofecJTWxhaoj9aMabz6CCFd55HQmQ; __Secure-1PSIDCC=AEf- XMTuxI83mIEQ5jQQmPNJ35Db7VYH99zeP8blqfhhAYfIzOLoBSYofZ5EerqaqMxAx39rqg; __Secure-3PSIDCC=AEf-XMTdsRPz_93IWWwW7tmGNKjAih1orv8p3uG6Rdf8vJTFxhf6ZXyy300BYAFaltw3l8jX5g; PREF=f6=40000080&tz=Africa.Johannesburg&f4=4000000; YSC=72RSxWR99tM; APISID=_MhT0CG7nUuF42iJ/AUUamKnSwpAcYkgfP; HSID=AOgShjL-bdGhPYguR; SAPISID=9wQdQ612YFrwO8PU/ADByvMsm5Dzdmygm9; SID=Owj-0p8VHz0c76Fiq5Pmb2LETbiz2WdZNREUTvbVYvgsoK7xenDXFVcCXCdDJhFZZ4tTzw.; SSID=AoQGOLsofjbYAH4MU; __Secure-1PAPISID=9wQdQ612YFrwO8PU/ADByvMsm5Dzdmygm9; __Secure-1PSID=Owj-0p8VHz0c76Fiq5Pmb2LETbiz2WdZNREUTvbVYvgsoK7x7Ljzqlhwpd9QilqnEMkFtQ.; __Secure-3PAPISID=9wQdQ612YFrwO8PU/ADByvMsm5Dzdmygm9; __Secure-3PSID=Owj-0p8VHz0c76Fiq5Pmb2LETbiz2WdZNREUTvbVYvgsoK7xJFRZHgHRas3Qdmcmv8vBOA.; LOGIN_INFO=AFmmF2swQwIfL8s8n-jDfGdFYzXwrQxFfoOtTxxhXEsOariQZtqXlwIgKHLmF8bq5qs8MB8tJdhSx4uYQs_w6gIYnE2pPHzOvkM:QUQ3MjNmeDlRNVdSaGhiTVEyS2pra1RYNzdCMVQ5X0J1dlVlb2VDcVlGdkxLMm9meVVsSzEwMUJ4R25VRjVKLTdUdGNuREs1WXJjc19iSURZVkNhcHB5ZnJRSlBmRF9wclRlYkJ4dHEtTzdsbHFkWTJOdHUtcEEwazNFLWJoUElTZWhZNVZJTUwycTJFbVRFS3A4enEzZmVnZE1RMDkzaEZR; VISITOR_INFO1_LIVE=4IybVPnbCOM'
        },
      },
    }).then(() => {
      console.log(urls);
      return urls[0].url;
    })
    
  }

  const generatePlaylistArray = async (dataArr, songsArr) => {
    let PlaylistSongs = [];
    //console.log(data);
    while (PlaylistSongs.length > 0) {
      PlaylistSongs.shift();
    }
    for (let i = 0; i < dataArr.length; i++) {
      let youtubeURL = "https://www.youtube.com/watch?v=" + dataArr[i].url;
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
        id: dataArr[i].id,
        url: urls[0].url,
        title: dataArr[i].title,
        artist: dataArr[i].artist,
        albumArt: dataArr[i].albumArt,
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

  const setupPlayer = async songs => {
    await TrackPlayer.setupPlayer();
    console.log(songs);
    // TrackPlayer.reset().then(()=>{
    //   TrackPlayer.add(songs);
    //})
    TrackPlayer.add(songs);
  };
  const getIndex = async (Arr, songID) => {
    for (let i = 0; i < Arr.length; i++) {
      if (Arr[i].id == songID) {
        return i;
      }
    }
  };
  const {songs} = route.params;
  const {artistName} = route.params;
  // UI for the library screen
  useEffect(() => {
  console.log('----------------------------------------------------');
  
  while (artistsSongs.length > 0) {
    artistsSongs.shift();
  }
  //adds the song information for specfic songs(ie. for certain artists)
  for (var i = 0; i < songs.length; i++) {
    if (songs[i].Artist_Name === artistName) {
      //console.log(songs[i].Song_URL);
      //let urlTest=getUrls(songs[i].Song_URL);
      //console.log(urlTest);
      let tempItem = {
        id: songs[i].Song_ID,
        artist: songs[i].Artist_Name,
        url: songs[i].Song_URL,
        title: songs[i].Song_Name,
        albumArt: songs[i].Album_Cover,
      };
      console.log(tempItem.url);
      artistsSongs.push(tempItem);
    }
  }
    }, []);

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
          <Text style={styles.backButtonText}>Artists</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={artistsSongs}
        showsVerticalScrollIndicator={false}
        style={styles.list}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerText}>{artistName}</Text>
          </View>
        )}
        renderItem={({item}) => (
          <View style={styles.song}>
            <TouchableOpacity
              onPress={() => {
                generatePlaylistArray(artistsSongs, songs).then(PlaylistSongs => {
                  getIndex(PlaylistSongs, item.id).then(index => {
                    TrackPlayer.reset();
                    TrackPlayer.add(PlaylistSongs);
                    TrackPlayer.skip(index);
                    TrackPlayer.play();
                    navigation.navigate('Player', {songs : [1]});
                  });
                });;
              }}>
              <View style={styles.songDetails}>
                <View>
                  <Image style={styles.albumCover} source={{uri: item.albumArt}} />
                </View>
                <View>
                  <Text style={styles.songTitle}>{item.title}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
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
    paddingLeft: 10,
    color: '#000',
    fontSize: 20,
    marginTop: 10,
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
