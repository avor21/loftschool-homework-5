import React, {Component} from 'react';
import {authorizeUser} from "./AuthorizeApi";
import { Redirect } from 'react-router-dom';

class Auth extends Component {
  state = {
    email: '',
    password: '',
    isAuthorized: null
  };

  inputHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  };

  render() {
    const { email, password, isAuthorized } = this.state;

    if (isAuthorized) return <Redirect to="/" />;

    const hasError = isAuthorized !== null && !isAuthorized;
    return (
      <form>
        <div>
          <label htmlFor="email">Email:</label>
          <input name="email"
                 value={email}
                 onChange={this.inputHandler} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input name="password"
                 type="password"
                 value={password}
                 onChange={this.inputHandler} />
        </div>
        { hasError && <p>Неверный Email и/или пароль</p> }
        <button onClick={this.handleSubmit}>Submit</button>
      </form>
    );
  }

  handleSubmit = (event) => {
    const { email, password } = this.state;
    event.preventDefault();
    this.setState({ isAuthorized: authorizeUser(email, password) });
  }
}

export default Auth;
