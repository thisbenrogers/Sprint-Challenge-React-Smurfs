import React, { Component } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import { Nav, NavItem, NavLink as ShardLink } from "shards-react";

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
      smurf: {
        name: "",
        age: "",
        height: ""
      }
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  componentDidMount() {
    axios
      .get('http://localhost:3333/smurfs')
      .then(res => this.setState({ smurfs: res.data }))
      .catch(error => console.log(error));
  }

  addSmurf = smurf => {
    console.log(smurf);
    console.log("Adding smurf");
    axios
      .post('http://localhost:3333/smurfs', smurf)
      .then(res => {
        this.setState({ smurfs: res.data });
        // this.props.history.push('/smurfs');
      })
      .catch(err => console.log(err));
  }

  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (
      <div className="App">
        <nav>
          <h1>Smurf Village</h1>
          <Nav fill>
            <NavItem>
              <ShardLink>
                <NavLink exact to="/">
                  Home
                </NavLink>
              </ShardLink>
            </NavItem>
            <NavItem>
              <ShardLink>
                <NavLink to="/smurfForm">
                  Add Smurf
                </NavLink>
              </ShardLink>
            </NavItem>
          </Nav>
        </nav>

        <Route exact path="/" render={props => (<Smurfs {...props} smurfs={this.state.smurfs} />)} />
        <Route path="/add-smurf" render={props => (<SmurfForm {...props} addSmurf={this.addSmurf} />)} />
      </div>
    );
  }
}

export default App;
