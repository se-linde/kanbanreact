import React from "react";
import { Route, Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store";
import { ConnectedDashboard } from "./Dashboard";
import { ConnectedLogin } from "./Login";
import { history } from "../store/history";
import { ConnectedTaskList } from "./TaskList";
import { ConnectedNavigation } from "./Navigation";
import { ConnectTaskDetail } from "./TaskDetail";
import { Redirect } from "react-router";

// Routeguard!
const RouteGuard = (Component) => ({ match }) => {
  console.info("Route Guard: ", match);

  if (!store.getState().session.authenticated) {
    return <Redirect to="/" />;
  } else {
    return <Component match={match} />;
  }
};

export const Main = () => (
  <Router history={history}>
    <Provider store={store}>
      <div>
        <ConnectedNavigation />

        <Route exact path="/" component={ConnectedLogin} />

        <Route
          exact
          path="/dashboard"
          // render={()=>(<ConnectedDashboard />)}
          render={RouteGuard(ConnectedDashboard)}
        />

        <Route
          exact
          path="/task/:id"
          // render={({match})=>(<ConnectTaskDetail match={match} />)}
          render={RouteGuard(ConnectTaskDetail)}
        />
      </div>
    </Provider>
  </Router>
);
