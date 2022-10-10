import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  Text, 
  Image, 
  View,
} from 'react-native';

import Player from './Player';
import Search from './Search';
import LibraryStack from './LibraryStack';
import Profile from './Profile';

// this file is responsible for creating the bottom tab navigator
// it is used to switch between the library and player screens

const Tab = createBottomTabNavigator();
const AccToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkVQeGNQb1dCZWdaQUJ4OFY1VEstMCJ9.eyJpc3MiOiJodHRwczovL2Rldi1tbW1ybzViNS51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjMzZGJhZjM5MjAyYTkyMDBjMDlhZmM2IiwiYXVkIjpbImh0dHBzOi8vc2RwLW11c2ljLWFwcC5oZXJva3VhcHAuY29tLyIsImh0dHBzOi8vZGV2LW1tbXJvNWI1LnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2NjUyMjgwMzUsImV4cCI6MTY2NTI2NDAzNSwiYXpwIjoiSU0xaXpCbnF1S29mVk5zQVhYVVdjOVE2ZnNyMHJFUFMiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIn0.mPmHrh6CwzzDzM64Y_foYej7gZyd4qwfmPDwHwxOBfwhqb3Fvz_a0QQy4nswe4mRIynS4jdOu5-pVmliE52NHGx25afVNraanOiRWKDpQ9Ul9wOH3BewIp55Ag0DNBaZ_QlrxJGyIDsdBLZlS1Ra9c1ArsIQQNkEU3BJuE1Zc_yjMgGeD0HIn2EC18t_LEfXKVDj0d40EedboxzEQi_HwGl5XkIPDHQ-X_g2jd0ea1G7NN4s8kMcnmEWmXwb79sBwWpA4IHbRGI3IPxHoIlYwv83knWl9MLcx2MkI5kAmRpRb8q8lRU0Wi5gPMEx_sWyj-kYy2i6MFmSWYm5E0JyHQ';

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
          paddingBottom: 50,
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
        name="Search"
        component={Search}
        initialParams={{userIDToken, userAccessToken, authUsername, userID, songs}}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Image 
                source={require('./Assets/Buttons/search-icon.png')} 
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#FF1655' : '#000'
                }}
              />
              <Text style={{color: focused ? '#FF1655' : '#000', fontSize: 12, top: 5}}>Search</Text>
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