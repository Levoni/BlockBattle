import React from 'react';
import { View } from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './Reducers';
import Navigator from './Navigation';
import SoundManager from './SoundManager';



const store = createStore(reducers);

export default class App extends React.Component {

   componentDidMount = async () => {
      await SoundManager.Initialize();
   }

   render() {
      return (
         <Provider store={store}>
            <Navigator />
         </Provider>
      );
   }
}