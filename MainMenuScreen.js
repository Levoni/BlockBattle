import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, StatusBar } from 'react-native';

export default class MainMenuScreen extends React.Component {

  startGamePress = () => {
    this.props.navigation.navigate('GameScreen');
  }

  optionsPress = () => {
    this.props.navigation.navigate('OptionsScreen');
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <TouchableOpacity onPress={this.startGamePress}>
          <Text>Start Game</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.optionsPress}>
          <Text>Options</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});