import React, { useState, useEffect } from "react";
import { Select, MenuItem, FormControl, TextField } from "@material-ui/core";
import "./position.scss";
import "./registration.scss";
import * as UserService from "../../services/UserService";
import * as BillingAccount from "../../services/BillingAccount";
import * as LoginService from "../../services/LoginService";
import { Label } from "semantic-ui-react";
const ProfilePage = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [deposit, setDeposit] = useState(0);
  const onSubmit = () => {
    UserService.updateUser(
      {
        id: currentUser.id,
        username: username,
        email: email,
        password: password,
        games: currentUser.games,
      },
      deposit
    );
  };

  const onDelete = () => {
    UserService.deleteUser(currentUser.id);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
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

  useEffect(() => {
    async function fetchData() {
      const user = await LoginService.getLoggedUser();
      const billing =
        user !== null ? await BillingAccount.getBillingAccount(user.id) : 0;
      setCurrentUser(user);
      setDeposit(billing.deposit);
      if (user !== null) {
        setUsername(user.username);
        setEmail(user.email);
        setPassword(user.password);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <nav class="navbar">
        <a href="/" class="navbar__logo">
          Game Shop :P
        </a>
        <div class="navbar__bars">
          <i class="fas fa-bars"></i>
        </div>
        <div class="navbar__menu">
          <a href="/" class="navbar__menu--links">
            Home
          </a>
          <a href="/games" class="navbar__menu--links">
            Games
          </a>
          <a href="/profile" class="navbar__menu--links">
            Profile
          </a>
        </div>
      </nav>
      <form class="html">
        {currentUser && deposit && (
          <div class="container">
            <h1>Profile</h1>
            <div className="mw-100 mx-2 mt-2">
              <TextField
                onChange={handleUsername}
                defaultValue={currentUser.username}
                type="text"
                label="Username"
                name="Username"
                id="Username"
                required
              />
            </div>
            <div className="mw-100 mx-2 mt-2">
              <TextField
                onChange={handleEmail}
                defaultValue={currentUser.email}
                type="text"
                label="Email"
                name="email"
                id="email"
                required
              />
            </div>
            <div className="mw-100 mx-2 mt-2">
              <TextField
                onChange={handlePassword}
                defaultValue={currentUser.password}
                type="text"
                label="Password"
                name="psw"
                id="psw"
                required
              />
            </div>
            <div className="mw-100 mx-2 mt-2">
              <TextField
                onChange={handleDeposit}
                defaultValue={deposit}
                type="text"
                label="Deposit"
                name="deposit"
                id="deposit"
                required
              />
            </div>
            <Label id="games-label">Games</Label>
            <FormControl style={{ minWidth: 120 }}>
              <Select
                labelId="games-label"
                id="games"
                value={currentUser.games}
              >
                {currentUser.games.map((g) => (
                  <MenuItem key={g.id} value={g.name}>
                    {g.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <hr />
            <button
              class="hero__container--btn"
              onClick={() => onSubmit()}
              className="btn btn-lg btn-secondary"
            >
              Edit
            </button>
            <button
              class="hero__container--btn"
              onClick={() => onDelete()}
              className="btn btn-lg btn-secondary"
            >
              Delete
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
        )}
      </form>
    </>
  );
};

export default ProfilePage;
