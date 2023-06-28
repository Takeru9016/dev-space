import { Component } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { Link, Routes, Route } from "react-router-dom";

import Events from "./Events";
import Select from "./Select";
import { images } from "../assets";

class Landing extends Component {
  render() {
    let loginbtn = (
      <Button colorScheme="teal" onClick={this.props.onLogin}>
        <Link to="/signin">Login</Link>
      </Button>
    );

    if (this.props.profileData !== undefined) {
      const data = this.props.profileData;
      if (Object.keys(data).length > 0) {
        const first_name = data.name.split(" ")[0];
        loginbtn = <div id="profile-box">{first_name}</div>;
      }
    }

    return (
      <>
        <Navbar
          onLogin={this.props.onLogin}
          profileData={this.props.profileData}
          loginbtn={loginbtn}
        />
        <HeroSection
          navToForum={this.props.navToForum}
          profileData={this.props.profileData}
        />
        <Events />
      </>
    );
  }
}

class Navbar extends Component {
  render() {
    const { loginbtn } = this.props;

    return (
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        py={8}
        px={20}
        bgGradient="linear(to-r, blue.500, white)"
      >
        <Box>
          <Text
            className="flex justify-center gap-5"
            fontSize="lg"
            color="black"
            fontWeight="bold"
          >
            <img src={images.logo} alt="logo" />
            <Link to="/">Dev Space</Link>
          </Text>
        </Box>
        <Flex align="center">
          <Button variant="ghost" mr={2}>
            <Link to="/forum">Forum</Link>
          </Button>
          <Button variant="ghost" mr={2}>
            <Link to="/inbox">Inbox</Link>
          </Button>
          {loginbtn}
        </Flex>
      </Flex>
    );
  }
}

function HeroSection(props) {
  return (
    <Flex
      bgGradient="linear(to-r, blue.500, white)"
      align="center"
      justify="space-between"
      py={16}
      px={8}
    >
      <Box flex="1">
        <Text fontSize="4xl" fontWeight="bold" mb={4}>
          Welcome to Our Team Building Platform
        </Text>
        <Text fontSize="4xl" fontWeight="bold" mb={4}>
          Your Dream, Your Team
        </Text>
        <Text fontSize="xl" mb={8}>
          Hackathons, mini projects, cult events
          <br />
          Find the right people or help them find you
        </Text>
        <Button colorScheme="teal" size="lg">
          Build that team now
        </Button>
      </Box>
      <Box flex="1">
        <img src={images.team} alt="team" />
      </Box>
      <Routes>
        <Route
          path=""
          element={
            <Select
              navToForum={props.navToForum}
              profileData={props.profileData}
            />
          }
        />
      </Routes>
    </Flex>
  );
}

export default Landing;
