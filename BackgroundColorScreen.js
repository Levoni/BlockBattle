import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class BackgroundColorScreen extends React.Component {
   static navigationOptions = ({navigation}) => {
      return {
         title: 'Background Color',
         headerTitleStyle: {
            textAlign: 'center',
            flex: 1
         }
      }
   }
   
   render() {
      return (
         <View style={styles.container}>
            <Text>Background Color Screen</Text>
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   }
});