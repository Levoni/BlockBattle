//-------------------------------------------------------------------------
// This component is responsible for rendering the game board.
// Props: refresh (function) - the function to call after the board has
//                         refreshed by restarting the game
//        reloadBoard (boolean) - if true, the board will reload into an
//                         empty state
//        selectedPiece (Piece) - The piece that could potentially be placed
//        placePiece (function) - The function to be called when a piece is
//                         successfully placed
//-------------------------------------------------------------------------
import React from 'react';
import { StyleSheet, View, ListView, TouchableOpacity } from 'react-native';
import BoardTile from './BoardTile';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectPiece, removePiece, selectPlayer } from './Actions';
import SoundManager from './SoundManager';

const boardSize = 20

class GameBoard extends React.Component {
   // The state holds the board of tiles. 
   // The first round boolean is used for special placement rules
   //       in the first set of turns
   // refreshBoard is a function that is called after resetting the board
   constructor(props) {
      super(props)
      this.firstRound = true
      this.refreshBoard = props.refresh
      this.state = {
         board: this.createBoard(boardSize)
      }
   }

   // If the component is sent a value of true for reloadBoard,
   //       the board will reset itself
   componentWillReceiveProps(newProps) {
      if (newProps.reloadBoard === true) {
         this.setState({ board: this.createBoard(boardSize) })
         this.refreshBoard()
      }
   }

   // Creates the game board of tiles and assigns appropriate styles
   createBoard = (size) => {
      cols = [] // board[col]
      for (col = 0; col < size; col++) {
         rows = []
         for (row = 0; row < size; row++) {
            if (row === 0 && col === 0) { //Upper-left corner style
               rows.push(new BoardTile("topLeft"))
            }
            else if (row === size - 1 && col === 0) { //bottom-left corner style
               rows.push(new BoardTile("bottomLeft"))
            }
            else if (row === 0 && col === size - 1) { //Upper-right corner style
               rows.push(new BoardTile("topRight"))
            }
            else if (row === size - 1 && col === size - 1) { //bottom-right corner style
               rows.push(new BoardTile("bottomRight"))
            }
            else if (row === 0) { // non-corner top pieces
               rows.push(new BoardTile("top"))
            }
            else if (col === 0) { // non-corner left pieces
               rows.push(new BoardTile("left"))
            }
            else if (row === size - 1) { // non-corner bottom pieces
               rows.push(new BoardTile("bottom"))
            }
            else if (col === size - 1) { // non-corner right pieces
               rows.push(new BoardTile("right"))
            }
            else { // inner pieces
               rows.push(new BoardTile("inner"))
            }
         }
         cols.push(rows)
      }
      return cols
   }

   // Checks if it is the first round for special placement rules
   isFirstRound = () => {
      return (this.state.board[0][0].color === BoardTile.emptyColor
         || this.state.board[boardSize - 1][0].color === BoardTile.emptyColor
         || this.state.board[0][boardSize - 1].color === BoardTile.emptyColor
         || this.state.board[boardSize - 1][boardSize - 1].color === BoardTile.emptyColor)
   }

   // Used to place a piece on the temporary board during the first round and determine if it is a valid placement
   placeFirstRoundPiece = (newBoard, col, row) => {
      let placedInCorner = false
      let placedOnPiece = false
      this.props.selectedPiece.tiles.forEach((tile) => {
         if (row + tile[1] >= 0 && col + tile[0] >= 0 && row + tile[1] < boardSize && col + tile[0] < boardSize) {
            placedInCorner = placedInCorner || this.checkValidFirstPlace(row + tile[1], col + tile[0])
            if (this.state.board[row + tile[1]][col + tile[0]].color !== BoardTile.emptyColor) {
               placedOnPiece = true
            }
            newBoard[row + tile[1]][col + tile[0]].color = this.props.selectedPiece.color
         }
         else
            placedOnPiece = true
      })
      return { valid: placedInCorner && !placedOnPiece, board: newBoard }
   }

   // Used to place a piece on the temporary board during the rest of the game,
   //    and determine if it is a valid placement
   placeNormalRoundPiece = (newBoard, col, row) => {
      let placedOnPiece = false
      let placedKittyCorner = false
      let adjacentToOwnPiece = false
      this.props.selectedPiece.tiles.forEach((tile) => {
         if (row + tile[1] >= 0 && col + tile[0] >= 0 && row + tile[1] < boardSize && col + tile[0] < boardSize) {
            placedKittyCorner = placedKittyCorner || this.checkValidPlace(row + tile[1], col + tile[0])
            adjacentToOwnPiece = adjacentToOwnPiece || this.checkAdjacentToOwnPiece(row + tile[1], col + tile[0])
            if (this.state.board[row][col].color !== BoardTile.emptyColor) {
               placedOnPiece = true
            }
            newBoard[row + tile[1]][col + tile[0]].color = this.props.selectedPiece.color
         }
         else {
            placedOnPiece = true
         }
      })
      return { valid: placedKittyCorner && !placedOnPiece && !adjacentToOwnPiece, board: newBoard }
   }

