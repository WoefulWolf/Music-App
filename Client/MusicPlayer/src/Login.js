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

const Login = ({navigation}) => {
  let accessToken, idToken, username, user_id;

  const [loggedIn, setLoggedIn] = useState(false);

  // Add a user to the database
  const addUserToDatabase = async () => {
    console.log(user_id);
    console.log(
      JSON.stringify({
        UserID: user_id,
        Username: username,
        Email: email,
      }),
    );
    fetch('https://harvest-stalkoverflow.herokuapp.com/api/private/', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + accessToken,
        RequestType: 'AddUser',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        UserID: user_id,
        Username: username,
        Email: email,
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

  // Update the date_last_accessed field in the database
  const addLoginToDatabase = async () => {
    fetch('https://harvest-stalkoverflow.herokuapp.com/api/private/', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + accessToken,
        RequestType: 'LoginUser',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        UserID: user_id,
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

  // Checks whether it is a user's first time using the app
  // and calls the appropriate function
  const addToDatabase = async _callback => {
    if (loginsCount == 1) {
      await addUserToDatabase();
    } else if (loginsCount != 1) {
      await addLoginToDatabase();
    }
    _callback();
  };

  // This function gets the user profile from
  // Auth0 to get their username, user_id, email and
  // login count
  const getUserProfile = async (accTok, _callback) => {
    auth0.auth
      .userInfo({token: accTok})
      .then(Json => {
        username = String(Json['https://dev-q8h6rzir:us:auth0:com/username']);
        user_id = String(Json['https://dev-q8h6rzir:us:auth0:com/user_id']);
        loginsCount = parseInt(
          Json['https://dev-q8h6rzir:us:auth0:com/loginsCount'],
        );
        email = String(Json['email']);
        _callback();
      })
      .catch(console.error);
  };

  const toHome = () => {
    navigation.navigate(
      'Home',
      // {
      //   userIDToken: idToken,
      //   userAccessToken: accessToken,
      //   authUsername: username,
      //   userID: user_id,
      // }
    );
  };

  const onLogin = () => {
    auth0.webAuth
      .authorize({
        scope: 'openid profile email',
      })
      .then(credentials => {
        console.log(credentials);
        setLoggedIn(true);
        toHome();
      });
  };

  // useEffect(() => {
  //   onLogin();
  // }, []);

  return (
    <SafeAreaView
      style={styles.body}>
        <View style={styles.heading}>
        <Text style={styles.headingText}>Millions of songs.</Text>
        <Text style={styles.headingText}>Free on NotSpotify.</Text>
        </View>
        <View style={styles.buttonView}>
      <TouchableOpacity
        onPress={() => {
          onLogin();
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
  }
})
