import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import auth from "./services/authService";

import NotFound from "./components/notFound";
import SignUp from "./components/signup/signUpForm";
import LoginForm from "./components/login/loginForm";
import Logout from "./components/login/logout";
import Home from "./components/home/home";
import Movies from "./components/movies/movies";
import MovieForm from "./components/movies/movieForm";
import Customers from "./components/customers/customers";
import CustomersForm from "./components/customers/customersForm";
import Rentals from "./components/rentals/rentals";
import urlLogo from "./logo.png";
import NavBar from "./components/commom/navbar";

class App extends Component {
	state = {};

	componentDidMount() {
		const user = auth.getUser();
		this.setState({ user });
	}

	render() {
		return (
			<main className='container'>
				<ToastContainer
					position='top-center'
					autoClose={2000}
					hideProgressBar={false}
					newestOnTop={true}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss={false}
					draggable
					pauseOnHover
				/>
				<img src={urlLogo} alt='Logo' />
				<NavBar user={this.state.user} />
				<Switch>
					<Route path='/sign-up/' exact component={SignUp} />
					<Route path='/login/' exact component={LoginForm} />
					<Route path='/logout/' exact component={Logout} />

					<Route path='/home/' exact component={Home} />

					<Route path='/movies/' exact component={Movies} />
					<Route path='/movies/:id/' exact component={MovieForm} />

					<Route path='/customers/' exact component={Customers} />
					<Route path='/customers/:id/' exact component={CustomersForm} />

					<Route path='/rentals/' exact component={Rentals} />

					<Route path='/not-found/' component={NotFound} />
					<Redirect from='/' exact to='/login/' />
					<Redirect to='/not-found/' />
				</Switch>
			</main>
		);
	}
}

export default App;
