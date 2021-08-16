
import './App.css';

import { NavigationBar } from './components/NavigationBar';
import Home from "./components/Home.js";
import Dashboard from "./components/Dashboard.js";

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
              <Route path="/dashboard/:id" component={Dashboard} />
            </Switch>
          </Router>
        </React.Fragment>
                  
);


export default App;
