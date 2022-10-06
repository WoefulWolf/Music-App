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
const AccToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkVQeGNQb1dCZWdaQUJ4OFY1VEstMCJ9.eyJpc3MiOiJodHRwczovL2Rldi1tbW1ybzViNS51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjMzZGJhZjM5MjAyYTkyMDBjMDlhZmM2IiwiYXVkIjpbImh0dHBzOi8vc2RwLW11c2ljLWFwcC5oZXJva3VhcHAuY29tLyIsImh0dHBzOi8vZGV2LW1tbXJvNWI1LnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2NjUwNTk3NTAsImV4cCI6MTY2NTA5NTc1MCwiYXpwIjoiSU0xaXpCbnF1S29mVk5zQVhYVVdjOVE2ZnNyMHJFUFMiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIn0.o9KCnr0uXjbydCf9_dLlpzOoGDavTJZd8WRethn0V8uFeCXNm9iHwl9iXuoFmgky37AmKiCgh0U6_E4CPg-fuFQjXwo0j70C2K-5qYD7Lg1hX4uUDJj3og82LbVeA50ifwkEqyeQGBiZYWBz3qoC2FU3-YtUft_RzI_ca7MvzXNY4X6g7eQZTEh9-b6sqCtGvyDbDwxRIz58nzDaO7bDce8QgeIDeqJcZfdKPyI3eNAStu368sXS-7BNEhkneO1f5Kw-LdHuYcZ8DpC0Jml6QHkeLtjGK7KaSUTnrQ8J9C7bWGRr2-k0ugTRcA_eaJl5tlEvjWyLlYLZTUmocMjdMg';

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
        initialParams={{userIDToken, userAccessToken: AccToken, authUsername, userID, songs}}
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
        initialParams={{userIDToken, userAccessToken: AccToken, authUsername, userID, songs}}
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
        initialParams={{userIDToken, userAccessToken: AccToken, authUsername, userID, songs}}
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