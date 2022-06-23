//-----------------------------------------------------------------------------
// Names:             Alex Bisbach, Matthew Burgess, Levon Swenson
// Course:            Mobile Applications
// Assignment:        Final Project
// File description:  PieceList.js represents the list of available pieces that
//                    displays in-game for each user.
//-----------------------------------------------------------------------------

import React from 'react';
import { StyleSheet, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import images from './images'
import SoundManager from './SoundManager';

//-----------------------------------------------------------------------------
// state:
//         - none
// props:
//         - selectPiece    - The function to call when a specific piece
//                            within the piece list is tapped
//         - selectedPlayer - The player who currently needs to take his/her
//                            turn (passed automatically from redux)
//-----------------------------------------------------------------------------
class PieceList extends React.Component {
   //--------------------------------------------------------------------------
   // The function which should be called when a PieceItem within the
   // PieceList is tapped.  Marks the tapped piece as selected.
   //--------------------------------------------------------------------------
   onPress = (item) => {
      SoundManager.PlayButtonPress();
      this.props.selectPiece(item);
   }
   
   //--------------------------------------------------------------------------
   // Renders an individual Piece within the PieceList.
   //--------------------------------------------------------------------------
   renderItem = ({ item }) => {
      return (
         <View style={{ flex: 1, paddingVertical: 10 }}>
            <TouchableOpacity onPress={() => this.onPress(item)}>
               <Image style={styles.image} source={this.getPieceImage(item.id)} />
            </TouchableOpacity>
         </View>
      )
   }

   //--------------------------------------------------------------------------
   // Retrives the the image for a specific piece type from the images array.
   //--------------------------------------------------------------------------
   getPieceImage = (id) => {
      return images[id]
   }

   //--------------------------------------------------------------------------
   // Renders the ItemSeparator for the PieceList.
   //--------------------------------------------------------------------------
   renderItemSeparator = () => {
      return (
         <View style={styles.itemSeparator} />
      )
   }

   //--------------------------------------------------------------------------
   // Renders the PieceList.
   //--------------------------------------------------------------------------
   render() {
      return (
         <View style={styles.container}>
            <FlatList
               renderItem={this.renderItem}
               data={this.props.selectedPlayer.pieces}
               ItemSeparatorComponent={this.renderItemSeparator}
               keyExtractor={(item) => item.id + ""} />
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'center',
   },
   itemSeparator: {
      backgroundColor: 'red',
      height: 0.5
   },
   image: {
      maxWidth: '100%',
      maxHeight: '100%',
      resizeMode: 'cover',
      alignSelf: 'center'
   },
});

mapStateToProps = (state) => {
   const { selectedPlayer } = state;
   return { selectedPlayer };
}

export default connect(mapStateToProps)(PieceList)