import { Component } from "react";
import axios from "axios";
import { Box, Flex } from "@chakra-ui/react";

export default class Blog extends Component {
  state = {
    blogData: [],
  };

  componentDidMount() {
    this.callUsingId();
  }

  callUsingId = () => {
    const { search_type, event_id } = this.props.params;
    let api_call =
      search_type === "teams"
        ? "getTeamsByEventId"
        : "getParticipantsByEventId";

    if (search_type) {
      axios
        .post(`http://localhost:5000/${search_type}/${api_call}`, {
          eventId: "6489c38a41c8d6b4df7e8744",
        })
        .then((response) => {
          this.setState({ blogData: response.data.result });
        });
    }
  };

  render() {
    const { blogData } = this.state;

    var team_field = "";
    console.log("blog" + JSON.stringify(blogData));
    if (blogData !== undefined) {
      Object.keys(blogData).forEach((key) => {
        if ("members" in blogData[key]) {
          if (blogData[key].members.length > 0) {
            team_field = blogData[key].members;
            // team_field = team_field.replace(/["\[\]]/g, "");
          }
        }
        // blogData[key]["members"] = team_field;
      });
    }

    const rowStyle = {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: "2px",
    };

    const colStyle = {
      flexBasis: "25%",
    };

    return (
      <Box
        id="forum_display"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        overflow="auto"
        textTransform="capitalize"
        padding="5"
      >
        <Flex style={rowStyle}>
          <Box style={colStyle}>name</Box>
          <Box style={colStyle}>description</Box>
          <Box style={colStyle}>team</Box>
          <Box style={colStyle}>join</Box>
        </Flex>
        {blogData.map((data) => (
          <Flex style={rowStyle}>
            <Box style={colStyle}>{data.leaderName}</Box>
            <Box style={colStyle}>{data.description}</Box>
            <Box style={colStyle}>{data.members}</Box>
            <Box style={colStyle}>invite to team</Box>
          </Flex>
        ))}
      </Box>
    );
  }
}
