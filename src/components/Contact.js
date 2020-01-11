import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { db, Consumer } from "../context";

class Contact extends Component {
  state = {
    showContactInfo: false
  };

  contactListener = e => {
    const classList = e.target.classList;
    // Drop down
    if (classList.contains("fa-sort-down")) {
      this.setState({ showContactInfo: !this.state.showContactInfo });
    }
    // Delete
    else if (classList.contains("fa-trash")) {
      this.deleteContact();
    }

    // Update
  };

  deleteContact = async (id, dispatch) => {
    await db
      .collection("contacts")
      .doc(id)
      .delete();

    dispatch({ type: "DELETE_CONTACT", payload: id });
  };

  render() {
    const { id, name, email, phone } = this.props.contact;
    const { showContactInfo } = this.state;

    return (
      <Consumer>
        {value => {
          this.deleteContact = this.deleteContact.bind(
            this,
            id,
            value.dispatch
          );
          return (
            <div className="card card-body mb-3" onClick={this.contactListener}>
              <h4>
                {name}{" "}
                <i
                  className="fas fa-sort-down"
                  style={{ cursor: "pointer" }}
                ></i>
                <i
                  className="fas fa-trash"
                  style={{
                    float: "right",
                    cursor: "pointer",
                    color: "black",
                    marginRight: "1rem"
                  }}
                ></i>
                <Link to={`/edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      float: "right",
                      cursor: "pointer",
                      color: "black",
                      marginRight: "1rem"
                    }}
                  ></i>
                </Link>
              </h4>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};

export default Contact;
