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
  const {userIDToken, userAccessToken, authUsername, userID, songs} =
    route.params;

  // UI for the library screen
  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.spacer}></View>
      <View style={styles.buttonView}>
        <View style={styles.buttonText}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Songs', {songs: songs});
            }}>
            <Text style={styles.button}>Songs</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonText}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Artists', {
                userIDToken: userIDToken,
                userAccessToken: userAccessToken,
                authUsername: authUsername,
                userID: userID,
                songs: songs,
              });
            }}>
            <Text style={styles.button}>Artists</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonText}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PlaylistStack', {
                userIDToken: userIDToken,
                userAccessToken: userAccessToken,
                authUsername: authUsername,
                userID: userID,
                songs: songs,
              });
            }}>
            <Text style={styles.button}>Playlists</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.recommendations}>
        <Text style={styles.recommendationsText}>Listen to:</Text>
        <Text style={styles.recommendationsText}>Your liked songs</Text>
        <View style={styles.imageView}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Songs', {songs: songs});
            }}>
            <Image
              style={styles.recommendationsImage}
              source={require('./Assets/Images/LikedSongs.png')}
            />
          </TouchableOpacity>
        </View>
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
  buttonText: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: 'rgba(158, 150, 150, .5)',
    paddingTop: 10,
    paddingLeft: 25,
    paddingBottom: 20,
  },
  button: {
    color: '#FF1655',
    fontSize: 25,
  },
  spacer: {
    paddingTop: 50,
  },
  buttonView: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  recommendations: {
    marginTop: 20,
    paddingTop: 20,
  },
  recommendationsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    paddingLeft: 35,
  },
  recommendationsImage: {
    width: 325,
    height: 325,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
