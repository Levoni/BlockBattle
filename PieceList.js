import React from 'react';
import { StyleSheet, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import images from './images'
import SoundManager from './SoundManager';

class PieceList extends React.Component {
   onPress = (item) => {
      SoundManager.PlayButtonPress();
      this.props.selectPiece(item);
   }
   
   renderItem = ({ item }) => {
      return (
         <View style={{ flex: 1, paddingVertical: 10 }}>
            <TouchableOpacity onPress={() => this.onPress(item)}>
               <Image style={styles.image} source={this.getPieceImage(item.id)} />
            </TouchableOpacity>
         </View>
      )
   }

   getPieceImage = (id) => {
      return images[id]
   }

   renderItemSeparator = () => {
      return (
         <View style={styles.itemSeparator} />
      )
   }

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