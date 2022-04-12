import { Audio } from 'expo-av';

const buttonPressSFX = new Audio.Sound();
const backgroundMusic = new Audio.Sound();


export default class SoundManager {
   static Initialize = async () => {
      await buttonPressSFX.loadAsync(require('./assets/buttonPress.mp3'));
      await backgroundMusic.loadAsync(require('./assets/puzzle.mp3'));
   }

   static SetBackgroundVolume = (background) => {
      backgroundMusic.setVolumeAsync(background);
   }

   static SetSFXVolume = (sfx) => {
      buttonPressSFX.setVolumeAsync(sfx);
   }

   static PlayButtonPress = async () => {
      // const buttonPressSFX = new Audio.Sound();
      // await buttonPressSFX.loadAsync(require('./assets/buttonPress.mp3'));
      await buttonPressSFX.setPositionAsync(0);
      await buttonPressSFX.playAsync();
   }

   static PlayBackgroundMusic = async (volume) => {
      await backgroundMusic.setPositionAsync(0);
      await backgroundMusic.setIsLoopingAsync(true);
      await backgroundMusic.playAsync();
   }

   static StopBackgroundMusic = async () => {
      await backgroundMusic.stopAsync();
   }
}