import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { images } from "../assets";

export default function Navbar() {
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
        <Text className="flex justify-center gap-5" fontSize="lg" color="black" fontWeight="bold">
          <img src={images.logo} alt="logo" />
          Dev Space
        </Text>
      </Box>
      <Flex align="center">
        <Button variant="ghost" mr={2}>
          Forum
        </Button>
        <Button variant="ghost" mr={2}>
          Inbox
        </Button>
        <Button colorScheme="teal">Sign In</Button>
      </Flex>
    </Flex>
  );
}
