import { RETRIEVE_TOKEN, LOGIN, LOGOUT, REFRESH_TOKEN } from "../actions/ActionTypes";

const initialState = {
  name: null,
  password: '',
  email: null,
  userToken: null,
  picture: null,
  userId: null,
  issue_count: null,
  check_textInputChange: false,
  secureTextEntry: true,
  isValidEmail: true,
  isValidPassword: true,
  isValidName: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_TOKEN:
      return {
        ...state,
        userToken: action.token,
        email: action.id,
        name: action.name,
        picture: action.picture,
        userId: action.userId,
        issue_count: action.count
      };
    case LOGIN:
      return {
        ...state,
        email: action.id,
        userToken: action.token,
        name: action.name,
        picture: action.picture,
        userId: action.userId,
        issue_count: action.count
      };
    case REFRESH_TOKEN:
      return {
        ...state,
        picture: action.picture,
        userId: action.userId,
        email: action.id,
        userToken: action.token,
        name: action.name,
        issue_count: action.count
      };
    case LOGOUT:
      return {
        ...state,
        email: null,
        userToken: null,
        name: null,
        picture: null,
        userId: null,
        issue_count: null
      };
    default:
      return state

  }
}

export default reducer
