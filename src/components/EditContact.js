import React, { Component } from "react";
import axios from "axios";
import { Consumer } from "../context";

export class EditContact extends Component {
  state = {
    errors: {}
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const { name, email, phone } = res.data;

    this.setState({ name, email, phone });
    console.log(this.state);
  }

  formOnChange = e => this.setState({ [e.target.name]: e.target.value });
  formOnSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { id } = this.props.match.params;
    const { name, email, phone } = this.state;
    const editContact = { name, email, phone };

    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      editContact
    );

    console.log(res);

    dispatch({ type: "EDIT_CONTACT", payload: res.data });

    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {}
    });

    this.props.history.push("/");
  };

  render() {
    const { name, email, phone } = this.state;
    return (
      <Consumer>
        {value => (
          <div className="card mb-3">
            <div className="card-header">Edit Contact</div>
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
                    className={`form-control form-control-md`}
                    name="name"
                    placeholder="Enter your name..."
                    defaultValue={name}
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
                    defaultValue={email}
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
                    defaultValue={phone}
                    required
                  />
                </div>
                <input
                  type="submit"
                  value="Update Contact"
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

export default EditContact;
