import { combineReducers } from 'redux';
import createTiles from './GamePieces';

const players = [{ name: '', color: '', surrendered: false, pieces: createTiles('red') }, { name: '', color: '' }, { name: '', color: '' }, { name: '', color: '' }];

// This reducer holds our list of players that will be in a game
const playerReducer = (state = players, action) => {
   switch (action.type) {
      // Adding a player to the list
      case "ADD_PLAYER":
         return [
            ...state, action.payload]
      // Updating the data of a player already in the list
      case "UPDATE_PLAYER":
         return state.map((item, index) => {
            if (action.payload.index === index)
               return { name: action.payload.name, color: action.payload.color, surrendered: item.surrendered, pieces: createTiles(action.payload.color) }
            else
               return item
         })
      // Update a players name
      case 'UPDATE_PLAYER_NAME':
         return state.map((item, index) => {
            if (action.payload.index === index)
               return { name: action.payload.name, color: item.color, surrendered: item.surrendered, pieces: createTiles(item.color) }
            else
               return item
         })
      // Update a players color
      case 'UPDATE_PLAYER_COLOR':
         return state.map((item, index) => {
            if (action.payload.index === index)
               return { name: item.name, color: action.payload.color, surrendered: item.surrendered, pieces: createTiles(action.payload.color) }
            else
               return item
         })
      // removes a piece from the player
      case "REMOVE_PIECE":
         return state.map(x => {
            if (x.name === action.name) {
               return { ...x, pieces: x.pieces.filter(p => p.id !== action.id) }
            }
            return x
         })
      // updates the surrender value
      case "UPDATE_SURRENDER":
         return state.map((item, index) => {
            if (action.payload.index === index)
               return { name: item.name, color: item.color, surrendered: action.payload.surrendered, pieces: item.pieces }
            else
               return item
         })
      // reload all of the players' tiles
      case "RELOAD_PLAYERS":
         return state.map((item, index) => {
            return { name: item.name, color: item.color, surrendered: false, pieces: createTiles(item.color) }
         })
      // reset players to the default empty players
      case "RESET_PLAYERS":
         return players
      default:
         return state
   }
}

// This reducer stores the selected piece
const selectedPieceReducer = (state = {}, action) => {
   switch (action.type) {
      // selects a new piece
      case 'SELECT_PIECE':
         return action.payload
      // flips the selected piece vertically
      case 'FLIP_VERTICAL':
         return {
            ...state,
            tiles: state.tiles.map(tile => {
               return [-tile[0], tile[1]]
            })
         }
      // flips the selected piece horizontally
      case 'FLIP_HORIZONTAL':
         return {
            ...state,
            tiles: state.tiles.map(tile => {
               return [tile[0], -tile[1]]
            })
         }
      // rotates the selected piece clockwise
      case 'ROTATE_CW':
         return {
            ...state,
            tiles: state.tiles.map(tile => {
               return [tile[1], -tile[0]]
            })
         }
      // rotates the selected piece counter clockwise
      case 'ROTATE_CCW':
         return {
            ...state,
            tiles: state.tiles.map(tile => {
               return [-tile[1], tile[0]]
            })
         }
      default:
         return state
   }
}

// This reducer stores the current player whose turn it is
const currentPlayerReducer = (state = {}, action) => {
   switch (action.type) {
      // select a new player
      case 'SELECT_PLAYER':
         return action.payload
      // remove a piece from the player
      case "REMOVE_PIECE":
         return {
            ...state,
            pieces: state.pieces.filter(p => p.id !== action.id)
         }
      // reload the selected players pieces
      case "RELOAD_PLAYERS":
         return { ...state, surrendered: false, pieces: createTiles(state.color) }
      default:
         return state
   }
}

// This reducer holds a list of all the users saved in the app
const userReducer = (state = [], action) => {
   switch (action.type) {
      // adds a new user
      case "ADD_USER":
         return [
            ...state, action.payload]
      // updates the user's name
      case "EDIT_USER_NAME":
         return (
            state.map((x, index) => {
               if (index === action.index) {
                  return { ...x, name: action.payload };
               } else {
                  return x;
               }
            })
         )
      // updates the user's color
      case "EDIT_USER_COLOR":
         return (
            state.map((x, index) => {
               if (index === action.index) {
                  return { ...x, color: action.payload };
               } else {
                  return x;
               }
            })
         )
      // updates the user's stats
      case "UPDATE_STATS":
         return state.map((item) => {
            if (action.payload.name === item.name)
               return {
                  ...item, stats: {
                     wins: action.payload.won ? item.stats.wins + 1 : item.stats.wins,
                     games: item.stats.games + 1,
                     points: item.stats.points + action.payload.points
                  }
               }
            return item
         })
      default:
         return state;
   }
}

const baseColors = ['red', 'blue', 'green', 'purple', 'pink', 'orange', 'yellow', 'teal'];
// this reducer holds the colors that can be selected
const ColorReducer = (state = baseColors, action) => {
   switch (action.type) {
      default:
         return state;
   }
}

const defaultVolume = { masterVolume: 100, backgroundVolume: 100, sfxVolume: 100 };
// this reducer stores the values for the different volume settings
const volumeReducer = (state = defaultVolume, action) => {
   switch (action.type) {
      // updates the master volume for the app
      case 'UPDATE_MASTER_VOLUME':
         return { ...state, masterVolume: action.payload }
      // updates the background music volume
      case 'UPDATE_BACKGROUND_VOLUME':
         return { ...state, backgroundVolume: action.payload }
      // updates the sound effects volume
      case 'UPDATE_SFX_VOLUME':
         return { ...state, sfxVolume: action.payload }
      default:
         return state;
   }
}

const reducers = combineReducers({
   users: userReducer,
   colors: ColorReducer,
   players: playerReducer,
   volume: volumeReducer,
   selectedPiece: selectedPieceReducer,
   selectedPlayer: currentPlayerReducer
})

export default reducers;