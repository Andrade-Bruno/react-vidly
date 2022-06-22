import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Joi from "joi-browser";

import userService from "../../services/userService";
import auth from "../../services/authService";
import fn from "../../utils/functions";
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
					</form>
					<br></br>
					<p>
						Already registered? <Link to='/login/'>Login</Link>
					</p>
				</div>
			</React.Fragment>
		);
	}

	doSubmit = async () => {
		try {
			const response = await userService.register(this.state.data);
			auth.loginWithJWT(response.headers["x-auth-token"]);

			toast.success("Signed up successfully");
			setTimeout(function () {
				window.location = "/";
			}, 2000);
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.password = ex.response.data;
				toast.warn(`${ex.response.data}`);
				this.setState({ errors });
			}
		}
	};
}

export default SignUp;
