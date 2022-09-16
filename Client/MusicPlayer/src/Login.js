// All necessary imports are declared here

import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TouchableOpacityComponent,
} from 'react-native';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({
  domain: 'dev-mmmro5b5.us.auth0.com',
  clientId: 'IM1izBnquKofVNsAXXUWc9Q6fsr0rEPS',
});

const Login = ({navigation, route}) => {
  let accessToken, idToken, username, user_id, email;
  const {songs} = route.params;

  const [loggedIn, setLoggedIn] = useState(false);

  // Add a user to the database
  const addUserToDatabase = async _callback => {
    fetch('https://sdp-music-app.herokuapp.com/api/private/', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + accessToken,
        request_type: 'RegisterAccount',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: user_id,
        email: email,
        username: username,
      }),
    })
      .then(response => response.text())
      .then(text => {
        console.log(text);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // This function gets the user profile from
  // Auth0 to get their username, user_id, email and
  // login count
  const getUserProfile = async (accTok, _callback) => {
    auth0.auth
      .userInfo({token: accTok})
      .then(Json => {
        return Json;
      })
      .then(Json => {
        // username = String(Json['https://dev-mmmro5b5.us.auth0.com/nickname']);
        username = String(Json.nickname);
        // user_id = String(Json['https://dev-mmmro5b5.us.auth0.com/sub']);
        user_id = String(Json.sub);
        email = String(Json['email']);
        _callback();
      })
      .catch(console.error);
  };

  const toHome = () => {
    console.log("Successfully logged in");
    navigation.navigate('Home', {
      userIDToken: idToken,
      userAccessToken: accessToken,
      authUsername: username,
      userID: user_id,
      songs: songs,
    });
  };

  const onLogin = async _callback => {
    auth0.webAuth
      .authorize({
        scope: 'openid profile email',
        audience: 'https://sdp-music-app.herokuapp.com/',
      })
      .then(credentials => {
        accessToken = credentials.accessToken;
        idToken = credentials.idToken;
        setLoggedIn(true);
        _callback();
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
   onLogin(async function () {
    await getUserProfile(accessToken, async function () {
      await addUserToDatabase(toHome())
    })
   });
  }, []);

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Millions of songs.</Text>
        <Text style={styles.headingText}>Free on NotSpotify.</Text>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={async () => {
            await onLogin(async function () {
              await getUserProfile(accessToken, async function () {
                await addUserToDatabase(toHome());
              });
            });
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Sign up for free</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            toHome();
          }}>
          <Text>Continue without an account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Login;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  headingText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  buttonView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  button: {
    margin: 15,
    padding: 15,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: '#7F055F',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});
