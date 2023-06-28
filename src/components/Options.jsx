import React from "react";
import { Flex } from "@chakra-ui/react";

import Option from "./Option.jsx";

class Options extends React.Component {
  renderSquare(e, onEventFn) {
    return <Option value={e} key={e} onEvent={onEventFn} />;
  }

  render() {
    var n = this.props.total;
    const rows = [];
    for (let i = 0; i < n; i++) {
      rows.push(this.renderSquare(this.props.data[i], this.props.onEvent));
    }
    return <Flex className="option-row">{rows}</Flex>;
  }
}

export default Options;
