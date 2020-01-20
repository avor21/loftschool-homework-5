import React, {Component} from 'react';
import './App.css';
import {addListener, removeListener, isAuthorized} from './AuthorizeApi';
import {Link, Route, Switch} from "react-router-dom";
import Home from "./Home";
import Auth from "./Auth";
import Private from "./Private";
import Public from "./Public";

class App extends Component {
  state = {
    isAuthorized
  };

  componentDidMount() {
    addListener(this.handleAuthorize);
  }

  componentWillUnmount() {
    removeListener(this.handleAuthorize);
  }

  handleAuthorize = isAuthorized => {
    this.setState({isAuthorized});
  };

  render() {
    return (
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/auth">Login</Link></li>
            <li><Link to="/private">Private page</Link></li>
            <li><Link to="/public">Public page</Link></li>
          </ul>
        </nav>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" component={Auth} />
          <Route path="/private" component={Private} />
          <Route path="/public" component={Public} />
        </Switch>
      </div>
    );
  }
}

export default App;
