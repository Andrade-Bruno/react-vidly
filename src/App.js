import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import NavBar from "./components/commom/navbar";
import NotFound from "./components/notFound";
import LoginForm from "./components/login/loginForm";
import Home from "./components/home/home";
import Movies from "./components/movies/movies";
import MovieForm from "./components/movies/movieForm";
import Customers from "./components/customers/customers";
import Rentals from "./components/rentals/rentals";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route path="/login/" exact component={LoginForm} />
          <Route path="/home/" exact component={Home} />

          <Route path="/movies/" exact component={Movies} />
          <Route path="/movies/:id" exact component={MovieForm} />

          <Route path="/customers/" exact component={Customers} />

          <Route path="/rentals/" exact component={Rentals} />

          <Route path="/not-found/" component={NotFound} />
          <Redirect from="/" exact to="/home/" />
          <Redirect to="/not-found/" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
