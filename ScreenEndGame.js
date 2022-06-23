//-------------------------------------------------------------------------
// Screen that display the final scores for the four players, the winners
// and gives the option to exit to the main menu.  
//-------------------------------------------------------------------------
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Constants  from 'expo-constants';
import ScoreLabel from './Score'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { resetPlayers, updateStats } from './Actions';
import SoundManager from './SoundManager';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ScreenEndGame extends React.Component {
   // Creates the props and state for the component
   // state stores the string of winners
   constructor(props) {
      super(props)
      this.state = {
         winnersString: " "
      }
   }

   // Determines the winner based on player scores when screen loads
   componentDidMount = () => {
      this.determineWinner()
   }

   // Centers the title of navigation
   static navigationOptions = ({ navigation }) => {
      return {
         title: 'Results',
         headerTitleStyle: {
            textAlign: 'center',
            flex: 1
         }
      }
   }

   // Gets the count of remaining pieces for a single player
   // input: index - index of the player
   // output: remaining piece count
   getRemainingPieceAmount = (index) => {
      return this.props.players.map((player) => {
         return player.pieces.reduce((accumulator, currentPiece) => {
            return accumulator + currentPiece.tiles.length
         }, 0)
      })[index]
   }

   // Gets the count of remaining pieces for all players
   // output: Array of remaining piece counts
   getRemainingPieceAmounts = () => {
      return this.props.players.map((player) => {
         return player.pieces.reduce((accumulator, currentPiece) => {
            return accumulator + currentPiece.tiles.length
         }, 0)
      })
   }

   // Resets player information and navigates to the main menu
   exitGame = () => {
      this.UpdateStorage()
      this.props.resetPlayers()
      console.log('reset players')
      SoundManager.StopBackgroundMusic()
      SoundManager.PlayButtonPress()
      this.props.navigation.navigate('MainMenuNav')
   }

   // Determines the winners based on score and stores them as a string
   // in the redux store
   determineWinner = () => {
      const pieceAmounts = this.getRemainingPieceAmounts();
      const winners = pieceAmounts.reduce((accumulator, currentScore, index) => {
         if (currentScore === accumulator.score)
            return ({
               winners: [...accumulator.winners, index],
               score: currentScore
            })
         else if (currentScore < accumulator.score)
            return ({
               winners: [index],
               score: currentScore
            })
         else
            return accumulator
      }, { winners: [], score: 89 })
      const winnersString = winners.winners.reduce((accumulator, currentValue) => { return accumulator + this.props.players[currentValue].name + ',' }, "")
      this.updateStats(winners.winners, pieceAmounts)
      this.setState({ winnersString: winnersString.substring(0, winnersString.length - 1) });
   }

   // Updates the players stats
   // input: winners (string array) - array of names of winnners
   //        pieceAmounts (int array) - array of scores corresponding to
   //                                   each player
   updateStats = (winners, pieceAmounts) => {
      this.props.players.map((player, index) => {
         won = winners.filter(winner => winner === index).length > 0
         this.props.updateStats(won, pieceAmounts[index], player.name)
      })
   }

   UpdateStorage = (index, name, color) => {
      var users = [];
      this.props.users.forEach((element,innerIndex) => {
         users.push({
            name: index == innerIndex ? name : element.name,
            color: index == innerIndex ? color : element.color,
            stats: {
               wins: element.stats.wins,
               games: element.stats.games,
               points: element.stats.points
            }
         })
      });
      AsyncStorage.setItem("users",JSON.stringify(users));
      return true;
   }

   render() {
      return (
         <View style={styles.container}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
               <Text style={{ fontSize: 40 }}>Results!</Text>
               <Text style={{ fontSize: 20 }}>Winner(s): {this.state.winnersString}</Text>
            </View>
            <View style={{ flex: 3, alignContent: 'stretch' }}>
               <ScoreLabel color={this.props.players[0].color} label={this.props.players[0].name} num={this.getRemainingPieceAmount(0)} />
               <ScoreLabel color={this.props.players[1].color} label={this.props.players[1].name} num={this.getRemainingPieceAmount(1)} />
               <ScoreLabel color={this.props.players[2].color} label={this.props.players[2].name} num={this.getRemainingPieceAmount(2)} />
               <ScoreLabel color={this.props.players[3].color} label={this.props.players[3].name} num={this.getRemainingPieceAmount(3)} />
            </View>
            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
               <TouchableOpacity style={{ flex: .5, alignItems: 'center', justifyContent: 'space-around', borderWidth: 1, borderColor: 'black' }} onPress={this.exitGame}><Text>Main Menu</Text></TouchableOpacity>
            </View>
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'stretch',
      paddingTop: Constants.statusBarHeight,
   },
});


mapStateToProps = (state) => {
   const { users, players, } = state;
   return { users, players };
}

mapDispatchToProps = (dispatch) => (
   bindActionCreators({
      resetPlayers, updateStats
   }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(ScreenEndGame)