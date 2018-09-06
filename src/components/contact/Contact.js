import React, { Component } from "react";
import PropTypes from "prop-types";
import { Consumer } from "../Context";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Contact extends Component {
  state = {
    showItem: false
  };
  static propTypes = {
    contact: PropTypes.object.isRequired
  };
  static defaultProps = {
    name: "This is a required field"
  };
  onDelete = async (dispatch, id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/${id}`);
      dispatch({ type: "DELETE_CONTACT", payload: id });
    } catch (e) {
      dispatch({ type: "DELETE_CONTACT", payload: id });
    }
  };

  render() {
    const { showItem } = this.state;
    const onClick = () => {
      this.setState({ showItem: !showItem });
    };
    const { name, email, phone, id } = this.props.contact;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h3>
                {name}
                <i
                  className=" ml-4 fas fa-sort-down"
                  onClick={onClick}
                  style={{ cursor: "pointer" }}
                />
                <i
                  onClick={this.onDelete.bind(this, dispatch, id)}
                  className="fas fa-times i-danger"
                  style={{ color: "red", float: "right", cursor: "pointer" }}
                />
                <Link to = {`/edit-contact/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      color: "black",
                      float: "right",
                      cursor: "pointer",
                      marginRight : "16px"
                    }}
                  />
                </Link>
              </h3>
              {showItem ? (
                <ul className="list-group">
                  <li className="list-group-item">{email}</li>
                  <li className="list-group-item"> {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}
