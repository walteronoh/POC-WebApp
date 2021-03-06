import logo from './icon/openmrs.png';
import { Button, FormGroup, TextInput } from 'carbon-components-react';
import { useState } from 'react';
import React from 'react';

import getUser from './login-resource';
import { useHistory } from 'react-router-dom';

const errors = {
  emptyErr: "Both Fields Are Required",
  loginErr: "Invalid Login"
}

function Login() {
  const path = useHistory();
  const [username, setUsername] = useState("");
  const [pass, setPassword] = useState("");
  const [error, setErrors] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === '' || pass === '') {
      setErrors(errors.emptyErr);
    } else {
      const result = getUser(username, pass);
      result.then(resp => {
        let authorized = resp.authenticated;
        if (authorized === false) {
          setErrors(errors.loginErr)
        } else {
          setErrors("");
          sessionStorage.setItem("username", resp.user.username);
          sessionStorage.setItem("session-id", btoa(`${username}:${pass}`));
          path.push('/dashboard');
        }
      }).catch(error => {
        console.log(error.message)
      })
    }
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value.trim());
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value.trim());
  }


  return (
    <div className="login-form">
      <img className="logo" alt="Logo" src={logo} />
      <form onSubmit={handleSubmit}>
        <FormGroup legendText="">
          <TextInput placeholder="Username" onChange={handleUsernameChange} name="username" id="username" type="text" labelText="Username"></TextInput>
          <TextInput placeholder="Password" onChange={handlePasswordChange} name="pass" id="pass" type="password" labelText="Password"></TextInput>
        </FormGroup>
        <p className="error" data-testid="error-message">{error}</p>
        <Button className="login-btn" type="submit" disabled={username && pass ? false : true}>Login</Button>
      </form>
    </div>
  );
}

export default Login;