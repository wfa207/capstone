'use strict';

import React, { Component } from 'react';
import TabBar from './components/TabBar/TabBar.js';

class App extends Component {
  constructor(props) {
    super(props);
  }  

  render() {
    return (
      <TabBar/>
    );
  }
}

module.exports = App;