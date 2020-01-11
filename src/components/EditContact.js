import React, { Component } from "react";
import { db, Consumer } from "../context";

export class EditContact extends Component {
  state = {
    errors: {}
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const doc = await db
      .collection("contacts")
      .doc(id)
      .get();

    this.setState(doc.data());
  }

  formOnChange = e => this.setState({ [e.target.name]: e.target.value });
  formOnSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { id } = this.props.match.params;
    const { name, email, phone } = this.state;
    const editContact = { name, email, phone };

    await db
      .collection("contacts")
      .doc(id)
      .set(editContact);

    dispatch({ type: "EDIT_CONTACT", payload: { id, ...editContact } });

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
