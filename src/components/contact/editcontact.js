import React, { Component } from "react";
import { Consumer } from "../Context";
import Textinputgroup from "../layouts/TextInputGroup";
import axios from "axios";
export default class EditContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const { name, email, phone } = res.data;
    this.setState({
      name,
      email,
      phone
    });
  }
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
    const {id} = this.props.match.params;
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      newContact
    );
    dispatch({ type: "UPDATE_CONTACT", payload: res.data });

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
              <div className="card-header">Edit Contact</div>
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
                    value="edit"
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
