
import './App.css';

import { NavigationBar } from './components/NavigationBar';
import Home from "./components/Home.js";
import LookerContent from './components/LookerContent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';


const App = () => (

        <React.Fragment>
          <Router>
            <NavigationBar />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/dashboard/:id" render={props => <LookerContent {...props} contentType="dashboard"/>}/>
              <Route path="/look/:id" render={props => <LookerContent {...props} contentType="look"/>}/>
              <Route path="/explore/:id"  render={props => <LookerContent {...props} contentType="explore"/>}/>
            </Switch>
          </Router>
        </React.Fragment>
                  
);


export default App;
