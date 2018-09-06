import React, { Component } from "react";

export default class Addcontact extends Component {
  constructor(props) {
    super(props);
    this.nameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
  }
  static defaultProps = {
    name: "Fred Hernandez",
    email: "fred_hernandez@gmail.com",
    phone: "09098884006"
  };
  onSubmit = e => {
    e.preventDefault();
    const data = {
      name: this.nameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value
    };
    console.log(data);
  };
  render() {
    const { name, email, phone } = this.props;
    return (
      <div className="card mb-3">
        <div className="card-header">Add a new Contact</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
          
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Enter contact name"
              className="form-control form-control-lg"
              defaultValue={name}
              ref={this.nameInput}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="email"
              placeholder="Enter contact email"
              className="form-control form-control-lg"
              defaultValue={email}
              ref={this.emailInput}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="phone"
              placeholder="Enter contact Phone no"
              className="form-control form-control-lg"
              defaultValue={phone}
              ref={this.phoneInput}
            />
          </div>
          <input
            type="submit"
            className="btn btn-light btn-block"
            value="Add contact"
          />
          </form>
        </div>
      </div>
    );
  }
}
