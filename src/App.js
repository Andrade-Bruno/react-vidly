import React, { Component } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";

import NavBar from './components/commom/navbar';
import Customers from './components/customers/customers';
import Home from './components/home/home';
import Movies from './components/movies/movies';
import NotFound from './components/notFound';
import Rentals from './components/rentals/rentals';
import MovieVisualizer from './components/movies/movieVisualizer';

class App extends Component {
  render() {
    return (
    <React.Fragment>
      <NavBar />
      <div>
      <Switch>
        <Route path='/home' component={Home}/>
        
        <Route path='/movies' component={Movies}/>

        <Route path='/movieVisualizer' component={MovieVisualizer}/>
        <Route path='/customers' component={Customers}/>

        <Route path='/rentals' component={Rentals}/>

        <Route path='/not-found' component={NotFound}/>
        <Redirect path='/' exact to='/home'/>
        <Redirect to='/not-found' />
      </Switch>
      </div>
    </React.Fragment>
  )
}  
}

export default App;
