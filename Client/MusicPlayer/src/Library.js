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

// main function of this screen
const Home = ({navigation, route}) => {
  const {userIDToken, userAccessToken, authUsername, userID, songs} = route.params;

  // UI for the library screen
  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.spacer}></View>
      <View style={styles.buttonView}>
        <TouchableOpacity
        onPress={() => {
          navigation.navigate('Songs', {songs: songs});
        }}
        >
          <Text style={styles.button}>Songs</Text>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={() => {
          navigation.navigate('Artists', {songs: songs});
        }}
        >
          <Text style={styles.button}>Artists</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => {
          navigation.navigate('PlaylistStack', {userIDToken: userIDToken, userAccessToken: userAccessToken, authUsername: authUsername, userID: userID, songs: songs});
        }}
        >
          <Text style={styles.button}>Playlists</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Home;

// Styles for the UI
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 75,
  },
  button:{
    color:'black',
    fontSize:25,
    borderBottomWidth:1,
    borderTopWidth:1,
    borderColor: 'rgba(158, 150, 150, .5)',
    paddingTop:5,
    paddingTop:5,
    paddingLeft:50,
  },
  spacer:{
    paddingTop:20,
  },
  buttonView:{
    paddingLeft:10,
    paddingRight:10,
  }
});
