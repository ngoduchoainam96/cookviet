import React, { Component, Fragment } from "react";
import firebase from "firebase";
import Fblogin from "../user/fblogin";
import base, { firebaseConfig } from "../../config/fire-conf";
import fire from "../../config/fire-conf";

class Facebook extends Component {
  state = {
    email: null,
    displayName: null
  };

  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async authData => {
    console.log(authData);
    const user = authData.user;
    this.setState({
      email: user.email,
      displayName: user.displayName
    });
    var accessToken = credential.accessToken;
    
  };

   authenticate = provider => {
     
    console.log(provider);
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    fire.auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    console.log("logout");
    await fire.auth().signOut();
    this.setState({ email: null, displayName: null });
  };

  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>;
    
    return (
      <Fragment>
        <div className="user-info">
          
          <label>User name:</label>
          <span type="text" id="email">
            {this.state.displayName}
          </span>
        </div>
        <div className="user-info">
          <label>Email:</label>
          <span type="text" id="email">
            {this.state.email}
          </span>
        </div>
        <button className="facebook" onClick={() => this.authenticate("Facebook")}></button>
        <div>{logout}</div>
      </Fragment>
    );
  }
}

export default Facebook;