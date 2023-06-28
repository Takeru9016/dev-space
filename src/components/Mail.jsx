import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, List, ListItem, Text, Button, Divider } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Mail() {
  const [mailData, setMailData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/invites/getInvites")
      .then((response) => {
        setMailData(response.data.result);
        // console.log("response", mailData[0]);
      })
      .catch((error) => {
        console.log("An error occurred:", error);
      });
  }, []);

  return (
    <Box width="100%">
      <List width="80%" margin="3em auto" backgroundColor="gray.200">
        {mailData.map((mail) => (
          <React.Fragment key={mail._id}>
            <ListItem>
              <Text flex="0 0 9em">{mail.sender}</Text>
              <Text flex="1 0 20%">{`Join my team for ${mail.eventName}`}</Text>
              <Button>
                <FontAwesomeIcon icon={faCheck} />
              </Button>
              <Button>
                <FontAwesomeIcon icon={faTimes} />
              </Button>
            </ListItem>
            <ListItem>
              <Text>{mail.name_list}</Text>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}
