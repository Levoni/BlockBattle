//-------------------------------------------------------------------------
// Component responsible for displaying a lable, corrisponding number,
// and background color
// Props:   label (string) - The text to display as the label
//          num (string) - The number to display
//          color (string) - color to display as the background color
//-------------------------------------------------------------------------
import React from 'react';
import { StyleSheet, View, Text} from 'react-native';


export default class ScoreLabel extends React.Component {

   render() {
      return (
         <View style={[{ backgroundColor: this.props.color, padding:10 }, styles.container,styles.stdMargin]}>
            <View style={styles.label}>
               <Text >{this.props.label}</Text>
            </View>
            <View style={styles.num}>
               <Text>{this.props.num}</Text>
            </View>
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
   },
   label: {
      flex: 1,
      alignItems: 'flex-start',
   },
   num: {
      flex: 1,
      alignItems: 'flex-end',
   },
   stdMargin: {
      margin:5,
      marginHorizontal:10,
   }
})
