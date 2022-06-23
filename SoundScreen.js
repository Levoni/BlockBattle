//-----------------------------------------------------------------------------
// Names:             Alex Bisbach, Matthew Burgess, Levon Swenson
// Course:            Mobile Applications
// Assignment:        Final Project
// File description:  SoundScreen.js represents the settings screen in which
//                    volume levels can be adjusted for both the background
//                    music and sound effects
//-----------------------------------------------------------------------------

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LabeledSlider from './LabeledSlider';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateMasterVolume, updateBackgroundVolume, updateSFXVolume} from './Actions'
import SoundManager from './SoundManager';

//-----------------------------------------------------------------------------
// state:
//         - none
// props:
//         - updateMasterVolume     - The function to be called after the
//                                    master volume slider finishes sliding
//                                    (passed automatically from redux)
//         - updateBackgroundVolume - The function to be called after the
//                                    background volume slider finihes sliding
//                                    (passed automatically from redux)
//         - updateSFXVolume        - The function to be called after the
//                                    sfx volume slider finishes sliding
//                                    (passed automatically from redux)
//         - volume                 - The current volume values for master
//                                    volume, background volume, and sfx volume
//                                    (passed automatically from redux)
//-----------------------------------------------------------------------------
class SoundScreen extends React.Component {
   static navigationOptions = ({navigation}) => {
      return {
         title: 'Sound',
         headerTitleStyle: {
            textAlign: 'center',
            flex: 1
         },
         headerRight: <View style={{flex: 1}}/>
      }
   }

   //--------------------------------------------------------------------------
   // The function which should be called when the master volume slider
   // finishes sliding.  Updates the master volume value in redux.
   //--------------------------------------------------------------------------
   onMasterSlidingComplete = (value) => {
      this.props.updateMasterVolume(value);
   }

   //--------------------------------------------------------------------------
   // The function which should be called when the background volume slider
   // finishes sliding.  Updates the background volume value in redux and
   // sets the background volume value in SoundManager.
   //--------------------------------------------------------------------------
   onBackgroundSlidingComplete = (value) => {
      this.props.updateBackgroundVolume(value);
      SoundManager.SetBackgroundVolume(value/100);
   }
   
   //--------------------------------------------------------------------------
   // The function which should be called when the sfx volume slider finishes
   // sliding.  Updates the sfx volume value in redux and sets the sfx volume
   // value in SoundManager.
   //--------------------------------------------------------------------------
   onSFXSlidingComplete = (value) => {
      this.props.updateSFXVolume(value);
      SoundManager.SetSFXVolume(value/100);
   }

   //--------------------------------------------------------------------------
   // Renders the SoundScreen.
   //--------------------------------------------------------------------------
   render() {
      return (
         <View style={styles.container}>
            <LabeledSlider label='Master Volume' maximumValue={100} sliderValue={this.props.volume.masterVolume} onSlidingComplete={this.onMasterSlidingComplete}/>
            <LabeledSlider label='Background Volume' maximumValue={100} sliderValue={this.props.volume.backgroundVolume} onSlidingComplete={this.onBackgroundSlidingComplete}/>
            <LabeledSlider label='SFX Volume' maximumValue={100} sliderValue={this.props.volume.sfxVolume} onSlidingComplete={this.onSFXSlidingComplete}/>
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'stretch',
      justifyContent: 'center',
      paddingHorizontal: 10
   }
});

const mapStateToProps = (state) => {
   const { volume } = state
   return { volume }
}

const mapDispatchToProps = (dispatch) => (
   bindActionCreators({
      updateMasterVolume,
      updateBackgroundVolume,
      updateSFXVolume
   }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(SoundScreen)