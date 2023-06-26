import { Box, Flex, Text, Button } from "@chakra-ui/react";

import { images } from "../assets";

export default function HeroSection() {
  return (
    <Flex bgGradient="linear(to-r, blue.500, white)" align="center" justify="space-between" py={16} px={8}>
      <Box flex="1">
        <Text fontSize="4xl" fontWeight="bold" mb={4}>
          Welcome to Our Team Building Platform
        </Text>
        <Text fontSize="4xl" fontWeight="bold" mb={4}>
          Your Dream, Your Team
        </Text>
        <Text fontSize="xl" mb={8}>
          Hackathons, mini projects, cult events<br />
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

