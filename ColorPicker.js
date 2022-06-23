//-------------------------------------------------------------------------
// This component allows a user to pick a color from a list
// of colors.
// Props: colors (string) - array of colors
//        selected (string) - string to store current selected color
//        onColorChange (function) - callback function for when
//                        color is changed. paramater: color
//-------------------------------------------------------------------------
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import SoundManager from './SoundManager';


export default class ColorPicker extends React.Component {
   // state stores a variable for if the color tray is open and the character to display on the left side
   state = {
      opened: false,
      buttonChar: '>'
   }

   // Returns a highlight for selected colors touchableOpacity
   getColorHighlight = (curItemColor, curSelected) => {
      if (curItemColor === curSelected)
         return (<View style={{ flex: 1, margin: 5, backgroundColor: 'rgba(255,255,255,.5)' }}></View>)
   }

   // Returns a touchableOpacity for every color in the color array
   getColorElements = () => {
      return (this.props.colors.map((color, index) => {
         return (
            <TouchableOpacity onPress={() => { this.SelectColor(color) }} key={index} style={{ width: 50, margin: 5, backgroundColor: color }}>
               {this.getColorHighlight(color, this.props.selected)}
            </TouchableOpacity>
         )
      })
      )
   }

   // Called if a colors touchableOpacity is clicked, used to set that color as selected color
   SelectColor = (newColor) => {
      SoundManager.PlayButtonPress();
      this.props.onColorChange(newColor);
   }

   // Toggles wheather the drawer is open or closed
   Toggle = () => {
      SoundManager.PlayButtonPress();
      if (this.state.opened)
         this.setState({ opened: false, buttonChar: '>' })
      else
         this.setState({ opened: true, buttonChar: '<' })
   }

   // Renders the selection drawer or selected color based on wehater it is opened or not
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
