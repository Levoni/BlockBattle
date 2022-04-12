import { combineReducers } from 'redux';
import createTiles from './GamePieces';

const players = [{ name: '', color: '', pieces: createTiles('red') }, { name: '', color: '' }, { name: '', color: '' }, { name: '', color: '' }];

const playerReducer = (state = players, action) => {
   switch (action.type) {
      case "ADD_PLAYER":
         return [
            ...state, action.payload]
      case "UPDATE_PLAYER":
         return state.map((item, index) => {
            if (action.payload.index === index)
               return { name: action.payload.name, color: action.payload.color, pieces: createTiles(action.payload.color) }
            else
               return item
         })
      case 'UPDATE_PLAYER_NAME':
         return state.map((item, index) => {
            if (action.payload.index === index)
               return { name: action.payload.name, color: item.color, pieces: createTiles(item.color) }
            else
               return item
         })
      case 'UPDATE_PLAYER_COLOR':
         return state.map((item, index) => {
            if (action.payload.index === index)
               return { name: item.name, color: action.payload.color, pieces: createTiles(action.payload.color) }
            else
               return item
         })
      case "REMOVE_PIECE":
         return state.map(x => {
            if (x.name === action.name) {
               return { ...x, pieces: x.pieces.filter(p => p.id !== action.id) }
            }
            return x
         })
      default:
         return state
   }
}

const selectedPieceReducer = (state = {}, action) => {
   switch (action.type) {
      case 'SELECT_PIECE':
         return action.payload
      case 'FLIP_VERTICAL':
         return {
            ...state,
            tiles: state.tiles.map(tile => {
               return [-tile[0], tile[1]]
            })
         }
      case 'FLIP_HORIZONTAL':
         return {
            ...state,
            tiles: state.tiles.map(tile => {
               return [tile[0], -tile[1]]
            })
         }
      case 'ROTATE_CW':
         return {
            ...state,
            tiles: state.tiles.map(tile => {
               return [tile[1], -tile[0]]
            })
         }
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

const currentPlayerReducer = (state = {}, action) => {
   switch (action.type) {
      case 'SELECT_PLAYER':
         return action.payload
      default:
         return state
   }
}

const userReducer = (state = [
   { name: 'Matthew', color: 'green' },
   { name: 'Levon', color: 'blue' },
   { name: 'Ward', color: 'pink' },
   { name: 'Debra', color: 'yellow' }], action) => {
   switch (action.type) {
      case "ADD_USER":
         return [
            ...state, action.payload]
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
      default:
         return state;
   }
}

const baseColors = ['red', 'blue', 'green', 'purple', 'pink', 'orange', 'yellow', 'teal'];

const ColorReducer = (state = baseColors, action) => {
   switch (action.type) {
      default:
         return state;
   }
}

const defaultVolume = { masterVolume: 100, backgroundVolume: 100, sfxVolume: 100 };

const volumeReducer = (state = defaultVolume, action) => {
   switch (action.type) {
      case 'UPDATE_MASTER_VOLUME':
         return { ...state, masterVolume: action.payload }
      case 'UPDATE_BACKGROUND_VOLUME':
         return { ...state, backgroundVolume: action.payload }
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