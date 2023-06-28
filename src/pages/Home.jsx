import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "../components/Landing";
import Login from "../components/Login";
import NavigateToPage from "../components/NavigateToPage";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: 0,
      profileData: {},
    };
  }

  handleLoginSuccess = (data) => {
    console.log("successful login");
    this.setState({
      login: 2,
      profileData: data,
    });
  };

  handleLogin = () => {
    this.setState({
      login: 1,
    });
  };

  navToForum = (search_t, e_id) => {
    return (
      <NavigateToPage
        parameter={{
          search_type: search_t,
          event_id: e_id,
        }}
      />
    );
  };

  render() {
    const LandingAndLogin = () => (
      <div>
        <Landing
          navToForum={this.navToForum}
          profileData={this.state.profileData}
          onLogin={this.handleLogin}
        />
        <Login onLoginSuccess={this.handleLoginSuccess} />
      </div>
    );

    return (
      <Routes>
        {this.state.login === 0 || this.state.login === 2 ? (
          <Route
            path="/"
            element={
              <Landing
                navToForum={this.navToForum}
                profileData={this.state.profileData}
                onLogin={this.handleLogin}
              />
            }
          />
        ) : (
          <Route path="/" element={<LandingAndLogin />} />
        )}
      </Routes>
    );
  }
}

export default Home;
