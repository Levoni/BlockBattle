//-----------------------------------------------------------------------------
// Names:             Alex Bisbach, Matthew Burgess, Levon Swenson
// Course:            Mobile Applications
// Assignment:        Final Project
// File description:  UserSettingsScreen.js represents the settings screen in
//                    which users can adjust name and preferred color for
//                    existing users.
//-----------------------------------------------------------------------------

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Picker, TextInput, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addUser, editUserName, editUserColor } from './Actions';
import ColorPicker from './ColorPicker';
import SoundManager from './SoundManager';

//-----------------------------------------------------------------------------
// state:
//         - selectedValue  - Represents the index of the currently selected
//                            element within the Picker; starts at 0
//         - textinputValue - Represents the current text value within the
//                            TextInput
//         - selectedColor  - Represents the current color selected within the
//                            ColorPicker
// props:
//         - users          - Represents the list of all users currently
//                            registered within the system (automatically
//                            passed from redux)
//         - editUserName   - The function which should be called when the user
//                            wishes to save changes made to a user's username
//         - editUserColor  - The function which should be called when the user
//                            wishes to save changes made to a user's color
//-----------------------------------------------------------------------------
class UserSettingsScreen extends React.Component {
   static navigationOptions = ({ navigation }) => {
      return {
         title: 'User',
         headerTitleStyle: {
            textAlign: 'center',
            flex: 1
         },
         headerRight: (
            <View style={styles.headerRight}>
               <TouchableOpacity onPress={() => {
                  navigation.navigate('CreateUserScreen')
                  SoundManager.PlayButtonPress()
               }}>
                  <Text>Add User</Text>
               </TouchableOpacity>
            </View>
         )
      }
   }

   state = {
      selectedValue: 0,
      textinputValue: '',
      selectedColor: 'red'
   }

   //--------------------------------------------------------------------------
   // Called when the UserSettingsScreen first mounts to set
   // this.state.textinputValue and this.state.selectedColor to reflect the
   // name and preferred color of the currently selected user (by default,
   // the first user in the list)
   //--------------------------------------------------------------------------
   componentDidMount() {
      this.setState(prevState => ({ textinputValue: this.props.users[prevState.selectedValue].name, selectedColor: this.props.users[prevState.selectedValue].color }));
   }

   //--------------------------------------------------------------------------
   // Generates each individual user item to be viewed within the Picker.
   //--------------------------------------------------------------------------
   generateItems = () => {
      let items = this.props.users.map((x, index) => {
         return <Picker.Item label={x.name} value={index} key={index} /> //Key is redundant, but it makes Expo stop yelling
      });

      return items;
   }

   //--------------------------------------------------------------------------
   // Function which should be called when a new user is selected within the
   // Picker.  Updates this.state.selectedValue, this.state.textinputValue,
   // and this.state.selectedColor to reflect relevant properties of the
   // newly selected user.
   //--------------------------------------------------------------------------
   selectNewItem = (index) => {
      this.setState(prevState => ({ selectedValue: index, textinputValue: this.props.users[index].name, selectedColor: this.props.users[index].color }))
   }

   //--------------------------------------------------------------------------
   // Function which should be called when the user finishes editing a user's
   // name.  Searches the existing names of all users to determine if the new
   // name in question is already taken.  If the name is taken, the user is
   // notified.  If the name is not taken, the user's name is updated in the
   // redux store.  If the name is blank, the user is notified that a name must
   // be entered.
   //--------------------------------------------------------------------------
   validateNameChange = (name) => {
      let nameTaken = false;

      if (name !== '') {
         for (let i = 0; i < this.props.users.length; i++) {
            if (name === this.props.users[i].name && i !== this.state.selectedValue) {
               nameTaken = true;
            }
         }
         if (nameTaken) {
            alert('Name is already taken!');
         } else {
            // selectedIndex = this.state.selectedValue
            this.props.editUserName(this.state.selectedValue, name);
            this.UpdateStorage(this.state.selectedValue, name, this.props.users[this.state.selectedValue].color);
            // this.setState({selectedValue: selectedIndex})
         }
      } else {
         alert('Please enter a valid name.');
         this.setState(prevState => ({ textinputValue: this.props.users[prevState.selectedValue].name }))
      }
   }

   //--------------------------------------------------------------------------
   // Function which should be called when the user selects a new color for a
   // user.  The redux store is updated appropriately, and 
   // this.state.selectedColor is also modified.
   //--------------------------------------------------------------------------
   setUserColor = (color) => {
      this.setState({ selectedColor: color });
      this.props.editUserColor(this.state.selectedValue, color);
      this.UpdateStorage(this.state.selectedValue, this.props.users[this.state.selectedValue].name, color);
   }

   UpdateStorage(index, name, color) {
      var users = [];
      this.props.users.forEach((element,innerIndex) => {
         users.push({
            name: index == innerIndex ? name : element.name,
            color: index == innerIndex ? color : element.color,
            stats: {
               wins: element.stats.wins,
               games: element.stats.games,
               points: element.stats.points
            }
         })
      });
      AsyncStorage.setItem("users",JSON.stringify(users));
   }

   //--------------------------------------------------------------------------
   // Renders the UserSettingsScreen.
   //--------------------------------------------------------------------------
   render() {
      return (
         <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <View style={{ flex: 1 }}>
               <Text>User</Text>
               <View style={styles.thinRedBorder}>
                  <Picker selectedValue={this.state.selectedValue} onValueChange={(itemValue, itemPosition) => this.selectNewItem(itemPosition)}>
                     {this.generateItems()}
                  </Picker>
               </View>
            </View>
            <View style={{ flex: 1 }}>
               <Text>Name</Text>
               <TextInput style={styles.thinRedBorder} value={this.state.textinputValue} onChangeText={(value) => this.setState({ textinputValue: value })} onSubmitEditing={() => this.validateNameChange(this.state.textinputValue)} />
            </View>
            <View style={{ flex: 1 }}>
               <Text>Color</Text>
               <ColorPicker colors={this.props.colors} selected={this.state.selectedColor} onColorChange={(selectedColor) => this.setUserColor(selectedColor)} />
            </View>
         </KeyboardAvoidingView>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'stretch',
      justifyContent: 'center',
      paddingHorizontal: 10
   },
   headerRight: {
      flex: 1,
      paddingHorizontal: 10
   },
   thinRedBorder: {
      borderColor: 'red',
      borderWidth: 1,
   }
});

const mapStateToProps = (state) => {
   const { users, colors } = state
   return { users, colors }
}

const mapDispatchToProps = dispatch => (
   bindActionCreators({
      addUser,
      editUserName,
      editUserColor
   }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsScreen);