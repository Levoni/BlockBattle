//-------------------------------------------------------------------------
// This component is responsible for rendering the game screen.
// Props: players (Players[]) - the list of the players in the current game
//        selectedPiece (Piece) - the piece that is readu to be placed
//        selectedPlayer (Player) - the player whos turn it is
//        selectPlayer (function) - used to select a player from the list
//             of players
//        selectPiece (function) - used to select a piece from the current
//             player
//        removePiece (function) - removes a piece from the current player,
//             and from the player in the list of players
//        flipVertical (function) - flips the selected piece vertically
//        flipHorizontal (function) - flips the selected piece horizontally
//        rotateCW (function) - rotates the selected piece clockwise
//        rotateCCW (function) - rotates the selected piece counter clockwise
//        updateSurrender (function) - updates the surrender attribute of the
//             player in the player list
//        reloadPlayers (function) - regenerates all of the players' lists
//             of pieces and surrender attributes
//        resetPlayers (function) - reset the players to the default list
//             of empty players
//-------------------------------------------------------------------------
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, StatusBar, Image, Animated, Easing } from 'react-native';
import GameBoard from './GameBoard'
import SideMenu from 'react-native-side-menu'
import PieceList from './PieceList';
import PieceControlButtons from './PieceControlButtons';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {
   selectPlayer, selectPiece, removePiece,
   flipVertical, flipHorizontal, rotateCW, rotateCCW,
   updateSurrender, reloadPlayers, resetPlayers
} from './Actions';
import images from './images'
import SoundManager from './SoundManager';
import { Octicons } from '@expo/vector-icons'

class GameScreen extends React.Component {
   // The state holds whether the side menu is open, and whether the board 
   //    needs to be reset
   // The playerTurn tracks the current players turn
   // The numRemainingPlayers is how many players haven't surrendered yet
   // reload first player is used to wait for the list of players to update
   //       before reloading the first player
   constructor(props) {
      super(props)
      this.playerTurn = 0
      this.numRemainingPlayers = 4
      this.reloadFirstPlayer = false
      this.toggleSideMenu = this.toggleSideMenu.bind(this);
      this.initRotation()
      this.state = {
         isOpen: false,
         reloadBoard: false
      }
      this.props.navigation.setParams({ sideMenu: this.toggleSideMenu })
   }

   // Displays a header with a menu icon used to open the side menu
   static navigationOptions = ({ navigation }) => {
      return {
         title: 'Block Battle',
         headerStyle: { height: 40, paddingTop: 0, marginTop: -20 },
         headerTitleStyle: {
            textAlign: 'center',
            flex: 1,
         },
         headerLeft: (
            <TouchableOpacity onPress={navigation.getParam('sideMenu')} style={{ paddingLeft: 10 }}>
               <Octicons
                  name={'three-bars'}
                  size={40}
               >
               </Octicons>
            </TouchableOpacity>
         ),
         headerRight: (
            <View style={{ flex: 1 }}></View>
         )
      }
   }

   // initializes the rotation of a piece
   initRotation = () => {
      this.flippedV = true
      this.flippedH = true
      this.rotation = 0
      this.thetaX = new Animated.Value(180)
      this.thetaY = new Animated.Value(180)
      this.thetaZ = new Animated.Value(0)
   }

   // selects the given piece
   selectPiece = (item) => {
      this.props.selectPiece(item)
      this.initRotation()
   }

   // called after the piece is placed in GameBoard.js
   // It removes the piece from the playerm annd changes turn
   placePiece = () => {
      this.props.removePiece(this.props.selectedPlayer.name, this.props.selectedPiece.id)
      if (this.props.selectedPlayer.pieces.length <= 1)
         this.updateSurrender()
      else {
         this.nextTurn()
         if (this.numRemainingPlayers === 1) {
            this.selectPiece(this.props.players[this.playerTurn].pieces[1])
         }
         else {
            this.props.selectPlayer(this.props.players[this.playerTurn])
            this.selectPiece(this.props.players[this.playerTurn].pieces[0])
         }
      }
   }

   // Selects the first player and piece at startup
   componentDidMount = () => {
      this.props.selectPlayer(this.props.players[0])
      this.props.selectPiece(this.props.players[0].pieces[0])
      this.refreshBoard = this.refreshBoard.bind(this)
      //this._animate()
   }

   // Sets the flag to clear the board
   refreshBoard = () => {
      this.setState({ reloadBoard: !this.state.reloadBoard })
   }

   // toggles the state of the side menu either open or closed
   toggleSideMenu() {
      this.setState({
         isOpen: !this.state.isOpen,
      });
   }

   // sets the side menu to the passed state
   updateMenuState(isOpen) {
      this.setState({ isOpen });
   }

