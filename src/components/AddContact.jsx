import React, { Component } from "react";
import { db, Consumer } from "../context";

export class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    message: "",
    errors: {}
  };

  formOnChange = e => this.setState({ [e.target.name]: e.target.value });
  formOnSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone, message } = this.state;

    const newContact = { name, email, phone, message };

    await db.collection("contacts").add(newContact).id;

    this.setState({
      name: "",
      email: "",
      phone: "",
      message: "",
      errors: {}
    });

    this.props.history.push("/");
  };

  render() {
    return (
      <Consumer>
        {value => (
          <div className="card mb-3">
            <div className="card-header">Add Contact</div>
            <div className="card-body">
              <form
                action="#"
                onChange={this.formOnChange}
                onSubmit={this.formOnSubmit.bind(this, value.dispatch)}
              >
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control form-control-md"
                    name="name"
                    placeholder="Enter your name..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control form-control-md"
                    name="email"
                    placeholder="Enter your email..."
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    className="form-control form-control-md"
                    name="phone"
                    placeholder="Enter your phone..."
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <input
                    type="text"
                    className="form-control form-control-md"
                    name="message"
                    placeholder="Enter your Message..."
                    required
                  />
                </div>
                <input
                  type="submit"
                  value="Add Contact"
                  className="btn btn-light btn-block"
                />
              </form>
            </div>
          </div>
        )}
      </Consumer>
    );
  }
}

export default AddContact;
