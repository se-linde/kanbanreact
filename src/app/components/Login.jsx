import React from "react";
import * as mutations from "../store/mutations";
import { connect } from "react-redux";

const LoginComponent = ({ authenticateUser, authenticated }) => {
  return (
    <div>
      <p>Login here!</p>
      <p>For testing, use Username: Dev</p>
      <p>For testing, use Password: P@ssw0rd!</p>
      <form onSubmit={authenticateUser}>
        <input
          type="text"
          placeholder="username"
          name="username"
          defaultValue="Dev"
          className="form-control"
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          defaultValue=""
          className="form-control mt-2"
        />

        {authenticated === mutations.NOT_AUTHENTICATED ? (
          <p>Login Incorrect; please try again</p>
        ) : null}

        <button type="submit" className="form-control mt-2 btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ session }) => ({
  authenticated: session.authenticated,
});

const mapdispatchToProps = (dispatch) => ({
  authenticateUser(e) {
    e.preventDefault();
    let username = e.target[`username`].value;
    let password = e.target[`password`].value;
    dispatch(mutations.requestAuthenticateUser(username, password));
  },
});

export const ConnectedLogin = connect(
  mapStateToProps,
  mapdispatchToProps
)(LoginComponent);
