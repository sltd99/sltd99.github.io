import React, { Component } from "react";
import db from "./firestore";

const Context = React.createContext();
const Consumer = Context.Consumer;

const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };

    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };

    case "EDIT_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id
            ? (contact = action.payload)
            : contact
        )
      };

    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    contacts: [],
    dispatch: action => this.setState(state => reducer(state, action))
  };

  componentDidMount() {
    // const snapshot = await db.collection("contacts").get();
    // const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // this.setState({ contacts: data });

    db.collection("contacts").onSnapshot(snapshot =>
      snapshot.docChanges().forEach(change => {
        switch (change.type) {
          case "added":
            this.state.dispatch({
              type: "ADD_CONTACT",
              payload: { id: change.doc.id, ...change.doc.data() }
            });
            break;

          case "modified":
            this.state.dispatch({
              type: "EDIT_CONTACT",
              payload: { id: change.doc.id, ...change.doc.data() }
            });
            break;

          case "removed":
            this.state.dispatch({
              type: "DELETE_CONTACT",
              payload: change.doc.id
            });
            break;
          default:
        }
      })
    );
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export { db, Consumer };
