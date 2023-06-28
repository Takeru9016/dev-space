import React from "react";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";

import Options from "./Options";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    //for now write page refresh code after form submit
    this.state = {
      members: new Array(),
    };
  }

  postOnForum = () => {
    let profile_data = this.props.profileData;
    let box = document.querySelector("#post_box");
    if (profile_data.name == undefined) profile_data.name = "need login";

    //post only if person is logged in

    axios.post("http://localhost:5000/participant/addParticipantAndTeam", {
      google_id: `${profile_data.googleId}`,
      desc: `${box.value}`,
      event_id: this.getEventId(),
      type_id: `${this.props.type}`,
      team: `${JSON.stringify(this.state.members)}`,
    });
  };

  getEventId = () => {
    let event_name = this.props.curr_event;
    let event_list = this.props.event_data;

    if (event_list != undefined) {
      for (let key in event_list) {
        if (event_list[key].eventName == event_name) {
          return event_list[key]._id;
        }
      }
    }
  };

  /* When the user clicks on the button,
	toggle between hiding and showing the dropdown content */
  searchToggle = (e) => {
    e.preventDefault();
    document.getElementById("myDropdown").classList.toggle("show");
  };

  addUnknownMember = (e) => {
    e.preventDefault();
    if (this.state.members.length < 4) {
      let input = document.getElementById("myInput");
      let member_name = input.value[0].toUpperCase() + input.value.slice(1);
      let new_list = [...this.state.members];
      new_list.push(member_name);
      this.setState({
        members: new_list,
      });
    }
  };

  addMember = (e) => {
    e.preventDefault();
    let new_list = [...this.state.members];
    if (this.state.members.length < 4) {
      new_list.push(e.target.innerText);
    } else {
      new_list.splice(0, 1); // 2nd parameter means remove one item only
      new_list.push(e.target.innerText);
      // also you should put back removed child in search opts
    }
    this.setState({
      members: new_list,
    });
    e.target.parentNode.removeChild(e.target);
    document.getElementById("myDropdown").classList.toggle("show");
  };

  filterFunction = () => {
    let input, filter, a, i, div, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  };

  render() {
    return (
      <Box>
        <form action="">
          <FormLabel className="title">Post on forum</FormLabel>
          <FormLabel>Describe your skills in 5-15 words</FormLabel>
          <Flex justify="space-between">
            <Textarea
              id="post_box"
              rows="10"
              maxLength="100"
              placeholder="React, HTML, CSS
            SQL 
            Invictus finalist"
            />
            <Box
              id="team-box"
              d="flex"
              flexDir="column"
              justifyContent="center"
            >
              <FormLabel>Already got existing members ?</FormLabel>
              <Box className="dropdown">
                <Input
                  type="text"
                  placeholder="Search.."
                  id="myInput"
                  onClick={this.searchToggle}
                  onKeyUp={this.filterFunction}
                />
                <Button
                  colorScheme="teal"
                  className="btn-success"
                  onClick={this.addUnknownMember}
                >
                  +
                </Button>
                <Box id="myDropdown" className="dropdown-content">
                  <Button href="#" onClick={this.addMember}>
                    Shaun
                  </Button>
                  <Button href="#" onClick={this.addMember}>
                    Harsh
                  </Button>
                  <Button href="#" onClick={this.addMember}>
                    Mukul
                  </Button>
                </Box>
              </Box>

              <Options
                total={this.state.members.length}
                data={this.state.members}
                onEvent={() => {}}
              />
            </Box>
          </Flex>
          <Button colorScheme="teal" mt={4} onClick={this.postOnForum}>
            Post
          </Button>
          <Button colorScheme="teal" mt={4}>
            Or, just get added to participant list
          </Button>
        </form>
      </Box>
    );
  }
}
