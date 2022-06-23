//-------------------------------------------------------------------------
// Component that can be clicked and displays a given name
// Props: name (string) - name of player to display
//        click (function) - Is called when component is clicked
//-------------------------------------------------------------------------
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

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


