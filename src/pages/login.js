import logo from '../icon/openmrs.png';
import { Button, FormGroup, TextInput} from 'carbon-components-react';
function Login() {
  return (
    <div className="login-form">
        <img className="logo" alt="Logo" src={logo} />
      <form>
        <FormGroup>
          <TextInput placeholder="Username" id="username" type="text" labelText="Username"></TextInput>
          <TextInput placeholder="Password" id="pass" type="password" labelText="Password"></TextInput>
        </FormGroup>
        <Button className="login-btn" type="submit">Login</Button>
      </form>
    </div>
  );
}

export default Login;