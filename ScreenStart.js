import React from 'react';
import { Button, StyleSheet, TouchableOpacity, View, Text, StatusBar } from 'react-native';
import SoundManager from './SoundManager';

export default class ScreenStart extends React.Component {
   startGamePress = () => {
      SoundManager.PlayButtonPress();
      this.props.navigation.navigate('SetupNavigator');
   }
   optionsPress = () => {
      SoundManager.PlayButtonPress();
      this.props.navigation.navigate('OptionsMenu');
   }
   StatisticsPress = () => {
      SoundManager.PlayButtonPress();
      this.props.navigation.navigate('StatisticsScreen');
   }
   render() {
      return (

         <View style={styles.container}>
            <Text style={styles.titleText}>Block Battle</Text>
            <Button onPress={this.startGamePress} title="Start Game" />
            <Button onPress={this.optionsPress} title="Options" />
            <Button onPress={this.StatisticsPress} title="Statistics" />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-evenly',
   },

   boardContainer: {
      flex: 2,
      height: '100%',
      width: '100%',
   },

   tilesContainer: {
      flex: 1,
      height: '100%',
      width: '100%',
   },

   titleText: {
      fontSize: 40
   }

});