import { Component } from "react";
import axios from "axios";
import Options from "./Options";
import Form from "./Form";
import { Box } from "@chakra-ui/react";

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      current: "",
      event: "",
      last_data: this.data["preference"],
      level: 0,
      final_display: "",
      event_data: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/events/getEvents")
      .then((response) => {
        this.setState({
          event_data: response.data.result,
        });
      })
      .catch((error) => {
        console.log("An error occurred:", error);
      });
  }

  getEventId = () => {
    let event_name = this.state.event;
    let event_list = this.state.event_data;

    if (event_list !== undefined) {
      for (let key in event_list) {
        if (event_list[key].eventName === event_name) {
          return event_list[key]._id;
        }
      }
    }
  };

  // Optiontree
  data = {
    preference: {
      "Looking for team": {
        "Request to join a team": -1,
        "Post your availability": [
          "Get added in participants",
          "Post on forum",
        ],
      },
      "Forming a team": {
        "Send invite": -1,
        "Post for hiring": [
          "Add your team to participating list",
          "Mention your requirements and post on forum",
        ],
      },
    },
  };

  findFinal(curr) {
    let final = "";
    if (curr === "Request to join a team") {
      final = "teams";
    } else if (curr === "Send invite") {
      final = "participants";
    } else if (curr === "Post your availability") {
      final = "resume_form";
      this.setState({
        type: "finding",
      });
    } else {
      final = "hire_form";
      this.setState({
        type: "hiring",
      });
    }

    this.setState({
      final_display: final,
    });
    return final;
  }

  onEventFn = (e) => {
    let c = e.target.innerText;

    if (this.state.level === 0) {
      //first click so note the event
      this.setState({
        event: c,
      });
    }

    //events done
    if (this.state.level === 1) {
      // start updating json object once initial event is over
      let new_data = this.state.last_data[c];
      this.setState({
        last_data: new_data,
      });
    }

    // update level and event
    let next_level = this.state.level + 1;
    this.setState({
      current: c,
      level: next_level,
    });

    //stores final options
    if (this.state.level === 2) {
      this.findFinal(c);
    }
  };

  render() {
    //SHOW USER ALL OPTIONS
    let num;
    //all variables that need changing needs to be in fns like render otherwise it wont get updated in class
    let curr = this.state.current;
    //this.curr means keeping curr outside gives error
    const { final_display, level } = this.state;

    let event_list = [];
    for (const obj of this.state.event_data) {
      event_list.push(obj.eventName);
    }
    this.data["event"] = event_list;

    //display event list
    if (level < 3) {
      if (level === 0) {
        num = this.data["event"].length;
        return (
          <Options
            total={num}
            data={this.data["event"]}
            onEvent={this.onEventFn}
          />
        );
      } else {
        //this has to be checked
        let temp = Object.keys(this.state.last_data);
        num = temp.length;
        return <Options total={num} data={temp} onEvent={this.onEventFn} />;
      }
    }

    // PROVIDE FORMS
    else if (final_display === "teams" || final_display === "participants") {
      return this.props.navToForum(final_display, this.getEventId());
    } else {
      return (
        <Box>
          <Form
            profileData={this.props.profileData}
            event_data={this.state.event_data}
            curr_event={this.state.event}
            type={this.state.type}
          />
        </Box>
      );
    }
  }
}

export default Select;
