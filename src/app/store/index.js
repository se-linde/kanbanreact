import { createStore, applyMiddleware, combineReducers } from "redux";
import { defaultState } from "../../server/defaultState.js";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

// import * as sagas from "./sagas.mock";

import * as sagas from "./sagas";

import * as mutations from "./mutations";

export const store = createStore(
  combineReducers({
    // sessions
    session(userSession = defaultState.session || {}, action) {
      let { type, authenticated, session } = action;

      switch (type) {
        case mutations.SET_STATE:
          return { ...userSession, id: action.state.session.id };
        case mutations.REQUEST_AUTHENTICATE_USER:
          return { ...userSession, authenticated: mutations.AUTHENTICATING };
        case mutations.PROCESSING_AUTHENTICATE_USER:
          return { ...userSession, authenticated };
        default:
          return userSession;
      }
    },

    // Tasks
    tasks(tasks = [], action) {
      switch (action.type) {
        case mutations.SET_STATE:
          return action.state.tasks;

        case mutations.CREATE_TASK:
          return [
            ...tasks,
            {
              id: action.taskID,
              name: "New from index Persistent Task",
              group: action.groupID,
              owner: action.ownerID,
              isComplete: false,
            },
          ];

        case mutations.SET_TASK_COMPLETE:
          return tasks.map((task) => {
            return task.id === action.taskID
              ? { ...task, isComplete: action.isComplete }
              : task;
          });

        case mutations.SET_TASK_NAME:
          return tasks.map((task) => {
            return task.id === action.taskID
              ? { ...task, name: action.name }
              : task;
          });

        case mutations.SET_TASK_COMPLETE:
          return tasks.map((task) => {
            return task.id === action.taskID
              ? { ...task, group: action.groupID }
              : task;
          });
      }
      return tasks;
    },

    // Comments
    comments(comments = [], action) {
      switch (action.type) {
        case mutations.SET_STATE:
          return action.state.comments;
      }
      return comments;
    },

    // Groups
    groups(groups = [], action) {
      switch (action.type) {
        case mutations.SET_STATE:
          return action.state.groups;
      }

      return groups;
    },

    // Users
    users(users = []) {
      return users;
    },
  }),

  applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}
