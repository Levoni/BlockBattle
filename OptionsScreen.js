import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Button } from 'react-native';
import SoundManager from './SoundManager';

export default class OptionsScreen extends React.Component {
   static navigationOptions = ({ navigation }) => {
      return {
         title: 'Options',
         headerTitleStyle: {
            textAlign: 'center',
            flex: 1
         },
         // headerLeft: (
         //    <View style={{ flex: 1 }}></View>
         // ),
         headerRight: (
            <View style={{ flex: 1 }}></View>
         )
      }
   }

   toSound = () => {
      SoundManager.PlayButtonPress();
      this.props.navigation.navigate('SoundScreen');
   }

   toColor = () => {
      SoundManager.PlayButtonPress();
      this.props.navigation.navigate('BackgroundColorScreen')
   }

   toUserSettings = () => {
      SoundManager.PlayButtonPress();
      this.props.navigation.navigate('UserSettingsScreen')
   }

   render() {
      return (
         <View style={styles.container}>
            {/* <Button title="Sound" onPress={() => this.props.navigation.navigate('SoundScreen')} /> */}
            <TouchableOpacity style={styles.Button} onPress={() => this.toSound()}>
               <Text>Sound</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Button} onPress={() => this.toColor()}>
               <Text>Color</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Button} onPress={() => this.toUserSettings()}>
               <Text>User</Text>
            </TouchableOpacity>
            {/* <Button title="Color" onPress={() => this.props.navigation.navigate('BackgroundColorScreen')} />
            <Button title="User" onPress={() => this.props.navigation.navigate('UserSettingsScreen')} /> */}
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