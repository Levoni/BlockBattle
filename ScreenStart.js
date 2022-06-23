//-------------------------------------------------------------------------
// Screen that gives the option to start a game, navigate to options, and
// navigate to the statistics screen
//-------------------------------------------------------------------------
import React from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import SoundManager from './SoundManager';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addUser, editUserName, editUserColor } from './Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ScreenStart extends React.Component {
   componentDidMount = async () => {
      var usersJSON = await AsyncStorage.getItem("users");
      var users = JSON.parse(usersJSON);
      console.log(this.props.users)
      console.log(users)
      if(this.props.users.length == 0 && users) {
         users.forEach(element => {
            this.props.addUser(element);
         });
      }
      console.log(this.props.users)
      console.log(users)
      if(users == null || users.length == 0)
      {
         this.props.addUser({ name: 'Default', color: 'green', stats: { wins: 0, games: 0, points: 0 } });
      } 
      await AsyncStorage.setItem("users",users);
   }
   
   // Starts game by navigating to the first setup screen
   startGamePress = () => {
      SoundManager.PlayButtonPress();
      this.props.navigation.navigate('SetupNavigator');
   }

   // Navigates user to the options menu
   optionsPress = () => {
      SoundManager.PlayButtonPress();
      this.props.navigation.navigate('OptionsMenu');
   }

   // Navigates user to the statistics screen
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


const mapStateToProps = (state) => {
   const { users, colors } = state
   return { users, colors }
}

const mapDispatchToProps = dispatch => (
   bindActionCreators({
      addUser,
      editUserName,
      editUserColor
   }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(ScreenStart);