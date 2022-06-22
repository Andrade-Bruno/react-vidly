import React from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import Joi from "joi-browser";

import fn from "../../utils/functions";
import auth from "../../services/authService";

import Form from "../commom/form";

class LoginForm extends Form {
	state = {
		data: { email: "", password: "" },
		errors: {},
	};

	schema = {
		email: Joi.string().required().label("E-mail"),
		password: Joi.string().required().label("Password"),
	};

	render() {
		if (auth.getUser()) return <Redirect to='/' />;

		return (
			<React.Fragment>
				<div className='container-bordered'>
					<h1>Login</h1>
					<br></br>

					<form onSubmit={this.handleSubmit}>
						{this.renderInput("email", "E-mail", "email")}
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

	doSubmit = async () => {
		try {
			const { data } = this.state;

			await auth.login(data.email, data.password);

			toast.success("Singed in successfully! Please await...");
			const { state } = this.props.location;
			setTimeout(function () {
				window.location = state ? state.from.pathname : "/";
			}, 2000);
		} catch (ex) {
			fn.handleBadRequest(ex);
		}
	};
}

export default LoginForm;
