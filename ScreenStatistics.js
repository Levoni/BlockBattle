//-------------------------------------------------------------------------
// Screen that displays a users statistics from the current run of the app
//-------------------------------------------------------------------------
import React from 'react';
import { Picker, StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';


class ScreenStatistics extends React.Component {
   // Navigation title is centered
   // headerRight is for getting the title to properly center
   static navigationOptions = ({ navigation }) => {
      return {
         title: 'Statistics',
         headerTitleStyle: {
            textAlign: 'center',
            flex: 1
         },
         headerRight: (
            <View style={{ flex: 1 }}>
            </View>
         )
      }
   }

   // Selects the first user's information
   componentDidMount() {
      this.selectNewItem(0)
   }

   // state stores current selected user's wins,games,
   // win percentage, average points per game and curently selected value 
   // of picker
   state = {
      selectedValue: 0,
      wins: 0,
      games: 0,
      percent: 0,
      points: 0
   }

   // Creates items for the picker based on users in redux store
   // output: items - a set of picker items
   generateItems = () => {
      let items = this.props.users.map((x, index) => {
         return <Picker.Item label={x.name} value={index} key={index} /> //Key is redundant, but it makes Expo stop yelling
      });

      return items;
   }

   // Sets all the states values to information corrisponding to a user
   // at a specific indux in the redux store
   selectNewItem = (index) => {
      this.setState(prevState => ({
         selectedValue: index,
         textinputValue: this.props.users[index].name,
         selectedColor: this.props.users[index].color,
         wins: this.props.users[index].stats.wins,
         games: this.props.users[index].stats.games,
         percent: this.props.users[index].stats.games !== 0 ? (this.props.users[index].stats.wins / this.props.users[index].stats.games) * 100 : 0,
         points: this.props.users[index].stats.games !== 0 ? this.props.users[index].stats.points / this.props.users[index].stats.games : 0
      }))
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
            <Text>Games Played: {this.state.games}</Text>
            <Text>Games Won: {this.state.wins}</Text>
            <Text>Win Percentage: {this.state.percent}%</Text>
            <Text>Average Points Remaning: {this.state.points}</Text>
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