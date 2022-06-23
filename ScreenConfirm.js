//-------------------------------------------------------------------------
// Screen that display information for the four players, and gives option
// to continue to the game.
//-------------------------------------------------------------------------
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updatePlayer, updatePlayerName, updatePlayerColor } from './Actions';
import Constants  from 'expo-constants';
import SoundManager from './SoundManager';

class ScreenConfirm extends React.Component {

   // Navigates to screenP1
   NavP1 = () => {
      SoundManager.PlayButtonPress();
      this.props.navigation.navigate('SetupP1')
   }

   // Navigates to screenP2
   NavP2 = () => {
      SoundManager.PlayButtonPress();
      this.props.navigation.navigate('SetupP2')
   }

   // Navigates to screenP3
   NavP3 = () => {
      SoundManager.PlayButtonPress();
      this.props.navigation.navigate('SetupP3')
   }

   // Navigates to screenP4
   NavP4 = () => {
      SoundManager.PlayButtonPress();
      this.props.navigation.navigate('SetupP4')
   }

   // Navigates to the GameScreen
   NavGame = () => {
      SoundManager.PlayButtonPress();
      SoundManager.PlayBackgroundMusic();
      this.props.navigation.navigate('Game')
   }

   render() {
      return (
         <View style={styles.container}>
            <View style={styles.buttonGroup}>
            <Text>Players:</Text>
               <TouchableOpacity style={[styles.playerButton,{backgroundColor:this.props.players[0].color}]} onPress={this.NavP1}>
                  <Text>{this.props.players[0].name}</Text>
               </TouchableOpacity>
               <TouchableOpacity style={[styles.playerButton,{backgroundColor:this.props.players[1].color}]} onPress={this.NavP2}>
                  <Text>{this.props.players[1].name}</Text>
               </TouchableOpacity>
               <TouchableOpacity style={[styles.playerButton,{backgroundColor:this.props.players[2].color}]} onPress={this.NavP3}>
                  <Text>{this.props.players[2].name}</Text>
               </TouchableOpacity>
               <TouchableOpacity style={[styles.playerButton,{backgroundColor:this.props.players[3].color}]} onPress={this.NavP4}>
                  <Text>{this.props.players[3].name}</Text>
               </TouchableOpacity>
            </View>
            <View style={styles.submitView}>
               <TouchableOpacity style={styles.acceptButton} onPress={this.NavGame}>
                  <Text>Start Game</Text>
               </TouchableOpacity>
            </View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'stretch',
      paddingTop: Constants.statusBarHeight,
      paddingHorizontal:5,
   },

   playerButton: {
      flex:1,
      borderColor: 'black',
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
      margin:5
   },

   acceptButton: {
      flex:.5,
      borderColor: 'black',
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'space-around'
   },

   buttonGroup: {
      flex: 3,
      alignItems: 'stretch'
   },

   submitView: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent:'space-around'
   }


});


mapStateToProps = (state) => {
   const { colors, players } = state;
   return { colors, players };
 }
 
 mapDispatchToProps = (dispatch) => (
   bindActionCreators({ updatePlayer, updatePlayerColor, updatePlayerName }, dispatch)
 )
 
 export default connect(mapStateToProps, mapDispatchToProps)(ScreenConfirm)