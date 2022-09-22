// All necessary imports are declared here

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Login from './Login';
import Home from './Home';
import Library from './Library';

const Stack = createNativeStackNavigator();

// Array of songs in the library with their respective properties
const songs = [
  {
    id: 0,
    artist: 'Gorillaz',
    url: require('./Assets/TestMusic/song1.mp3'),
    title: 'Feel Good Inc.',
    albumArt: require('./Assets/Images/Feel_Good_Inc.jpeg'),
  },
  {
    id: 1,
    artist: 'Rick Astley',
    url: require('./Assets/TestMusic/song2.mp3'),
    title: 'Never Gonna Give You Up',
    albumArt: require('./Assets/Images/Rickroll.jpeg'),
  },
  {
    id: 2,
    artist: 'Undertale',
    url: require('./Assets/TestMusic/Megalovania.mp3'),
    title: 'Megalovania',
    albumArt: require('./Assets/Images/Megalovania.jpeg'),
  },
  {
    id: 3,
    artist: 'Darude',
    url: require('./Assets/TestMusic/Sandstorm.mp3'),
    title: 'Sandstorm',
    albumArt: require('./Assets/Images/Sandstorm.png'),
  },
  {
    id: 4,
    artist: 'Discord',
    url: require('./Assets/TestMusic/Discord_Ping.mp3'),
    title: 'Discord Ping',
    albumArt: require('./Assets/Images/Discord_Ping.png'),
  },
  {
    id: 5,
    artist: 'Smash Mouth',
    url: require('./Assets/TestMusic/All_Star.mp3'),
    title: 'All Star',
    albumArt: require('./Assets/Images/All_Star.jpeg'),
  },
  {
    id: 6,
    artist: 'Foster The People',
    url: require('./Assets/TestMusic/Pumped_up_Kicks.mp3'),
    title: 'Pumped Up Kicks',
    albumArt: require('./Assets/Images/Pumped_Up_Kicks.jpeg'),
  },
  {
    id: 7,
    artist: 'a-ha',
    url: require('./Assets/TestMusic/Take_On_Me.mp3'),
    title: 'Take On Me',
    albumArt: require('./Assets/Images/Take_On_Me.jpeg'),
  },
  {
    id: 8,
    artist: 'Yes',
    url: require('./Assets/TestMusic/Roundabout.mp3'),
    title: 'Roundabout',
    albumArt: require('./Assets/Images/Roundabout.jpeg'),
  },
  {
    id: 9,
    artist: 'Getter Jaani',
    url: require('./Assets/TestMusic/Rockefeller_Street.mp3'),
    title: 'Rockefeller Street (Nightcore)',
    albumArt: require('./Assets/Images/Rockefeller_Street.jpeg'),
  },
  {
    id: 10,
    artist: 'Caramella Girls',
    url: require('./Assets/TestMusic/Caramelldansen.mp3'),
    title: 'Caramelldansen',
    albumArt: require('./Assets/Images/Caramelldansen.jpeg'),
  },
  {
    id: 11,
    artist: 'ACE',
    url: require('./Assets/TestMusic/Colony9.wav'),
    title: 'Colony 9',
    albumArt: require('./Assets/Images/Xenoblade.jpeg'),
  },
  {
    id: 12,
    artist: 'ACE',
    url: require('./Assets/TestMusic/TimeToFight.wav'),
    title: 'Time To Fight!',
    albumArt: require('./Assets/Images/Xenoblade.jpeg'),
  },
  {
    id: 13,
    artist: 'ACE',
    url: require('./Assets/TestMusic/EngageTheEnemy.wav'),
    title: 'Engage the Enemy',
    albumArt: require('./Assets/Images/Xenoblade.jpeg'),
  },
  {
    id: 14,
    artist: 'ACE',
    url: require('./Assets/TestMusic/GaurPlain.wav'),
    title: 'Gaur Plain',
    albumArt: require('./Assets/Images/Xenoblade.jpeg'),
  },
  {
    id: 15,
    artist: 'ACE',
    url: require('./Assets/TestMusic/AnObstacle.wav'),
    title: 'An Obstacle in Our Path',
    albumArt: require('./Assets/Images/Xenoblade.jpeg'),
  },
  {
    id: 16,
    artist: 'ACE',
    url: require('./Assets/TestMusic/FrontierVillage.wav'),
    title: 'Frontier Village',
    albumArt: require('./Assets/Images/Xenoblade.jpeg'),
  },
  {
    id: 17,
    artist: 'ACE',
    url: require('./Assets/TestMusic/OurNames.wav'),
    title: 'You Will Know Our Names',
    albumArt: require('./Assets/Images/Xenoblade.jpeg'),
  },
  {
    id: 18,
    artist: 'Avril Lavigne',
    url: require('./Assets/TestMusic/LosingGrip.mp3'),
    title: 'Losing Grip',
    albumArt: require('./Assets/Images/LetGo.jpeg'),
  },
  {
    id: 19,
    artist: 'Avril Lavigne',
    url: require('./Assets/TestMusic/Complicated.mp3'),
    title: 'Complicated',
    albumArt: require('./Assets/Images/LetGo.jpeg'),
  },
  {
    id: 20,
    artist: 'Avril Lavigne',
    url: require('./Assets/TestMusic/Sk8erBoi.mp3'),
    title: 'Sk8er Boi',
    albumArt: require('./Assets/Images/LetGo.jpeg'),
  },
  {
    id: 21,
    artist: 'Avril Lavigne',
    url: require('./Assets/TestMusic/ImWithYou.mp3'),
    title: 'Im With You',
    albumArt: require('./Assets/Images/LetGo.jpeg'),
  },
  {
    id: 22,
    artist: 'Avril Lavigne',
    url: require('./Assets/TestMusic/Mobile.mp3'),
    title: 'Mobile',
    albumArt: require('./Assets/Images/LetGo.jpeg'),
  },
  {
    id: 23,
    artist: 'Avril Lavigne',
    url: require('./Assets/TestMusic/Unwanted.mp3'),
    title: 'Unwanted',
    albumArt: require('./Assets/Images/LetGo.jpeg'),
  },
  {
    id: 24,
    artist: 'Avril Lavigne',
    url: require('./Assets/TestMusic/Tomorrow.mp3'),
    title: 'Tomorrow',
    albumArt: require('./Assets/Images/LetGo.jpeg'),
  },
  {
    id: 25,
    artist: 'Avril Lavigne',
    url: require('./Assets/TestMusic/Ordinary.mp3'),
    title: 'Anything But Ordinary',
    albumArt: require('./Assets/Images/LetGo.jpeg'),
  },
  {
    id: 26,
    artist: 'Avril Lavigne',
    url: require('./Assets/TestMusic/Cannonball.mp3'),
    title: 'Cannonball',
    albumArt: require('./Assets/Images/LoveSux.jpeg'),
  },
  {
    id: 27,
    artist: 'Avril Lavigne',
    url: require('./Assets/TestMusic/BoisLie.mp3'),
    title: 'Bois Lie',
    albumArt: require('./Assets/Images/LoveSux.jpeg'),
  },
  {
    id: 28,
    artist: 'Avril Lavigne',
    url: require('./Assets/TestMusic/BiteMe.mp3'),
    title: 'Bite Me',
    albumArt: require('./Assets/Images/LoveSux.jpeg'),
  },
  {
    id: 29,
    artist: 'Avril Lavigne',
    url: require('./Assets/TestMusic/HateMe.mp3'),
    title: 'Love It When You Hate Me',
    albumArt: require('./Assets/Images/LoveSux.jpeg'),
  },
  {
    id: 30,
    artist: 'Avril Lavigne',
    url: require('./Assets/TestMusic/LoveSux.mp3'),
    title: 'Love Sux',
    albumArt: require('./Assets/Images/LoveSux.jpeg'),
  },
  {
    id: 31,
    artist: 'Green Day',
    url: require('./Assets/TestMusic/AmericanIdiot.mp3'),
    title: 'American Idiot',
    albumArt: require('./Assets/Images/AmericanIdiot.jpeg'),
  },
  {
    id: 32,
    artist: 'Green Day',
    url: require('./Assets/TestMusic/Jesus.mp3'),
    title: 'Jesus of Suburbia',
    albumArt: require('./Assets/Images/AmericanIdiot.jpeg'),
  },
  {
    id: 33,
    artist: 'Green Day',
    url: require('./Assets/TestMusic/Holiday.mp3'),
    title: 'Holiday',
    albumArt: require('./Assets/Images/AmericanIdiot.jpeg'),
  },
  {
    id: 34,
    artist: 'Green Day',
    url: require('./Assets/TestMusic/BrokenDreams.mp3'),
    title: 'Boulevard of Broken Dreams',
    albumArt: require('./Assets/Images/AmericanIdiot.jpeg'),
  },
  {
    id: 35,
    artist: 'Green Day',
    url: require('./Assets/TestMusic/Waiting.mp3'),
    title: 'Are We The Waiting',
    albumArt: require('./Assets/Images/AmericanIdiot.jpeg'),
  },
  {
    id: 36,
    artist: 'Green Day',
    url: require('./Assets/TestMusic/Jimmy.mp3'),
    title: 'St Jimmy',
    albumArt: require('./Assets/Images/AmericanIdiot.jpeg'),
  },
  {
    id: 37,
    artist: 'Green Day',
    url: require('./Assets/TestMusic/Novacaine.mp3'),
    title: 'Give Me Novacaine',
    albumArt: require('./Assets/Images/AmericanIdiot.jpeg'),
  },
  {
    id: 38,
    artist: 'Green Day',
    url: require('./Assets/TestMusic/Rebel.mp3'),
    title: 'Shes A Rebel',
    albumArt: require('./Assets/Images/AmericanIdiot.jpeg'),
  },
];

/*
This file is responsible for handling the use of multiple screens
All new pages should be added in the stack navigator below.
*/

// This is the main function that is called when the app is run
const App = () => {
  // This return statement is responsible for displaying the screens
  // It is made up of a stack that contains all the screens
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: () => null,
        }}>
        <Stack.Screen name="Login" component={Login} initialParams={{songs: songs}}/>
        <Stack.Screen name="Home" component={Home} initialParams={{songs: songs}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

/*
Note:
All relevant Assets are stored in the Assets folder
Music used in the app is stored in the Assets/TestMusic folder
Images used in the app are stored in the Assets/Images folder
Button Icons used in the app are stored in the Assets/Buttons folder
*/