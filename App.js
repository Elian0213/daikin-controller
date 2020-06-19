import React from 'react';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';
import Store from './Redux.js';

import Home from './components/Index';

export default class App extends React.Component {

  render() {
    return (
      <Provider store={Store}>
        <Home />
      </Provider>
    )
  }
};``