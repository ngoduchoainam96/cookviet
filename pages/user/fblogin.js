import React from "react";

export default function Fblogin(props) {
    return(
  <div className="login">
    <p>Please click button below to sign in!</p>
    <button className="facebook" onClick={() => props.authenticate("Facebook")}>
      Log In With Facebook
    </button>
  </div>
    )
};

