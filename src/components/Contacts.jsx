import React, { Component, Fragment } from "react";
import Contact from "./Contact";
import { Consumer } from "../context";

export class Contacts extends Component {
  render() {
    return (
      <Consumer>
        {value => (
          <Fragment>
            {value.contacts.map(contact => (
              <Contact key={contact.id} contact={contact} />
            ))}
          </Fragment>
        )}
      </Consumer>
    );
  }
}

export default Contacts;
