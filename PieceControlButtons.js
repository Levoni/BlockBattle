//-----------------------------------------------------------------------------
// Names:             Alex Bisbach, Matthew Burgess, Levon Swenson
// Course:            Mobile Applications
// Assignment:        Final Project
// File description:  PieceControlButtons.js represents the collection of four
//                    buttons used to manipulate pieces before placing them on
//                    the gameboard.  Included are rotate clockwise and
//                    counterclockwise and flip vertical and horizontal.
//-----------------------------------------------------------------------------

import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

//-----------------------------------------------------------------------------
// state:
//         - none
// props:
//         - onCounterClockwisePress - The function which should be called when
//                                     the user taps the counterclockwise
//                                     rotation button
//         - onClockwisePress        - The function which should be called when
//                                     the user taps the clockwise rotation
//                                     button
//         - onVerticalFlipPress     - The function which should be called when
//                                     the user taps the vertical flip button
//         - onHorizontalFlipPress   - The function which should be called when
//                                     the user taps the horizontal flip button
//-----------------------------------------------------------------------------
export default class PieceControlButtons extends React.Component {
   //--------------------------------------------------------------------------
   // Renders the PieceControlButtons.
   //--------------------------------------------------------------------------
   render() {
      return (
         <View style={styles.container}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
               <View style={styles.container}>
                  <TouchableOpacity style={styles.touchableOpacity} onPress={() => this.props.onCounterclockwisePress()}>
                     <Image style={styles.image} source={require('./assets/counterclockwise.png')} />
                  </TouchableOpacity>
               </View>
               <View style={styles.container}>
                  <TouchableOpacity style={styles.touchableOpacity} onPress={() => this.props.onClockwisePress()}>
                     <Image style={styles.image} source={require('./assets/clockwise.png')} />
                  </TouchableOpacity>
               </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
               <View style={styles.container}>
                  <TouchableOpacity style={styles.touchableOpacity} onPress={() => this.props.onVerticalFlipPress()}>
                     <Image style={styles.image} source={require('./assets/flip_vertical.png')}/>
                  </TouchableOpacity>
               </View>
               <View style={styles.container}>
                  <TouchableOpacity style={styles.touchableOpacity} onPress={() => this.props.onHorizontalFlipPress()}>
                     <Image style={styles.image} source={require('./assets/flip_horizontal.png')}/>
                  </TouchableOpacity>
               </View>
            </View>
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
   },
   touchableOpacity: {
      padding: 5
   },
   image: {
      maxWidth: '100%',
      maxHeight: '100%',
      resizeMode: 'contain',
      alignSelf: 'center'
   }
});