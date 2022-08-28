import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
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
    navigation.navigate('Home', 
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

  useEffect(() => {
    onLogin();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => {
          onLogin();
        }}>
        <Text>Get started</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          toHome();
        }}>
        <Text>Go to home page...</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Login;