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
   flipVertical, flipHorizontal, rotateCW, rotateCCW
} from './Actions';
import images from './images'
import BoardTile from './BoardTile';
import Piece from './Piece';
import SoundManager from './SoundManager';

class GameScreen extends React.Component {
   constructor(props) {
      super(props)
      this.playerTurn = 0
      this.toggle = this.toggle.bind(this);
      this.initRotation()
      this.state = {
         isOpen: false,
      }
   }

   initRotation = () => {
      this.flippedV = true
      this.flippedH = true
      this.rotation = 0
      this.thetaX = new Animated.Value(180)
      this.thetaY = new Animated.Value(180)
      this.thetaZ = new Animated.Value(0)
   }

   selectPiece = (item) => {
      this.props.selectPiece(item)
      this.initRotation()
   }

   placePiece = () => {
      this.playerTurn = (this.playerTurn + 1) % 4
      this.props.removePiece(this.props.selectedPlayer.name, this.props.selectedPiece.id)
      this.props.selectPlayer(this.props.players[this.playerTurn])
      this.selectPiece(this.props.players[this.playerTurn].pieces[0])
   }

   componentDidMount = () => {
      this.props.selectPlayer(this.props.players[0])
      this.props.selectPiece(this.props.players[0].pieces[0])
      //this._animate()
   }

   toggle() {
      this.setState({
         isOpen: !this.state.isOpen,
      });
   }

   updateMenuState(isOpen) {
      this.setState({ isOpen });
   }

   quitGame = () => {
      SoundManager.PlayButtonPress();
      SoundManager.StopBackgroundMusic();
      this.props.navigation.navigate('MainMenuNav');
   }

   restartGame = () => {
      SoundManager.PlayButtonPress();
      this.toggle()
   }

   newGame = () => {
      SoundManager.PlayButtonPress();
      SoundManager.StopBackgroundMusic();
      this.props.navigation.navigate('SetupP1');
   }

   onCounterclockwisePress = () => {
      SoundManager.PlayButtonPress();
      if ((this.flippedH && this.flippedV) ||
         (!this.flippedH && !this.flippedV))
         this.rotateCounterClockwise()
      else
         this.rotateClockwise()

      this.props.rotateCCW()
   }

   rotateCounterClockwise = () => {
      this.rotation = (this.rotation - 1) % 5
      Animated.timing(this.thetaZ, {
         toValue: this.rotation,
         duration: 1000,
         easing: Easing.linear,
         useNativeDriver: true
      }).start(this.updateRotationCounterClockwise)
   }

   updateRotationCounterClockwise = () => {
      if (this.rotation === -4) {
         this.thetaZ.setValue(0)
         this.rotation = (this.rotation - 1) % 5
      }
   }

   onClockwisePress = () => {
      SoundManager.PlayButtonPress();
      if ((this.flippedH && this.flippedV) ||
         (!this.flippedH && !this.flippedV))
         this.rotateClockwise()
      else
         this.rotateCounterClockwise()

      this.props.rotateCW()
   }

   rotateClockwise = () => {
      this.rotation = (this.rotation + 1) % 5
      Animated.timing(this.thetaZ, {
         toValue: this.rotation,
         duration: 1000,
         easing: Easing.linear,
         useNativeDriver: true
      }).start(this.updateRotationClockwise)
   }

   updateRotationClockwise = () => {
      if (this.rotation === 4) {
         this.thetaZ.setValue(0)
         this.rotation = (this.rotation + 1) % 5
      }
   }

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

   getPieceImage = (id) => {
      return images[id]
   }

   render() {
      const menu = (<>
         <View style={{backgroundColor: 'white', flex: 1, borderWidth:1 }}>
            <View style={{alignItems:'center'}}><Text>Menu</Text></View>
            <TouchableOpacity style={[{marginTop: 20,borderTopWidth:2},styles.menuButtons]} onPress={this.restartGame}><Text>Restart</Text></TouchableOpacity>
            <TouchableOpacity style={styles.menuButtons} onPress={this.newGame}><Text>New Game</Text></TouchableOpacity>
            <TouchableOpacity style={[{borderBottomWidth: 2},styles.menuButtons]} onPress={this.quitGame}><Text>Quit</Text></TouchableOpacity>
            <View style={{flex:1}}></View>
            <TouchableOpacity style={[{borderTopWidth:2},styles.menuButtons]} onPress={() => { }}><Text>Surrender</Text></TouchableOpacity>
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
   menuButtons:{
      alignItems: 'flex-start', 
      justifyContent: 'center',  
      height: 50, 
      borderWidth:1, 
      borderRightWidth:0,
      borderLeftWidth:0,
   }
});

mapStateToProps = (state) => {
   const { players, selectedPiece, selectedPlayer } = state;
   return { players, selectedPiece, selectedPlayer };
}

mapDispatchToProps = (dispatch) => (
   bindActionCreators({
      selectPlayer, selectPiece, removePiece,
      flipVertical, flipHorizontal, rotateCW, rotateCCW
   }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen)