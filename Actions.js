export const addUser = user => (
   {
      type: "ADD_USER",
      payload: user,
   }
);

export const editUserName = (index, userName) => (
   {
      type: "EDIT_USER_NAME",
      payload: userName,
      index: index
   }
)

export const editUserColor = (index, color) => (
   {
      type: "EDIT_USER_COLOR",
      payload: color,
      index: index
   }
)

export const addPlayer = player => (
   {
      type: "ADD_PLAYER",
      payload: player
   }
)

export const updatePlayer = (name, color, pIndex) => (
   {
      type: 'UPDATE_PLAYER',
      payload: {
         name: name,
         color: color,
         index: pIndex,
      }
   }
)

export const updatePlayerName = (name, pIndex) => (
   {
      type: 'UPDATE_PLAYER_NAME',
      payload: {
         name: name,
         index: pIndex,
      }
   }
)

export const updatePlayerColor = (color, pIndex) => (
   {
      type: 'UPDATE_PLAYER_COLOR',
      payload: {
         color: color,
         index: pIndex,
      }
   }
)

export const removePiece = (playerName, pieceId) => (
   {
      type: "REMOVE_PIECE",
      name: playerName,
      id: pieceId
   }
)

export const selectPiece = (piece) => (
   {
      type: "SELECT_PIECE",
      payload: piece
   }
)

export const selectPlayer = (player) => (
   {
      type: "SELECT_PLAYER",
      payload: player
   }
)

export const updateMasterVolume = (volume) => (
   {
      type: 'UPDATE_MASTER_VOLUME',
      payload: volume
   }
)

export const updateBackgroundVolume = (volume) => (
   {
      type: 'UPDATE_BACKGROUND_VOLUME',
      payload: volume
   }
)

export const updateSFXVolume = (volume) => (
   {
      type: 'UPDATE_SFX_VOLUME',
      payload: volume
   }
)

export const flipVertical = () => (
   {
      type: "FLIP_VERTICAL"
   }
)

export const flipHorizontal = () => (
   {
      type: "FLIP_HORIZONTAL"
   }
)

export const rotateCW = () => (
   {
      type: "ROTATE_CW"
   }
)

export const rotateCCW = () => (
   {
      type: "ROTATE_CCW"
   }
)