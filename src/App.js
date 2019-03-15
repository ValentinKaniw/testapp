import React, { Component } from 'react';

import ButtonAppBar from './components/appBar'
import SimpleAppBar from './components/secondAppBar'
import Groups from './components/groups'

import './App.css';


class App extends Component {
  render() {
    return (
        <div className="App">
          <ButtonAppBar/>
          <SimpleAppBar/>
          <Groups/>
        </div>
    );
  }
}

export default (App);
