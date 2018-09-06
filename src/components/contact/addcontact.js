import React, { Component } from "react";
import { Consumer } from "../Context";
import Textinputgroup from "../layouts/TextInputGroup";
import axios from "axios";
export default class Addcontact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  addContact = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;
    if (!name) {
      return this.setState({ errors: { name: "Name field is required" } });
    }
    if (!email) {
      return this.setState({ errors: { email: "Email field is required" } });
    }
    if (!phone) {
      return this.setState({ errors: { phone: "Phone no is required" } });
    }
    const newContact = {
      name,
      email,
      phone
    };
    const you = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      newContact
    );
    dispatch({ type: "ADD_CONTACT", payload: you.data });

    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {}
    });

    this.props.history.push("/");
  };
  render() {
    const { name, email, phone, errors } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;

          return (
            <div className="card mb-3">
              <div className="card-header">Add a new Contact</div>
              <div className="card-body">
                <form onSubmit={this.addContact.bind(this, dispatch)}>
                  <Textinputgroup
                    label={"Contact Name"}
                    name={"name"}
                    placeholder={"Enter contact name"}
                    value={name}
                    onChange={this.onChange}
                    //className={"form-control form-control-lg"}
                    error={errors.name}
                  />

                  <Textinputgroup
                    label={"Contact Email"}
                    type={"email"}
                    name={"email"}
                    placeholder={"Enter contact email"}
                    value={email}
                    onChange={this.onChange}
                    //className={"form-control form-control-lg"}
                    error={errors.email}
                  />

                  <Textinputgroup
                    label={"Contact Phone Number"}
                    type={"text"}
                    name={"phone"}
                    placeholder={"Enter Phone Number"}
                    value={phone}
                    onChange={this.onChange}
                    //className={"form-control form-control-lg"}
                    errors={errors.phone}
                  />

                  <input
                    type="submit"
                    className="btn btn-light btn-block"
                    value="Add contact"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
