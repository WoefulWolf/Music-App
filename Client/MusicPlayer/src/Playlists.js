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
  const userAccessToken="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkVQeGNQb1dCZWdaQUJ4OFY1VEstMCJ9.eyJpc3MiOiJodHRwczovL2Rldi1tbW1ybzViNS51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjMwMjVmZmM4ZDc5ZjdkNTk1ODE1MjlkIiwiYXVkIjpbImh0dHBzOi8vc2RwLW11c2ljLWFwcC5oZXJva3VhcHAuY29tLyIsImh0dHBzOi8vZGV2LW1tbXJvNWI1LnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2NjMzMzUwOTAsImV4cCI6MTY2MzQyMTQ5MCwiYXpwIjoiSU0xaXpCbnF1S29mVk5zQVhYVVdjOVE2ZnNyMHJFUFMiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIn0.MbVd7Xr5UlMN8YvERONJytRS7Abavd0V7wOb9P802wLLhOQnKu9eacObZ7UY_zku6C9H9nCl2Hiu9J99KAzmqicyCncAAqJd1gkxKSGk4v3KyZIiIWhTc_w9Ok0NFfXQhHzS-5k4PiuMgum7YWZ98rgxljuQj47zGbdRIdEYbEkhjHN8gHcN6aB95lYVSRobhaq2iS_KQQbcqjBF3ebYt-FMvwrsjNfipgn5Dw6qWk8_CEnMyjvxjVHiz1YjCB5LPpqkj6vTvwQjjVc9odUigQD90rFs7gqViyXs85DP8Pyuwe_3Fee6Upzwd1_th8kiadYK9YwOTJExOZgCnRcI9Q";
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
                    Playlist_ID:item.PlaylistID,
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
