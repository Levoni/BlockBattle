import React from 'react';
import { Picker, Button, StyleSheet, TouchableOpacity, View, Text, StatusBar } from 'react-native';
import { connect } from 'react-redux';


class ScreenStatistics extends React.Component {
   static navigationOptions = ({ navigation }) => {
      return {
         title: 'Statistics',
         headerTitleStyle: {
            textAlign: 'center',
            flex: 1
         },
         headerRight: (
            <View style={{flex:1}}>
            </View>
         )
      }
   }
   
   state = {
      language: "Test",
      selectedValue: 0,
   }

   generateItems = () => {
      let items = this.props.users.map((x, index) => {
         return <Picker.Item label={x.name} value={index} key={index} /> //Key is redundant, but it makes Expo stop yelling
      });

      return items;
   }

   selectNewItem = (index) => {
      // alert(index);
      this.setState(prevState => ({ selectedValue: index, textinputValue: this.props.users[index].name, selectedColor: this.props.users[index].color }))
   }

   render() {
      return (

         <View style={styles.container}>
            <View>
               <Text>Users:</Text>
               <Picker selectedValue={this.state.selectedValue} onValueChange={(itemValue, itemPosition) => this.selectNewItem(itemPosition)}>
                  {this.generateItems()}
               </Picker>
            </View>
            <Text>Games Played: 0</Text>
            <Text>Games Won: 0</Text>
            <Text>Win Percentage: 0</Text>
            <Text>Average Pieces Remaning: 0</Text>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'space-evenly',
   },
});


const mapStateToProps = (state) => {
   const { users, colors } = state
   return { users, colors }
}

export default connect(mapStateToProps)(ScreenStatistics);