   // Used to determine the type of placement needed, and places pieces to the real board if the 
   //    temporary board is valid
   placePiece = (col, row) => {
      SoundManager.PlayButtonPress();
      this.firstRound = this.isFirstRound()

      newBoard = JSON.parse(JSON.stringify(this.state.board))
      result = {}

      if (this.firstRound) {
         result = this.placeFirstRoundPiece(newBoard, col, row)
      }
      else {
         result = this.placeNormalRoundPiece(newBoard, col, row)
      }

      if (result.valid) {
         this.setState({ board: result.board })
         this.props.placePiece()
      }
   }

   // Checks the validity of a placement
   checkValidPlace(row, col) {
      if (col + 1 < boardSize && row + 1 < boardSize &&
         this.state.board[row + 1][col + 1].color === this.props.selectedPiece.color) {
         return true
      }
      if (col + 1 < boardSize && row - 1 >= 0 &&
         this.state.board[row - 1][col + 1].color === this.props.selectedPiece.color) {
         return true
      }
      if (row - 1 >= 0 && col - 1 >= 0 &&
         this.state.board[row - 1][col - 1].color === this.props.selectedPiece.color) {
         return true
      }
      if (row + 1 < boardSize && col - 1 >= 0 &&
         this.state.board[row + 1][col - 1].color === this.props.selectedPiece.color) {
         return true
      }
      return false
   }

   // Checks if a piece is directly adjacent to another piece of the same color, 
   // which isn't allowed
   checkAdjacentToOwnPiece(row, col) {
      if (row + 1 < boardSize &&
         this.state.board[row + 1][col].color === this.props.selectedPiece.color) {
         return true
      }
      if (col + 1 < boardSize &&
         this.state.board[row][col + 1].color === this.props.selectedPiece.color) {
         return true
      }
      if (row - 1 >= 0 &&
         this.state.board[row - 1][col].color === this.props.selectedPiece.color) {
         return true
      }
      if (col - 1 >= 0 &&
         this.state.board[row][col - 1].color === this.props.selectedPiece.color) {
         return true
      }
      return false
   }

   // Checks if a placement is valid during the first round
   checkValidFirstPlace(row, col) {
      if ((row === 0 && col === 0) ||
         (row === boardSize - 1 && col === 0) ||
         (row === 0 && col === boardSize - 1) ||
         (row === boardSize - 1 && col === boardSize - 1)) {
         //alert(row + " " + col)
         return true
      }
      return false
   }

   // Renders the game board
   render() {
      return (
         <View style={styles.container}>
            <View style={styles.sqaure}>
               <View style={styles.rowContainer}>
                  {this.state.board.map((row, rowIndex) => {
                     return (<View style={styles.columnContainer} key={rowIndex}>
                        {row.map((tile, colIndex) => {
                           return (
                              <TouchableOpacity
                                 style={[styles[tile.style], { backgroundColor: tile.color }]}
                                 key={colIndex}
                                 onPress={() => this.placePiece(colIndex, rowIndex)}
                              />)
                        })}
                     </View>
                     )
                  })}
               </View>
            </View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'row',
   },

   sqaure: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
   },

   rowContainer: {
      flex: 1,
      flexDirection: 'row',
      width: '100%'
   },

   columnContainer: {
      flex: 1,
      flexDirection: 'column',
      height: '100%',
      width: '100%'
   },

   topLeft: {
      flex: 1,
      borderWidth: 1,
      borderTopWidth: 5,
      borderLeftWidth: 5,
      borderColor: '#555555',
      alignItems: 'center',
      justifyContent: 'center',
   },

   topRight: {
      flex: 1,
      borderWidth: 1,
      borderTopWidth: 5,
      borderRightWidth: 5,
      borderColor: '#555555',
      alignItems: 'center',
      justifyContent: 'center',
   },

   bottomLeft: {
      flex: 1,
      borderWidth: 1,
      borderBottomWidth: 5,
      borderLeftWidth: 5,
      borderColor: '#555555',
      alignItems: 'center',
      justifyContent: 'center',
   },

   bottomRight: {
      flex: 1,
      borderWidth: 1,
      borderBottomWidth: 5,
      borderRightWidth: 5,
      borderColor: '#555555',
      alignItems: 'center',
      justifyContent: 'center',
   },

   top: {
      flex: 1,
      borderWidth: 1,
      borderTopWidth: 5,
      borderColor: '#555555',
      alignItems: 'center',
      justifyContent: 'center',
   },

   left: {
      flex: 1,
      borderWidth: 1,
      borderLeftWidth: 5,
      borderColor: '#555555',
      alignItems: 'center',
      justifyContent: 'center',
   },

   bottom: {
      flex: 1,
      borderWidth: 1,
      borderBottomWidth: 5,
      borderColor: '#555555',
      alignItems: 'center',
      justifyContent: 'center',
   },

   right: {
      flex: 1,
      borderWidth: 1,
      borderRightWidth: 5,
      borderColor: '#555555',
      alignItems: 'center',
      justifyContent: 'center',
   },

   inner: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#555555',
      alignItems: 'center',
      justifyContent: 'center',
   },
});

mapStateToProps = (state) => {
   const { selectedPiece } = state;
   return { selectedPiece };
}

export default connect(mapStateToProps)(GameBoard)