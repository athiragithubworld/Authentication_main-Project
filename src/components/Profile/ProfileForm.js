import React, { useRef, useContext } from "react";
import classes from "./ProfileForm.module.css";

import AuthContext from "../Store/AuthContext";

const ProfileForm = () => {
  const authcxt = useContext(AuthContext);

  const newPassword = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const changePassword = newPassword.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAFgUIvA-oZCwpl7XXJspQK_cX-XzDJkZ0",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authcxt.token,
          password: changePassword,
          returnSecureToken: true,
        }),
        header: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errormessage = "Enter valid password";
            // if (data && data.error && data.error.message) {
            //   errormessage = data.error.message;
            // }
            // alert(errormessage);
            throw new Error(errormessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPassword} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
