//-------------------------------------------------------------------------
// This component is responsible for rendering a text and slider.
// Props: maximumValue (number) - sets max value of slider
//        sliderValue (number) - the current value of the slider
//        onSlidingComplete (function) - fuction called when the value of
//                                  the slider is finished changing
//-------------------------------------------------------------------------
import React from 'react';
import { StyleSheet, Text, View, Slider } from 'react-native';

export default class LabeledSlider extends React.Component {
   render() {
      return (
         <View style={styles.container}>
            <Text>{this.props.label}</Text>
            <Slider maximumValue={this.props.maximumValue} value={this.props.sliderValue} onSlidingComplete={(value) => this.props.onSlidingComplete(value)}/>
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
   }
});