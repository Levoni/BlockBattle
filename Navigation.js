//-------------------------------------------------------------------------
// This file is responsible for the navigation for the app.
// It contains a top level switch navigators with one switch navigator
// and one stack navigator in it. these two navigators contain several
// screens.
//-------------------------------------------------------------------------
import React from 'react';
import { createSwitchNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import GameScreen from './GameScreen'
import ScreenStart from './ScreenStart'
import ScreenP1 from './ScreenP1'
import ScreenP2 from './ScreenP2'
import ScreenP3 from './ScreenP3'
import ScreenP4 from './ScreenP4'
import ScreenConfirm from './ScreenConfirm'
import ScreenStatistics from './ScreenStatistics'
import OptionsScreen from './OptionsScreen'
import SoundScreen from './SoundScreen'
import UserSettingsScreen from './UserSettingsScreen'
import CreateUserScreen from './CreateUserScreen'
import ScreenEndGame from './ScreenEndGame'

// A stack navigator used to provide a header for the game screen
const GameScreenNavigator = createStackNavigator(
   {
      'GameScreen': GameScreen
   },
   {
      initialRouteName: 'GameScreen'
   }
)

// Switch navigator which holds screens relevant to playing a game
const SwitchSetupNavigator = createSwitchNavigator(
   {
      'SetupP1': ScreenP1,
      'SetupP2': ScreenP2,
      'SetupP3': ScreenP3,
      'SetupP4': ScreenP4,
      'Confirm': ScreenConfirm,
      'Game': GameScreenNavigator,
      'End': ScreenEndGame
   },
   {
      initialRouteName: 'SetupP1',
   }
);

// Stack navigator which holds screens relevant to options a and statistics
const StackMenuNav = createStackNavigator(
   {
      'MainMenu':
      {
         screen: ScreenStart,
         navigationOptions: ({ navigation }) => ({
            header: null
         })
      },
      'StatisticsScreen': ScreenStatistics,
      'OptionsMenu': OptionsScreen,
      'SoundScreen': SoundScreen,
      'UserSettingsScreen': UserSettingsScreen,
      'CreateUserScreen': CreateUserScreen
   },
   {
      initialRouteName: 'MainMenu'
   },
);

// The top level navigator that contains the other two navigators
const SwitchNavigator = createSwitchNavigator(
   {
      'MainMenuNav': StackMenuNav,
      'SetupNavigator': SwitchSetupNavigator,
   },
   {
      initialRouteName: 'MainMenuNav',
   }
);

const Navigator = createAppContainer(SwitchNavigator);

export default Navigator