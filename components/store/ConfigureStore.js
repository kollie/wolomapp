import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import authReducer from "./reducers/AuthReducer";
import loadingReducer from "./reducers/LoadingReducer";
import issueReducer from './reducers/IssueReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  issues: issueReducer
});

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
