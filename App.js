//-------------------------------------------------------------------------
// This is the entry point for the program.
// The program is a digital version of the board game blokus.
// It also allows for users preferences to be stored.
//-------------------------------------------------------------------------
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './Reducers';
import Navigator from './Navigation';
import SoundManager from './SoundManager';


// This is the redux store that holds our shared state items
const store = createStore(reducers);

// This class renders our app container within our redux provider
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