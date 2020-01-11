import React, { Component } from "react";
import { db, Consumer } from "../context";

export class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };

  formOnChange = e => this.setState({ [e.target.name]: e.target.value });
  formOnSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    const newContact = { name, email, phone };

    const id = await db.collection("contacts").add(newContact).id;

    dispatch({ type: "ADD_CONTACT", payload: { id, ...newContact } });

    this.setState({
      name: "",
      email: "",
      phone: "",
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
