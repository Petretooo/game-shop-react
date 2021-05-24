import { useState } from "react";
import "./position.scss";
import "./registration.scss";
import { Redirect, Link } from 'react-router-dom';
import * as LoginService from '../../../services/LoginService'


const LoginPage = () => {

  const [userData, setUserData] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState('');

  const onInputChange = (event) => {
      event.persist();

      setUserData((prevState) => ({
          ...prevState,
          [event.target.name]: event.target.value
      }));
  }

  const onFormSubmit = (event) => {
      event.preventDefault();

      LoginService.login(userData).then(_ => {
          console.log('success!');
          setRedirect(true);
      })
      .catch(err => setError(err.message));
  }

  return (
        <>
        { redirect && <Redirect to='/' /> }
        <div className="html">           
            <form className="login-form" onSubmit={onFormSubmit}>
            { error && <span className="text-danger">{error}</span>}
                <div className="form-group">
                    <label htmlFor="email">Username: </label>
                    <input type="text" id="username" name="username" className="form-control" onChange={onInputChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" name="password" className="form-control" onChange={onInputChange} required/>
                </div>
                <button className="btn btn-primary">Login</button>             
            </form>
        </div>
        </>
    );

    // return(
    //     <form class="html">
    //     <div>
    //         <div class="container">
    //         <h1>Log In</h1>

    //         <label for="username">
    //           <b>Username</b>
    //         </label>
    //         <input
    //           onChange={handleUsername}
    //           type="text"
    //           placeholder="Enter Username"
    //           name="username"
    //           id="username"
    //           required
    //         />

    //         <label for="psw">
    //           <b>Password</b>
    //         </label>
    //         <input
    //           onChange={handlePassword}
    //           type="password"
    //           placeholder="Enter Password"
    //           name="password"
    //           id="password"
    //           required
    //         />

    //         <hr />
    //         <button
    //           onSubmit={() => handleLogin()}
    //           className="btn btn-lg btn-secondary"
    //         >
    //           Log In
    //         </button>
    //         <br />
    //         <br />
    //         <a className="btn btn-lg btn-secondary" href="/">
    //           Back
    //         </a>
    //       </div>
    //     </div>
    //     </form>
    // );
}

export default LoginPage;