import React from 'react';
import { Button, StyleSheet, TouchableOpacity, View, Text, StatusBar } from 'react-native';

export default class ItemPlayer extends React.Component {
   render() {
      return (

         <TouchableOpacity onPress={this.props.click} >
            <View style={styles.item}>
               <Text >{this.props.name}</Text>
            </View>
         </TouchableOpacity>
      );
   }
}
const styles = StyleSheet.create({
   item: {
      paddingVertical: 2,
      justifyContent: "space-around",
      borderColor: 'black',
      borderWidth: 1,
      height: 40,
   }


});


