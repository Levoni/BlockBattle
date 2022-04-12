import React from 'react';
import { TextInput, Button, StyleSheet, FlatList, TouchableOpacity, View, Text, Picker, KeyboardAvoidingView } from 'react-native';
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updatePlayer, updatePlayerName, updatePlayerColor } from './Actions';
import ItemPlayer from './ItemPlayer'
import ColorPicker from './ColorPicker'
import SoundManager from './SoundManager';

const LEFT_BRACKET = '<';
const PLAYER_INDEX = 1;

class ScreenP2 extends React.Component {
   state = {
      availableColors: [],
      availableUserNames: [],
      warningNameMessage: "",
      warningColorMessage: "",
      warningCTextColor: "black",
      warningNTextColor: "black",
      colorValid: true,
      nameValid: true
   }

   componentDidMount() {
      const userColors = this.props.players.map((item) => { return item.color })

      const usedColors = userColors.filter((item, index) => { return (item != "" && index !== PLAYER_INDEX) })
      this.setState({
         availableColors: this.props.colors.filter((item) => {
            if (usedColors.includes(item))
               return false
            else
               return true
         })
      })

      const playerNames = this.props.players.map((item) => { return item.name })
      const usedNames = playerNames.filter((item, index) => { return (item != "" && index !== PLAYER_INDEX) })
      this.setState({
         availableUserNames: this.props.users.filter((item) => {
            if (usedNames.includes(item.name))
               return false
            else
               return true
         })
      })
   }

   handleName = (text) => {
      this.props.updatePlayerName(text, PLAYER_INDEX)

      if (this.props.players.map((player) => { return player.name }).filter((item, index) => { return index !== PLAYER_INDEX }).includes(text))
         this.setState({ warningNameMessage: 'Name already selected', warningNTextColor: "red", nameValid: false })
      else
         this.setState({ warningNameMessage: '', warningNTextColor: "black", nameValid: true })
   }

   handleColorChange = (color) => {
      this.props.updatePlayerColor(color, PLAYER_INDEX)

      if (!this.state.availableColors.includes(color))
         this.setState({ warningColorMessage: 'Color already selected', warningCTextColor: "red", colorValid: false })
      else
         this.setState({ warningColorMessage: '', warningCTextColor: "black", colorValid: true })
   }

   NavFoward = () => {
      SoundManager.PlayButtonPress();
      if (this.state.colorValid && this.state.nameValid
         && this.props.players[PLAYER_INDEX].name !== ""
         && this.props.players[PLAYER_INDEX].color !== "")
         this.props.navigation.navigate('SetupP3')
   }

   NavBackward = () => {
      SoundManager.PlayButtonPress();
      this.props.navigation.navigate('SetupP1')
   }

   UserSelect = (item) => {
      SoundManager.PlayButtonPress();
      this.props.updatePlayer(item.name, item.color, PLAYER_INDEX)

      if (!this.state.availableColors.includes(item.color))
         this.setState({ warningColorMessage: 'Color already selected', warningCTextColor: "red", colorValid: false })
      else
         this.setState({ warningColorMessage: '', warningCTextColor: "black", colorValid: true })

      if (this.props.players.map((player) => { return player.name }).filter((item, index) => { return index !== PLAYER_INDEX }).includes(item.name))
         this.setState({ warningNameMessage: 'Name already selected', warningNTextColor: "red", nameValid: false })
      else
         this.setState({ warningNameMessage: '', warningNTextColor: "black", nameValid: true })
   }

   render() {
      return (
         <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <View style={styles.header}>
               <Text style={styles.headerFont}>Player Two</Text>
            </View>
            <View style={styles.body}>
               <TouchableOpacity style={styles.sideNav} onPress={this.NavBackward}>
                  <Text style={styles.NavArrow}>{LEFT_BRACKET}</Text>
               </TouchableOpacity>
               <View style={styles.Content}>
                  <View style={{ flex: 4 }}>
                     <Text>Select Existing User:</Text>
                     <FlatList style={styles.blackThinBorder}
                        data={this.state.availableUserNames}
                        renderItem={({ item, index }) => <ItemPlayer click={() => { this.UserSelect(item) }} name={item.name} index={index} />}
                        keyExtractor={(item, index) => index.toString()}
                     />
                  </View>
                  <View style={{ flex: 1, justifyContent: "space-around", alignItems: "center" }}>
                     <Text>OR</Text>
                  </View>
                  <View style={{ flex: 4 }}>
                     <View style={{ flex: 1 }}>
                        <Text>Enter Name and Select Color:</Text>
                        <Text style={{ color: this.state.warningNTextColor }}>Name: {this.state.warningNameMessage}</Text>
                        <TextInput style={styles.blackThinBorder} onChangeText={this.handleName} value={this.props.players[PLAYER_INDEX].name} />
                     </View>
                     <View style={{ flex: 1, padding: 5 }}>
                        <Text style={{ color: this.state.warningCTextColor }}>Color: {this.state.warningColorMessage}</Text>
                        <ColorPicker colors={this.state.availableColors} selected={this.props.players[PLAYER_INDEX].color} onColorChange={this.handleColorChange} />
                     </View>
                  </View>
               </View >
               <TouchableOpacity style={styles.sideNav} onPress={this.NavFoward}>
                  <Text style={styles.NavArrow}>></Text>
               </TouchableOpacity>
            </View>
         </KeyboardAvoidingView>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingTop: Constants.statusBarHeight,
   },

   header: {
      height: 30,
      alignItems: "center",
      borderBottomColor: "black",
      borderBottomWidth: 2
   },

   headerFont: {
      fontSize: 20,
      fontWeight: "bold",
   },

   body: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'stretch',
   },

   sideNav: {
      flex: 1,
      //backgroundColor: "blue", //For Debug
      alignItems: "center",
      justifyContent: "space-around",
   },

   NavArrow: {
      fontSize: 40
   },

   Content: {
      flex: 8,
      //backgroundColor: "green",
   },

   item: {
      paddingVertical: 2,
      justifyContent: "space-around",
      borderColor: 'black',
      borderWidth: 1,
      height: 40,
   },

   blackThinBorder: {
      borderWidth: 1,
      borderColor: "black"
   }

});

mapStateToProps = (state) => {
   const { colors, users, players } = state;
   return { colors, users, players };
}

mapDispatchToProps = (dispatch) => (
   bindActionCreators({ updatePlayer, updatePlayerColor, updatePlayerName }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(ScreenP2)