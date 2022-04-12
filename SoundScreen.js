import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LabeledSlider from './LabeledSlider';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateMasterVolume, updateBackgroundVolume, updateSFXVolume} from './Actions'
import SoundManager from './SoundManager';

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
   
   state = {
      masterVolume: 50,
      backgroundVolume: 50,
      sfxVolume: 50
   }

   onMasterSlidingComplete = (value) => {
      this.props.updateMasterVolume(value);
      // this.setState({masterVolume: value});
      // alert(this.state.masterVolume);
   }

   onBackgroundSlidingComplete = (value) => {
      this.props.updateBackgroundVolume(value);
      // this.setState({backgroundVolume: value});
      // alert(this.state.backgroundVolume);
      SoundManager.SetBackgroundVolume(value/100);
   }
   
   onSFXSlidingComplete = (value) => {
      this.props.updateSFXVolume(value);
      // this.setState({sfxVolume: value});
      // alert(this.state.sfxVolume);
      SoundManager.SetSFXVolume(value/100);
   }

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