   // Stops sound, clears players, and navigates to the main menu
   quitGame = () => {
      SoundManager.PlayButtonPress();
      SoundManager.StopBackgroundMusic();
      this.props.resetPlayers();
      this.props.navigation.navigate('MainMenuNav');
   }

   // Reloads the first player if needed, since the props may have been updated
   componentDidUpdate() {
      if (this.reloadFirstPlayer) {
         this.props.selectPlayer(this.props.players[0])
         this.props.selectPiece(this.props.players[0].pieces[0])
         this.playerTurn = 0
         this.reloadFirstPlayer = false
      }
   }

   // Reloads the selected players, sets flags to clear the board and update
   //       the selected player, and closes the side menu
   restartGame = () => {
      SoundManager.PlayButtonPress();
      this.props.reloadPlayers()
      this.reloadFirstPlayer = true
      this.numRemainingPlayers = 4
      this.refreshBoard()
      this.toggleSideMenu()
   }

   // Stops sounds, resets players, and navigates to the choosing first player screen
   newGame = () => {
      SoundManager.PlayButtonPress();
      SoundManager.StopBackgroundMusic();
      this.props.resetPlayers()
      this.props.navigation.navigate('SetupP1');
   }

   // Handles the click of the counter clockwise rotation button
   onCounterclockwisePress = () => {
      SoundManager.PlayButtonPress();
      if ((this.flippedH && this.flippedV) ||
         (!this.flippedH && !this.flippedV))
         this.rotateCounterClockwise()
      else
         this.rotateClockwise()

      this.props.rotateCCW()
   }

   // rotates the piece image counter clockwise
   rotateCounterClockwise = () => {
      this.rotation = (this.rotation - 1) % 5
      Animated.timing(this.thetaZ, {
         toValue: this.rotation,
         duration: 1000,
         easing: Easing.linear,
         useNativeDriver: true
      }).start(this.updateRotationCounterClockwise)
   }

   // updates the rotation from 360 to 0 to enable 
   //    continual rotation in the same direction
   updateRotationCounterClockwise = () => {
      if (this.rotation === -4) {
         this.thetaZ.setValue(0)
         this.rotation = (this.rotation - 1) % 5
      }
   }

   // Handles the click of the clockwise rotation button
   onClockwisePress = () => {
      SoundManager.PlayButtonPress();
      if ((this.flippedH && this.flippedV) ||
         (!this.flippedH && !this.flippedV))
         this.rotateClockwise()
      else
         this.rotateCounterClockwise()

      this.props.rotateCW()
   }

   // Rotate the piece image clockwise
   rotateClockwise = () => {
      this.rotation = (this.rotation + 1) % 5
      Animated.timing(this.thetaZ, {
         toValue: this.rotation,
         duration: 1000,
         easing: Easing.linear,
         useNativeDriver: true
      }).start(this.updateRotationClockwise)
   }

   // updates the rotation from 360 to 0 to enable 
   //    continual rotation in the same direction
   updateRotationClockwise = () => {
      if (this.rotation === 4) {
         this.thetaZ.setValue(0)
         this.rotation = (this.rotation + 1) % 5
      }
   }

   // Handles the click of the vertical flip button
   onVerticalFlipPress = () => {
      SoundManager.PlayButtonPress();
      rotation = 0
      if (this.flippedV)
         rotation = 0
      else {
         rotation = 180
      }
      Animated.timing(this.thetaX, {
         toValue: rotation,
         duration: 1000,
         easing: Easing.linear,
         useNativeDriver: true
      }).start();
      this.flippedV = !this.flippedV
      this.props.flipVertical()
   }

   // Handles the click of the horizontal flip button
   onHorizontalFlipPress = () => {
      SoundManager.PlayButtonPress();
      rotation = 0
      if (this.flippedH)
         rotation = 0
      else {
         rotation = 180
      }
      Animated.timing(this.thetaY, {
         toValue: rotation,
         duration: 1000,
         easing: Easing.linear,
         useNativeDriver: true
      }).start();
      this.flippedH = !this.flippedH
      this.props.flipHorizontal()
   }

   // gets the needed piece image
   getPieceImage = (id) => {
      return images[id]
   }

   // updates the playerTurn to the next non-surrendered player
   nextTurn = () => {
      this.playerTurn = (this.playerTurn + 1) % 4
      while (this.props.players[this.playerTurn].surrendered) {
         this.playerTurn = (this.playerTurn + 1) % 4
      }
   }

   // handles surrendering for the current player
   updateSurrender = () => {
      SoundManager.PlayButtonPress()
      surrenderedCount = this.props.players.reduce((accumulator, player) => {
         if (player.surrendered)
            return accumulator + 1
         else
            return accumulator
      }, 0)
      this.numRemainingPlayers -= 1

      if (surrenderedCount === 3)
         this.props.navigation.navigate('End');
      else {
         this.props.updateSurrender(true, this.playerTurn)
         this.nextTurn();
         this.props.selectPlayer(this.props.players[this.playerTurn])
         this.selectPiece(this.props.players[this.playerTurn].pieces[0])
      }
   }

