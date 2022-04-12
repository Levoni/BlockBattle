import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default class LabeledTextInput extends React.Component {
   render() {
      return (
         <View style={styles.container}>
            <View style={styles.row}>
               <Text>{this.props.label + "  "}</Text>
               <TextInput style={styles.textInput} secureTextEntry={this.props.isPassword} autoCapitalize='none' onChangeText={(value) => this.props.onChangeText(value)}></TextInput>
            </View>
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      // backgroundColor: 'purple',
      alignItems: 'center',
      justifyContent: 'center'
   },
   row: {
      flexDirection: 'row',
      alignItems: 'center'
   },
   textInput: {
      borderColor: 'red',
      borderWidth: 1,
      backgroundColor: 'lightgray',
      width: 200,
      paddingHorizontal: 5
   }
});