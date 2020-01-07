import React, { Component } from "react";

export class Test extends Component {
  state = {
    title: "",
    body: ""
  };
  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>Test Component</h1>
      </div>
    );
  }
}

export default Test;
