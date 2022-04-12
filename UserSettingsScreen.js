import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Picker, TextInput, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addUser, editUserName, editUserColor } from './Actions';
import ColorPicker from './ColorPicker';
import SoundManager from './SoundManager';

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

   componentDidMount() {
      this.setState(prevState => ({ textinputValue: this.props.users[prevState.selectedValue].name, selectedColor: this.props.users[prevState.selectedValue].color }));
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
            // this.setState({selectedValue: selectedIndex})
         }
      } else {
         alert('Please enter a valid name.');
         this.setState(prevState => ({ textinputValue: this.props.users[prevState.selectedValue].name }))
      }
   }

   setUserColor = (color) => {
      this.setState({ selectedColor: color });
      this.props.editUserColor(this.state.selectedValue, color);

   }

   render() {
      // alert(this.state.selectedValue);
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