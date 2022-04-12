import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

export default class PieceControlButtons extends React.Component {
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
      padding: 10
   },
   image: {
      maxWidth: '100%',
      maxHeight: '100%',
      resizeMode: 'contain',
      alignSelf: 'center'
   }
});