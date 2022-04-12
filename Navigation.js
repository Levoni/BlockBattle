import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch, SectionList } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
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
import BackgroundColorScreen from './BackgroundColorScreen'
import UserSettingsScreen from './UserSettingsScreen'
import CreateUserScreen from './CreateUserScreen'

const SwitchSetupNavigator = createSwitchNavigator(
   {
      'SetupP1': ScreenP1,
      'SetupP2': ScreenP2,
      'SetupP3': ScreenP3,
      'SetupP4': ScreenP4,
      'Confirm': ScreenConfirm,
      'Game': GameScreen
   },
   {
      initialRouteName: 'SetupP1',
   }
);


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
      'BackgroundColorScreen': BackgroundColorScreen,
      'UserSettingsScreen': UserSettingsScreen,
      'CreateUserScreen': CreateUserScreen
   },
   {
      initialRouteName: 'MainMenu'
   },
);

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