import React, { useEffect,useState } from 'react';
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


let arrPlaylists=[];

const Playlists = ({navigation, route}) => {
  const [refresh,setRefresh]=useState(true);
  const [data, setData] = useState([])

  // Variables needed for API calls
  const {userIDToken, authUsername, userID, songs} = route.params;
  const userAccessToken="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkVQeGNQb1dCZWdaQUJ4OFY1VEstMCJ9.eyJpc3MiOiJodHRwczovL2Rldi1tbW1ybzViNS51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjMwMjVmZmM4ZDc5ZjdkNTk1ODE1MjlkIiwiYXVkIjpbImh0dHBzOi8vc2RwLW11c2ljLWFwcC5oZXJva3VhcHAuY29tLyIsImh0dHBzOi8vZGV2LW1tbXJvNWI1LnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2NjM4Njk5ODksImV4cCI6MTY2MzkwNTk4OSwiYXpwIjoiSU0xaXpCbnF1S29mVk5zQVhYVVdjOVE2ZnNyMHJFUFMiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIn0.LUozoBTMDjtVMZKMKcOamxQavm_bCVos6MbX3BtoMPMvIyV5PA5CkP3BS7ATneH5APVR8ILDza_W3dyQerRV1ZtRDvp6TMp8MXEXtNZYnehFJNA2BzOIcoUgGZoRX_PGlao1X_uQ0Qj6S6grNQTe05K_CS7_CrHTIskv98ZRqTFXJiRa2JGp67w9NLEEvqNgtvUo7GHnoLHnULAm2f5OrwfjH8YUEpygAYWBr1wT-BD1Le7w4CPoDlXmCyOHDlg6gaht19VJhmWMMOHes2rupX1wyn1cTMsbRLMsaG71vFhv3vLXsI5_9fRQeSMEdMkq4Jtqsu8dIDE4VBWgQCsaUQ";
  // API call to get all playlists
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
        setData(json)
      })
      .then(() => {
        setRefresh(false);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const addPlaylists=({arrJson})=>{
    let arrTemp2=[];
    console.log(arrJson.length)
    for (let i=0;i<arrJson.length;i++){
      let tempItem={
        PlaylistID:arrJson[i].Playlist_ID,
        PlaylistName:arrJson[i].Playlist_Name,
      }
      arrTemp2.push(tempItem);
      return arrTemp2;
    }
  }

  useEffect(() => {
    getPlaylists();
    setRefresh(false)
  }, []);

  if(refresh==true){
    return(
      <SafeAreaView style={styles.body}>
        <ActivityIndicator size="large" color="#000000"/>
      </SafeAreaView>
    )
  }
  else if(refresh==false){
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
              <Text style={styles.backButtonText}>Library</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.addButtonView}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AddPlaylist', {
                  userIDToken: userIDToken,
                  userAccessToken: userAccessToken,
                  authUsername: authUsername,
                  userID: userID,
                  songs: songs,
                });

              }}>
              <Image
                style={styles.addButton}
                source={require('./Assets/Buttons/plus-icon.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            console.log(userID);
          }}>
          <Text>Hello, world!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ShowPlaylist', {
              userIDToken: userIDToken,
              userAccessToken: userAccessToken,
              authUsername: authUsername,
              userID: userID,
              songs: songs,
            });
          }}>
          <Text>View Playlist</Text>
        </TouchableOpacity>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          style={styles.list}
          ListHeaderComponent={() => (
            <View style={styles.header}>
              
              <Text style={styles.headerText}>Playlists</Text>
            </View>
          )}
          renderItem={({item}) => (
            <View style={styles.playlist}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ShowPlaylist', {
                    userIDToken: userIDToken,
                    userAccessToken: userAccessToken,
                    authUsername: authUsername,
                    userID: userID,
                    songs: songs,
                    Playlist_ID:item.Playlist_ID,
                    PlaylistName:item.Playlist_Name,
                  });              }}>
                <View style={styles.songDetails}>
                  <View>
                    <Text style={styles.songArtist}>{item.Playlist_Name}</Text>
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
  playlist: {
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 20,
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
});
