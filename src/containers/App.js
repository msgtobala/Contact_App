import React, { Component } from 'react';
import './App.css';


import Layout from '../components/Layout/Layout';
import classes from '../containers/App.css';
class App extends Component {
  render() {
    return (
      <div className="App">
          <h1 className = {classes.contactheader}>MY CONTACT APP</h1>
          <Layout/>
      </div>
    );
  }
}

export default App;
