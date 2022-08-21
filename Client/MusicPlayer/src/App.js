import React from 'react';
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

const onLogin = () => {
  auth0.webAuth
    .authorize({
      scope: 'openid profile email',
    })
    .then(credentials => {
      console.log(credentials);
    })
}

const HelloWorldApp = () => {
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
        <Text>Hello, world!</Text>
      </TouchableOpacity>
    </View>
  );
};
export default HelloWorldApp;
