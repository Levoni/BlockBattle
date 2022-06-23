//-------------------------------------------------------------------------
// This file exports all the actions that can be sent to the redux store
// reducers
//-------------------------------------------------------------------------

// Adds a user to the user reducer
// input: user (object) - the user object to add
export const addUser = user => (
   {
      type: "ADD_USER",
      payload: user,
   }
);

// Edits a user's name in the user reducer
// input: index (number) - index of user to edit
//        userName (string) - new name to update user to
export const editUserName = (index, userName) => (
   {
      type: "EDIT_USER_NAME",
      payload: userName,
      index: index
   }
)

// Edits a user's color in the user reducer
// inputs: index (number) - index of user to edit
//         color (string) - color to update user to
export const editUserColor = (index, color) => (
   {
      type: "EDIT_USER_COLOR",
      payload: color,
      index: index
   }
)

// Adds a player to the player reducer
// inputs: player (object) - player object to add
export const addPlayer = player => (
   {
      type: "ADD_PLAYER",
      payload: player
   }
)

// Updates a players name and color in the player reducer
// inputs: name (string) - name to update player to
//         color (string) - color to update player to
//         pIndex (number) - index of player to update
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

// Updates a players name in the player reducer
// inputs: name (string) - name to update player to
//         pIndex (number) - index of player ot update
export const updatePlayerName = (name, pIndex) => (
   {
      type: 'UPDATE_PLAYER_NAME',
      payload: {
         name: name,
         index: pIndex,
      }
   }
)

// Updates a players color in the player reducer
// inputs: color (string) - color to update player to
//         pIndex (number) - index of player ot update
export const updatePlayerColor = (color, pIndex) => (
   {
      type: 'UPDATE_PLAYER_COLOR',
      payload: {
         color: color,
         index: pIndex,
      }
   }
)

// Resets player reducer to initial value
export const resetPlayers = () => (
   {
      type: 'RESET_PLAYERS',
   }
)

// Reloads the pieces for each player in the player reducer
export const reloadPlayers = () => (
   {
      type: 'RELOAD_PLAYERS',
   }
)

// Updates surrendered for a player in the player reducer
// input: surrendered (bool) - value to update player to
//        pIndex (number) - index of player to update
export const updateSurrender = (surrendered, pIndex) => (
   {
      type: 'UPDATE_SURRENDER',
      payload: {
         surrendered,
         index: pIndex,
      }
   }
)

// Updates the stats for users in user reducer
// input: won (bool) - bool used to determine incrementin a users wins
//        points (number) - number used to update a users total points
//        name (string) - name used to identify user with statistics
export const updateStats = (won, points, name) => (
   {
      type: 'UPDATE_STATS',
      payload: {
         won,
         points,
         name
      }
   }
)

// Removes a piece from a player in the player reducer
// input: playerName (string) - name of player to remove piece from
//        pieceID (number) - id of piece to remove
export const removePiece = (playerName, pieceId) => (
   {
      type: "REMOVE_PIECE",
      name: playerName,
      id: pieceId
   }
)

// Assigns a piece to the selectedPiece reducer
// input: piece (object) - piece object to store
export const selectPiece = (piece) => (
   {
      type: "SELECT_PIECE",
      payload: piece
   }
)

// Assigns a player to the currentPlayer reducer
// input: player (object) - player object to store
export const selectPlayer = (player) => (
   {
      type: "SELECT_PLAYER",
      payload: player
   }
)

// Updates the master volume of the app in volume reducer
// input: volume (number) - volume to set master volume to
export const updateMasterVolume = (volume) => (
   {
      type: 'UPDATE_MASTER_VOLUME',
      payload: volume
   }
)

// Updates the background volume of the app in volume reducer
// input: volume (number) - volume to set background volume to
export const updateBackgroundVolume = (volume) => (
   {
      type: 'UPDATE_BACKGROUND_VOLUME',
      payload: volume
   }
)

// Updates the SFX volume of the app in volume reducer
// input: volume (number) - volume to set SFX volume to
export const updateSFXVolume = (volume) => (
   {
      type: 'UPDATE_SFX_VOLUME',
      payload: volume
   }
)

// Flips piece vertically in selectedPiece reducer
export const flipVertical = () => (
   {
      type: "FLIP_VERTICAL"
   }
)

// Flips piece horizontally in selectedPiece reducer
export const flipHorizontal = () => (
   {
      type: "FLIP_HORIZONTAL"
   }
)

// Rotates piece clockwise in selectedPiece reducer
export const rotateCW = () => (
   {
      type: "ROTATE_CW"
   }
)

// Rotates piece counterclockwise in selectedPiece reducer
export const rotateCCW = () => (
   {
      type: "ROTATE_CCW"
   }
)