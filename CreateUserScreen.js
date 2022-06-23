//-------------------------------------------------------------------------
// This screen is resposible for allowing you to create a new user
//-------------------------------------------------------------------------
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LabeledTextInput from './LabeledTextInput';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addUser } from './Actions';
import ColorPicker from './ColorPicker';
import SoundManager from './SoundManager';


class CreateUserScreen extends React.Component {
   // state stores: text for the name input field
   //               selected color text for the color pickder
   state = {
      name: '',
      selectedColor: 'red'
   }

   // Validates name to be used then adds the user to the redux store
   // input: name (string)
   addUser = (name) => {
      SoundManager.PlayButtonPress();
      if (name !== '') {
         let nameTaken = false;
         for (let i = 0; i < this.props.users.length; i++) {
            if (name === this.props.users[i].name) {
               nameTaken = true;
            }
         }
         if (nameTaken) {
            alert("Name is already taken!");
         } else {
            var Users = [...this.props.users,{ name: name, color: this.state.selectedColor, stats: {wins: 0, games: 0, points: 0} }];
            AsyncStorage.setItem("users",JSON.stringify(Users));
            this.props.addUser({ name: name, color: this.state.selectedColor, stats: {wins: 0, games: 0, points: 0} });
            this.props.navigation.navigate('UserSettingsScreen');
         }

      } else {
         alert("Please enter a valid name.");
      }
   }

   //Bad workaround; should be fixed!
   componentDidMount() {
      this.props.navigation.setParams({ name: () => (this.state.name) });
      this.props.navigation.setParams({ addUser: this.addUser });
   }


   // Navigation options for these screen
   // title is center, has button on header right to add the user to store
   static navigationOptions = ({ navigation }) => {
      return {
         title: 'Add User',
         headerTitleStyle: {
            textAlign: 'center',
            flex: 1
         },
         headerRight: (
            <TouchableOpacity style={styles.headerRight} onPress={() => navigation.getParam('addUser')(navigation.getParam('name')())}>
               <Text>Save</Text>
            </TouchableOpacity>
         )
      }
   }

   // Handles the color change of the color picker
   // input: new color from the color picker (color string)
   changeColor = (color) => {
      this.setState({selectedColor: color});
   }

   render() {
      return (
         <View style={styles.container}>
            <View style={{ flex: 1 }}>
               <LabeledTextInput label='Name: ' onChangeText={(name) => this.setState({ name: name })} />
            </View>
            <View style={{flex: 1 }}>
               <ColorPicker colors={this.props.colors} selected={this.state.selectedColor} onColorChange={(selectedColor) => this.changeColor(selectedColor)}/>
            </View>
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'stretch',
      justifyContent: 'center',
   },
   headerRight: {
      paddingHorizontal: 10
   }
});

const mapStateToProps = (state) => {
   const { users, colors } = state;
   return { users, colors };
}

const mapDispatchToProps = (dispatch) => (
   bindActionCreators({
      addUser
   }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserScreen)