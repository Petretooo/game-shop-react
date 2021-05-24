import React, { Component } from "react";
import { Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import GamePage from "./pages/GamePage/GamePage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import Login from "./components/Auth/Login/Login";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <switch>
          <Route exact={true} path="/" component={HomePage}></Route>
          <Route exact={true} path="/games" component={GamePage}></Route>
          <Route
            exact={true}
            path="/registration"
            component={RegistrationPage}
          ></Route>
          <Route exact={true} path="/login" component={Login}></Route>
          <Route exact={true} path="/profile" component={ProfilePage}></Route>
        </switch>
      </div>
    );
  }
}

export default App;
