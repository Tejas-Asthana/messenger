import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { LOGIN_FAIL } from "../actions/types";
import { loadUser, loginUser } from "../actions/auth";
import { clearErrors } from "../actions/error";

import Forms from "../components/form";
// import { store } from "../store/store";

function Login(props) {
  let [loginData, setLoginData] = useState({ email: "", password: "" });
  let [errorMsg, setErrorMsg] = useState("");
  // let history = useHistory();

  // useEffect(() => {
  //   props.loadUser();
  // }, []);

  // useEffect(() => {
  //   if (props.error.id === LOGIN_FAIL) {
  //     setErrorMsg(props?.error?.msg?.msg);
  //   } else setErrorMsg("");
  // });

  function handleChange(e) {
    e.preventDefault();
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // attempt to register a user
    props.loginUser(loginData, props.history, "");
    props.clearErrors();
  }

  return (
    <>
      <div className="jumbotron text-center text-dark h1">
        Welcome back! <br /> Login
        <br />
        <Link to="/signup">
          <button className="btn">Signup</button>
        </Link>
      </div>
      <div className="container">
        {errorMsg ? (
          <div className="alert alert-danger" role="alert">
            {errorMsg}
          </div>
        ) : null}
        <Forms
          action="https://msnger-bcknd.herokuapp.com/api/auth/login"
          method="POST"
          username={{ show: false, isRequired: false }}
          email={{ show: true, value: loginData.email, isRequired: true }}
          password={{ show: true, value: loginData.password, isRequired: true }}
          checkbox={{ show: true }}
          onChangeMethod={(e) => handleChange(e)}
          handleSubmitMethod={(e) => handleSubmit(e)}
        />
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default withRouter(
  connect(mapStateToProps, {
    loginUser,
    loadUser,
    clearErrors,
  })(Login)
);
