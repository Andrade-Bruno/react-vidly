import Joi from "joi-browser";
import React, { Component } from "react";
import Input from "../commom/input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required(),
    password: Joi.string().required(),
  };

  render() {
    const { account, errors } = this.state;

    return (
      <React.Fragment>
        <div className="container">
          <h1>Login</h1>
          <br></br>

          <form onSubmit={this.handleSubmit}>
            <Input
              label="Username"
              name="username"
              value={account.username}
              onChange={this.handleChange}
              error={errors.username}
            />
            <Input
              label="Password"
              name="password"
              value={account.password}
              onChange={this.handleChange}
              error={errors.password}
            />
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    // If errorMessage is truphy
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    this.setState({ errors });

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    // The new state always have to be an Object, can't be a null value (this happens if valite() returns null)
    this.setState({ errors: errors || {} });
    if (errors) return false;

    console.log(errors);
    // Call the server
    console.log("Submitted");
  };

  validate = () => {
    const result = Joi.validate(this.state.account, this.schema, {
      abortEarly: false,
    });
    console.log(result);

    const errors = {};

    const { account } = this.state;
    if (account.username.trim() === "")
      errors.username = "Username is required";
    if (account.password.trim() === "")
      errors.password = "Password is required";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  validateProperty = (input) => {
    if (input.value.trim() === "") return `Oops! We noticed you unfilled here.`;
  };
}

export default LoginForm;