   // renders the game screen
   render() {
      const menu = (<>
         <View style={{ backgroundColor: 'white', flex: 1, borderWidth: 1 }}>
            <View style={{ alignItems: 'center' }}><Text>Menu</Text></View>
            <TouchableOpacity style={[{ marginTop: 0, borderTopWidth: 2 }, styles.menuButtons]} onPress={this.restartGame}><Text>Restart</Text></TouchableOpacity>
            <TouchableOpacity style={styles.menuButtons} onPress={this.newGame}><Text>New Game</Text></TouchableOpacity>
            <TouchableOpacity style={[{ borderBottomWidth: 2 }, styles.menuButtons]} onPress={this.quitGame}><Text>Quit</Text></TouchableOpacity>
            <View style={{ flex: 1 }}></View>
            <TouchableOpacity style={[{ borderTopWidth: 2 }, styles.menuButtons]} onPress={this.updateSurrender}><Text>Surrender</Text></TouchableOpacity>
         </View>
      </>)

      return (
         <SideMenu menu={menu}
            isOpen={this.state.isOpen}
            onChange={isOpen => this.updateMenuState(isOpen)}
         >
            <View style={[styles.container, { backgroundColor: this.props.selectedPlayer.color }]}>
               <StatusBar hidden />
               <View style={styles.boardContainer}>
                  <GameBoard
                     selectedPiece={this.props.selectedPiece}
                     placePiece={this.placePiece}
                     reloadBoard={this.state.reloadBoard}
                     refresh={this.refreshBoard}
                  >
                  </GameBoard>
               </View>
               <View style={styles.pieceSelectionContainer}>
                  <View style={{
                     flex: 1,
                     paddingHorizontal: 10
                  }}>
                     <PieceList selectPiece={this.selectPiece} />
                  </View>
                  <View style={{ flex: 1, paddingHorizontal: 10 }}>
                     <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
                        <Animated.View style={{
                           transform: [
                              {
                                 rotateX: this.thetaX.interpolate({
                                    inputRange: [0, 180],
                                    outputRange: ['180deg', '0deg']
                                 })
                              },
                              {
                                 rotateY: this.thetaY.interpolate({
                                    inputRange: [0, 180],
                                    outputRange: ['180deg', '0deg']
                                 })
                              },
                              {
                                 rotate: this.thetaZ.interpolate({
                                    inputRange: [0, 1, 2, 3, 4],
                                    outputRange: ['0deg', '90deg', '180deg', '270deg', '360deg']
                                 })
                              },
                           ], height: '100%', width: '100%', alignContent: 'center', justifyContent: 'center'
                        }}>
                           <Image style={styles.image} source={this.getPieceImage(this.props.selectedPiece.id)} />
                        </Animated.View>
                     </View>
                     <PieceControlButtons
                        onCounterclockwisePress={this.onCounterclockwisePress}
                        onClockwisePress={this.onClockwisePress}
                        onVerticalFlipPress={this.onVerticalFlipPress}
                        onHorizontalFlipPress={this.onHorizontalFlipPress} />
                  </View>
               </View>
            </View>
         </SideMenu>
      );
   }
}

const testPiece = { tiles: [[0, 0], [0, 1], [1, 0]], color: 'red' }

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
   },

   boardContainer: {
      width: '100%',
      aspectRatio: 1,
   },

   tilesContainer: {
      flex: 1,
      height: '100%',
      width: '100%',
   },
   image: {
      maxWidth: '100%',
      maxHeight: '100%',
      resizeMode: 'contain',
      alignSelf: 'center'
   },
   rotate90: {
      transform: [
         { rotateX: '90deg' },
      ],
   },
   rotate180: {
      transform: [
         { rotateX: '180deg' },
      ],
   },
   rotate270: {
      transform: [
         { rotateX: '270deg' },
      ],
   },
   pieceSelectionContainer: {
      height: '100%',
      flex: 1,
      flexDirection: 'row',
   },
   menuButtons: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      height: 50,
      borderWidth: 1,
      borderRightWidth: 0,
      borderLeftWidth: 0,
   }
});

mapStateToProps = (state) => {
   const { players, selectedPiece, selectedPlayer } = state;
   return { players, selectedPiece, selectedPlayer };
}

mapDispatchToProps = (dispatch) => (
   bindActionCreators({
      selectPlayer, selectPiece, removePiece,
      flipVertical, flipHorizontal, rotateCW, rotateCCW,
      updateSurrender, reloadPlayers, resetPlayers
   }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen)