import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import { Nav, NavItem } from "shards-react";

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import Smurf from './components/Smurf';

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
              <NavLink exact to="/">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/add-smurf">
                Add Smurf
              </NavLink>
            </NavItem>
          </Nav>
        </nav>

        <Route exact path="/" render={props => (<Smurfs {...props} smurfs={this.state.smurfs} />)} />
        <Route exact path="/add-smurf" render={props => (<SmurfForm {...props} addSmurf={this.addSmurf} />)} />
        <Route path="/smurf/:id" component={Smurf} />
      </div>
    );
  }
}

export default App;
