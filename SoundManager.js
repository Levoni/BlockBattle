//-----------------------------------------------------------------------------
// Names:             Alex Bisbach, Matthew Burgess, Levon Swenson
// Course:            Mobile Applications
// Assignment:        Final Project
// File Description:  SoundManager.js contains all components necessary for
//                    playing audio files.
//-----------------------------------------------------------------------------

import { Audio } from 'expo-av';

const buttonPressSFX = new Audio.Sound();
const backgroundMusic = new Audio.Sound();

//-----------------------------------------------------------------------------
// State: none
// Props: none
//-----------------------------------------------------------------------------
export default class SoundManager {
   
   //--------------------------------------------------------------------------
   // Loads necessary audio files into their respective audio objects
   //--------------------------------------------------------------------------
   static Initialize = async () => {
      await buttonPressSFX.loadAsync(require('./assets/buttonPress.mp3'));
      await backgroundMusic.loadAsync(require('./assets/puzzle.mp3'));
   }

   //--------------------------------------------------------------------------
   // Sets the volume level for backgroundMusic; level must be between 0 and 1.
   //--------------------------------------------------------------------------
   static SetBackgroundVolume = (background) => {
      backgroundMusic.setVolumeAsync(background);
   }

   //--------------------------------------------------------------------------
   // Sets the volume level for buttonPressSFX; level must be between 0 and 1.
   //--------------------------------------------------------------------------
   static SetSFXVolume = (sfx) => {
      buttonPressSFX.setVolumeAsync(sfx);
   }

   //--------------------------------------------------------------------------
   // Sets the playback position for buttonPressSFX to 0 so the file plays from
   // the beginning and then plays the file.
   //--------------------------------------------------------------------------
   static PlayButtonPress = async () => {
      await buttonPressSFX.setPositionAsync(0);
      await buttonPressSFX.playAsync();
   }

   //--------------------------------------------------------------------------
   // Sets the playback position for backgroundMusic to 0 so the file plays
   // from the beginning, sets the file to loop, and then plays the file.
   //--------------------------------------------------------------------------
   static PlayBackgroundMusic = async () => {
      await backgroundMusic.setPositionAsync(0);
      await backgroundMusic.setIsLoopingAsync(true);
      await backgroundMusic.playAsync();
   }

   //--------------------------------------------------------------------------
   // Stops backgroundMusic from playing
   //--------------------------------------------------------------------------
   static StopBackgroundMusic = async () => {
      await backgroundMusic.stopAsync();
   }
}