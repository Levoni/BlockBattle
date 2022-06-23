//-----------------------------------------------------------------------------
// Names:             Alex Bisbach, Matthew Burgess, Levon Swenson
// Course:            Mobile Applications
// Assignment:        Final Project
// File description:  OptionsScreen.js represents the main options screen
//                    from which a user can navigate to either sound options
//                    or user options.
//-----------------------------------------------------------------------------

import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Button } from 'react-native';
import SoundManager from './SoundManager';

//-----------------------------------------------------------------------------
// state: 
//         - none
// props:
//         - navigation - The navigation props passed by default by
//                        react-navigation
//-----------------------------------------------------------------------------
export default class OptionsScreen extends React.Component {
   static navigationOptions = ({ navigation }) => {
      return {
         title: 'Options',
         headerTitleStyle: {
            textAlign: 'center',
            flex: 1
         },
         headerRight: (
            <View style={{ flex: 1 }}></View>
         )
      }
   }

   //--------------------------------------------------------------------------
   // Navigates to the SoundScreen.
   //--------------------------------------------------------------------------
   toSound = () => {
      SoundManager.PlayButtonPress();
      this.props.navigation.navigate('SoundScreen');
   }

   //--------------------------------------------------------------------------
   // Navigates to the UserSettingsScreen.
   //--------------------------------------------------------------------------
   toUserSettings = () => {
      SoundManager.PlayButtonPress();
      this.props.navigation.navigate('UserSettingsScreen')
   }

   //--------------------------------------------------------------------------
   // Renders the OptionsScreen.
   //--------------------------------------------------------------------------
   render() {
      return (
         <View style={styles.container}>
            <TouchableOpacity style={styles.Button} onPress={() => this.toSound()}>
               <Text>Sound</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Button} onPress={() => this.toUserSettings()}>
               <Text>User</Text>
            </TouchableOpacity>
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      paddingHorizontal:10,
      paddingVertical: 10
   },
   Button: {
      borderColor: 'black',
      borderWidth: 1,
      alignItems: 'center',
      backgroundColor:'lightblue',
      justifyContent: 'space-around',
      height:40,
      margin: 5,
   },
});