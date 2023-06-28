import { Button } from "@chakra-ui/react";

export default function Option(props) {
  return (
    <Button
      colorScheme="teal"
      className="btn-success"
      onClick={props.onEvent}
    >
      {props.value}
    </Button>
  );
}