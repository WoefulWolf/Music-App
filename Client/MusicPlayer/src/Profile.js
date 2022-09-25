import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({
  domain: 'dev-mmmro5b5.us.auth0.com',
  clientId: 'IM1izBnquKofVNsAXXUWc9Q6fsr0rEPS',
});

const Profile = ({navigation, route}) => {
  const {userIDToken, userAccessToken, authUsername, userID} = route.params;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <Text style={{fontSize: 30, marginBottom: 10}}>You are logged in as:</Text>
      <Text style={{fontSize: 30, marginBottom: 100}}>{authUsername}</Text>

      <TouchableOpacity
        onPress={() => {
          // logout of Auth0
          auth0.webAuth
            .clearSession({})
            .then(success => {
              console.log(success);
              navigation.navigate('Login');
            })
            .catch(error => console.log(error));
        }}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Profile;
