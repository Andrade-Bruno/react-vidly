import React, { Component } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";

import NavBar from './components/commom/navbar';
import Customers from './components/customers/customers';
import Home from './components/home/home';
import Movies from './components/movies/movies';
import NotFound from './components/notFound';
import Rentals from './components/rentals/rentals';
import MovieForm from './components/movies/movieForm';

class App extends Component {
  render() {
    return (
    <React.Fragment>
      <NavBar />
      <div>
      <Switch>
        <Route path='/home/' exact component={Home}/>
        
        <Route path='/movies/' exact component={Movies}/>
        <Route path='/movies/:id' exact component={MovieForm}/>

        <Route path='/customers/' exact component={Customers}/>

        <Route path='/rentals/' exact component={Rentals}/>

        <Route path='/not-found/' component={NotFound}/>
        <Redirect from='/' exact to='/home/'/>
        <Redirect to='/not-found/' />
      </Switch>
      </div>
    </React.Fragment>
  )
}  
}

export default App;
