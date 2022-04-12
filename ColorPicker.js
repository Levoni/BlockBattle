//-------------------------------------------------------------
// Props: colors - array of colors (string format)
//        selected - string to store current selected color
//        onColorChange - callback function for when color is
//                        is change. takes (color) paramater.
//-------------------------------------------------------------
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import SoundManager from './SoundManager';



export default class ColorPicker extends React.Component {
   state = {
      opened: false,
      buttonChar: '>'
   }

   componentDidMount(){

   }

   //returns a highlight for selected colors touchableOpacity
   getColorHighlight = (curItemColor, curSelected) => {
      if (curItemColor === curSelected)
         return (<View style={{ flex: 1, margin: 5, backgroundColor: 'rgba(255,255,255,.5)' }}></View>)
   }

   //returns a touchableOpacity for every color in the color array
   getColorElements = () => {
      console.log(this.props.colors)
      return (this.props.colors.map((color, index) => {
         return (
            <TouchableOpacity onPress={() => { this.SelectColor(color) }} key={index} style={{ width: 50, margin: 5, backgroundColor: color }}>
               {this.getColorHighlight(color, this.props.selected)}
            </TouchableOpacity>
         )
      })
      )
   }

   //called if a colors touchableOpacity is clicked, used to set that color as selected color
   SelectColor = (newColor) => {
      SoundManager.PlayButtonPress();
      this.props.onColorChange(newColor);
   }

   //toggles wheather the drawer is open or closed
   Toggle = () => {
      SoundManager.PlayButtonPress();
      if (this.state.opened)
         this.setState({ opened: false, buttonChar: '>' })
      else
         this.setState({ opened: true, buttonChar: '<' })
   }

   // renders the selection drawer or selected color based on wehater it is opened or not
   renderScrollView = () => {
      if (this.state.opened)
         return (
            <ScrollView style={{ flex: 1 }} horizontal={true}>
               {this.getColorElements()}
            </ScrollView>
         )
      else
         return (
            <View style={{ flex: 1, margin: 5, backgroundColor: this.props.selected }}>
            </View>
         )
   }

   // setColor = (color) => {
   //    color = this.props.colors.indexOf(color);
   //    if (index !== -1)
   //       this.setState({ selected: color })
   // }

   //renders the components
   render() {
      return (
         <View style={{ flex: 1, flexDirection: 'row' }}>
            <TouchableOpacity onPress={this.Toggle} style={{ justifyContent: 'center', alignItems: 'center', width: 50 }}><Text style={{ fontSize: 40 }}>{this.state.buttonChar}</Text></TouchableOpacity>
            {this.renderScrollView()}
         </View>
      )
   }
}
