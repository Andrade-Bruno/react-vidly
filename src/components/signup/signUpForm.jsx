import React from "react";
import { Link } from "react-router-dom";
import Joi from "joi-browser";

import Form from "../commom/form";

class SignUp extends Form {
	state = {
		data: { name: "", email: "", password: "" },
		errors: {},
	};

	schema = {
		name: Joi.string().required().label("Name"),
		email: Joi.string().required().label("Email").email(),
		password: Joi.string().required().label("Password").min(5),
	};

	render() {
		return (
			<React.Fragment>
				<div className='container-bordered'>
					<h1>Sign Up</h1>
					<br></br>
					<form onSubmit={this.handleSubmit}>
						{this.renderInput("name", "Name")}
						{this.renderInput("email", "Email", "email")}
						{this.renderInput("password", "Password", "password")}
						{this.renderButtonSubmit("Sign Up")}
						<br></br>
						<p>
							Already registered? <Link to='/login/'>Login</Link>
						</p>
					</form>
				</div>
			</React.Fragment>
		);
	}

	doSubmit = () => {
		console.log("Signed Up Successfully");
		// Call the server
		setTimeout(function () {
			window.location.href = "/movies/";
		}, 1000);
	};
}

export default SignUp;
