import { Component } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { Box, Button, Input } from "@chakra-ui/react";

class Login extends Component {
  clientId =
    "785122931249-jq77rqgu48s4r7uc63hjuteqa34pm93f.apps.googleusercontent.com";

  constructor(props) {
    const initClient = () => {
      gapi.client.init({
        clientId: this.clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);

    super(props);
  }

  validate() {
    let username = document.querySelector("#username");
    let password = document.querySelector("#password");
    //check in db
    console.log("db checked");
    return true;
  }

  onSuccess = (res) => {
    this.props.onLoginSuccess(res.profileObj);
  };

  onFailure = (err) => {
    console.log("failed:");
  };

  render() {
    return (
      <Box id="login-container">
        <form className="login-form">
          <h1>Login</h1>
          <Box className="content">
            <Box className="input-field">
              <Input
                id="username"
                type="email"
                placeholder="Email"
                autoComplete="nope"
              />
            </Box>
            <Box className="input-field">
              <Input
                id="password"
                type="password"
                placeholder="Password"
                autoComplete="new-password"
              />
            </Box>
            <a href="#" className="link">
              Forgot Your Password?
            </a>
          </Box>
          <Box className="action">
            <Button>Register</Button>
            <Button>Sign in</Button>
          </Box>
          <Box className="glog">
            <GoogleLogin
              clientId={this.clientId}
              buttonText="Sign in with Google"
              onSuccess={this.onSuccess}
              onFailure={this.onFailure}
              theme="dark"
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
            />
          </Box>
        </form>
      </Box>
    );
  }
}

export default Login;
