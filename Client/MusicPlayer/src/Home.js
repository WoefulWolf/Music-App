import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  Text, 
  Image, 
  View,
} from 'react-native';

import Library from './Library';
import Player from './Player';

const Tab = createBottomTabNavigator();

export default function Home({navigation, route}) {

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
        name="Library"
        component={Library}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Image 
                source={require('./Assets/Buttons/library-icon.png')} 
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#7F055F' : '#000'
                }}
              />
              <Text style={{color: focused ? '#7F055F' : '#000', fontSize: 12, top: 5}}>Library</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Player"
        component={Player}
        initialParams={{songIndex: 0}}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Image 
                source={require('./Assets/Buttons/player-icon.png')} 
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#7F055F' : '#000'
                }}
              />
              <Text style={{color: focused ? '#7F055F' : '#000', fontSize: 12, top: 5}}>Player</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  )
}