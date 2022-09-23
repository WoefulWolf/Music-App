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

let PlaylistSongs=[];
let bFlag=false;
let noSongs=[];

const Playlists = ({navigation, route}) => {
  const [refresh,setRefresh]=useState(true);
  const [data, setData] = useState([]);

  // Variables needed for API calls
  const {userIDToken, authUsername, userID, Playlist_ID,songs,PlaylistName} = route.params;
  console.log("playlistID2:"+Playlist_ID);
  console.log(PlaylistName);
  const userAccessToken="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkVQeGNQb1dCZWdaQUJ4OFY1VEstMCJ9.eyJpc3MiOiJodHRwczovL2Rldi1tbW1ybzViNS51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjMwMjVmZmM4ZDc5ZjdkNTk1ODE1MjlkIiwiYXVkIjpbImh0dHBzOi8vc2RwLW11c2ljLWFwcC5oZXJva3VhcHAuY29tLyIsImh0dHBzOi8vZGV2LW1tbXJvNWI1LnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2NjM5MjAxNDQsImV4cCI6MTY2Mzk1NjE0NCwiYXpwIjoiSU0xaXpCbnF1S29mVk5zQVhYVVdjOVE2ZnNyMHJFUFMiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIn0.mH-hjIwpM18YDEuoJHL6jYMaf7ZhGoRgtBj9ukpikX7cy_-J0XD-E58Gz_GgI4GSgWYwuORRLLDTunq0cGliVyjSxcNt3Oha1jF_1TMRqc_4xmx6nF86O7eEhRnGJUaxrVshkjCn3V4GI_AC012XGI7Y1OdXWnwLlI3b_54wwRt19B0e9Uyd2vt0X0fruuHnP7Hn4GIKw3_5WQu5LVhvM89GHuUTz1b4TSZRf5ArtbDOhrNjRlS3s7MOw2Z-NNOVo-Wf4CUkySjl1X-daavWwxXtiwdtIuWsvrSexxC2VFa0WT9-EuoVCStlKg8Mt0rG0sdtBzE1lKvSOgUNHNneSQ";
  // API call to get all playlists
  const GetPlaylistSongs = async () => {
    fetch('https://sdp-music-app.herokuapp.com/api/private/', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + userAccessToken,
        request_type: 'GetPlaylistSongs',
        playlist_id: Playlist_ID,
        
      },
    })
      .then(response => response.json())
      .then(json => {
        noSongs.clear;
        console.log(json);
        //console.log(json[0].Album_Cover);
        console.log("Json length:"+json.length);
        bFlag=false;
        if(typeof json.length !== 'undefined'){
          setData(json);
          bFlag=true;
        }
        
        
        
      })
      .then(() => {
        if(bFlag==true){
          console.log("inside refresh");
          setRefresh(false);
        }
        else{
          for(var j=0;j<noSongs.length;j++){
            noSongs.shift();
          }
          let tempItem={
            id:0,
            Song_Name:"Oops no songs",//displays if no songs in db return
            albumArt:songs[0].albumArt
          }
          noSongs.push(tempItem);
          setData(noSongs);
        }
        
      })
      .catch(error => {
        console.log(error);
      });
  };

  // useEffect hook to call the API call function
  useEffect(() => {
    GetPlaylistSongs();
    setRefresh(false)
  }, []);

  // Function to render a loading icon if the data is not yet loaded
  if(refresh==true){//loading icon
    return(
      <SafeAreaView style={styles.body}>
        <ActivityIndicator size="large" color="#000000"/>
      </SafeAreaView>
    )
  }
  // Function to render the list of playlists
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
              <Text style={styles.backButtonText}>Playlists</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.addButtonView}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AddSong', {
                  userIDToken: userIDToken,
                  userAccessToken: userAccessToken,
                  authUsername: authUsername,
                  userID: userID,
                  songs: songs,
                  playlistID: Playlist_ID,
                });
              }}>
              <Image
                style={styles.addButton}
                source={require('./Assets/Buttons/plus-icon.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={data}//renders playlist
          showsVerticalScrollIndicator={false}
          style={styles.list}
          ListHeaderComponent={() => (
            <View style={styles.header}>
              
              <Text style={styles.headerText}>{PlaylistName}</Text>
            </View>
          )}
          renderItem={({item}) => (
            <View style={styles.playlist}>
              <TouchableOpacity
                >
                <View style={styles.songDetails}>
                <View>
                  
                  <Image style={styles.albumCover} source={{uri:item.Album_Cover}} />
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