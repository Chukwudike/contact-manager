import React, { Component } from "react";
//import PropTypes from "prop-types";
import Contact from "./Contact";
import { Consumer } from "../Context";
export class Contacts extends Component {
  static propTypes = {};

  render() {
    return (
      <Consumer>
        {value => {
          const { Contacts } = value;
          return (
            <React.Fragment>
              <h2 className="display-4 mb-2">
                <span className="text-danger">Contact</span> List
              </h2>
              {Contacts.map(contact => (
                <Contact key={contact.id} contact={contact} />
              ))}
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default Contacts;
