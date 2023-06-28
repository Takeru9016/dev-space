import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { images } from "../assets";

export default function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      {/* Other components */}
    </>
  );
}

function Navbar() {
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
        <Button colorScheme="teal">
          <Link to="/signin">Sign In</Link>
        </Button>
      </Flex>
    </Flex>
  );
}

function HeroSection() {
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
    </Flex>
  );
}
