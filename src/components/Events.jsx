import { Box, Flex, Button } from "@chakra-ui/react";

export default function Events() {
  return (
    <Flex
      align="center"
      justify="center"
      py={16}
      px={8}
      bgGradient="linear(to-r, blue.500, white)"
    >
      <Box>
        <Button colorScheme="teal" size="lg" mr={4}>
          ETH India
        </Button>
        <Button colorScheme="teal" size="lg" mr={4}>
          Kickstart
        </Button>
        <Button colorScheme="teal" size="lg">
          Cult Treasure Hunt
        </Button>
      </Box>
    </Flex>
  );
}
