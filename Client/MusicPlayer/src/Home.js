import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  Text, 
  Image, 
  View,
} from 'react-native';

import Library from './Library';
import Player from './Player';
import LibraryStack from './LibraryStack';
import Profile from './Profile';

// this file is responsible for creating the bottom tab navigator
// it is used to switch between the library and player screens

const Tab = createBottomTabNavigator();

// This is the main function that is called when the app is run
export default function Home({navigation, route}) {
  const {userIDToken, userAccessToken, authUsername, userID, songs} = route.params;

  return (
    <Tab.Navigator
    screenOptions={{
        tabBarHideOnKeyboard: true,
        header: () => null,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          height: 80,
          paddingBottom: 50
        }
      }
    }
    >
      <Tab.Screen
        name="LibraryStack"
        component={LibraryStack}
        initialParams={{userIDToken, userAccessToken, authUsername, userID, songs}}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Image 
                source={require('./Assets/Buttons/library-icon.png')} 
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#FF1655' : '#000'
                }}
              />
              <Text style={{color: focused ? '#FF1655' : '#000', fontSize: 12, top: 5}}>Library</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Player"
        component={Player}
        initialParams={{songIndex: 0, songs: songs}}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Image 
                source={require('./Assets/Buttons/player-icon.png')} 
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#FF1655' : '#000'
                }}
              />
              <Text style={{color: focused ? '#FF1655' : '#000', fontSize: 12, top: 5}}>Player</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={{userIDToken, userAccessToken, authUsername, userID, songs}}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Image 
                source={require('./Assets/Buttons/user-icon.png')} 
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#FF1655' : '#000'
                }}
              />
              <Text style={{color: focused ? '#FF1655' : '#000', fontSize: 12, top: 5}}>Profile</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  )
}