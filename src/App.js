import React, { Component } from "react";
import "./App.css";
import Contacts from "./components/contact/Contacts";
import Header from "./components/layouts/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Provider from "./components/Context";
import AddContact from "./components/contact/addcontact";
import About from "./components/layouts/about";
import Notfound from "./components/layouts/notfound";
import EditContact from "./components/contact/editcontact";

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Header branding="Contact Manager" />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Contacts} />
                <Route exact path="/about" component={About} />
                <Route exact path="/add-contact" component={AddContact} />
                <Route exact path="/edit-contact/:id" component={EditContact} />
                <Route component={Notfound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
