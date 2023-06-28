import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Blog from "../components/Blog";

function withParams(Component) {
  return (props) => {
    const params = useParams();
    return <Component {...props} params={params} />;
  };
}

class Forum extends React.Component {
  componentDidMount() {
    this.callUsingId();
  }

  callUsingId = () => {
    const { search_type, event_id } = this.props.params;
    console.log("search_type: " + search_type);
  };

  render() {
    return (
      <Layout title="Forum /teamfinder">
        <div className="container flex justify-content-center items-center h-screen">
          <Blog params={this.props.params} />
        </div>
      </Layout>
    );
  }
}

export default withParams(Forum);
