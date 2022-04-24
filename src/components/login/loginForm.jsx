import React from "react";
import { Link } from "react-router-dom";
import Joi from "joi-browser";

import Form from "../commom/form";

class LoginForm extends Form {
	state = {
		data: { username: "", password: "" },
		errors: {},
	};

	schema = {
		username: Joi.string().required().label("Username"),
		password: Joi.string().required().label("Password"),
	};

	render() {
		return (
			<React.Fragment>
				<div className='container-bordered'>
					<h1>Login</h1>
					<br></br>

					<form onSubmit={this.handleSubmit}>
						{this.renderInput("username", "Username")}
						{this.renderInput("password", "Password", "password")}
						{this.renderButtonSubmit("Login")}
					</form>

					<br></br>
					<p>
						Not registered? <Link to='/sign-up/'>Sign Up</Link>
					</p>
				</div>
			</React.Fragment>
		);
	}

	doSubmit = () => {
		console.log("Singed In Successfully");
		// Call the server
		setTimeout(function () {
			window.location.href = "/movies/";
		}, 1000);
	};
}

export default LoginForm;
