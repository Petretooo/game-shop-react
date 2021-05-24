import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import "./position.scss";
import "./registration.scss";
import "./RegistrationPage.scss";
import * as UserService from "../../services/UserService";
import * as LoginService from "../../services/LoginService";
import { ObjectID } from "bson";

const RegistrationPage = () => {
  const [username, setUsernamae] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [redirect, setRedirect] = useState(false);
  const [deposit, setDeposit] = useState();

  const handleUsername = (e) => {
    setUsernamae(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleDeposit = (e) => {
    setDeposit(new Number(e.target.value));
  };

  const createUser = () => {
    UserService.createUser(
      {
        id: new ObjectID(),
        username: username,
        email: email,
        password: password,
        games: [],
      },
      deposit
    ).then(() => {
      setRedirect(true);
    });
  };

  return (
    <div class="html">
      {redirect && <Redirect to="/" />}
      <div class="container">
        <h1>Register</h1>

        <label for="username">
          <b>Username</b>
        </label>
        <input
          onChange={handleUsername}
          type="text"
          placeholder="Enter Username"
          name="Username"
          id="Username"
          required
        />

        <label for="email">
          <b>Email</b>
        </label>
        <input
          onChange={handleEmail}
          type="text"
          placeholder="Enter Email"
          name="email"
          id="email"
          required
        />

        <label for="psw">
          <b>Password</b>
        </label>
        <input
          onChange={handlePassword}
          type="password"
          placeholder="Enter Password"
          name="psw"
          id="psw"
          required
        />
        <label for="deposit">
          <b>Deposit</b>
        </label>
        <input
          onChange={handleDeposit}
          type="text"
          placeholder="Enter Deposit"
          name="deposit"
          id="deposit"
          required
        />

        <hr />
        <button
          class="hero__container--btn"
          onClick={createUser}
          className="btn btn-lg btn-secondary"
        >
          Register
        </button>
        <br />
        <br />
        <a
          class="hero__container--btn"
          className="btn btn-lg btn-secondary"
          href="/"
        >
          Back
        </a>
      </div>
    </div>
  );
};

export default RegistrationPage;
