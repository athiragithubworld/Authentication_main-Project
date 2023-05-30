import { useState, useRef } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isloading, setLoading] = useState(false);
  const Emailref = useRef();
  const Passwordref = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = Emailref.current.value;
    const enteredPassword = Passwordref.current.value;

    setLoading(true);
    if (isLogin) {
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAFgUIvA-oZCwpl7XXJspQK_cX-XzDJkZ0",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          header: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        setLoading(false);
        if (res.ok) {
        } else {
          return res.json().then((data) => {
            let errormessage = "Authentication Failed";
            if (data && data.error && data.error.message) {
              errormessage = data.error.message;
            }
            alert(errormessage);
          });
        }
      });
    }
  };
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={Emailref} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" ref={Passwordref} required />
        </div>
        <div className={classes.actions}>
          {!isloading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isloading && <p>Sending Request ... </p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
