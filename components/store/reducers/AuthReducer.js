import { RETRIEVE_TOKEN , LOGIN, LOGOUT} from "../actions/ActionTypes";

const initialState = {
    name: null,
    password: '',
    email: null,
    userToken: null,
    picture: null,
    check_textInputChange: false,
    secureTextEntry: true,
    isValidEmail: true,
    isValidPassword: true,
    isValidName: true
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case RETRIEVE_TOKEN:
          return {
            ...state,
            userToken: action.token,
            email: action.id,
            name: action.name,
            picture: action.picture
          };
        case LOGIN:
          return {
            ...state,
            email: action.id,
            userToken: action.token,
            name: action.name,
            picture: action.picture
          };
        case LOGOUT:
          return {
            ...state,
            email: null,
            userToken: null,
            name: null,
            picture: null
          };
          default:
              return state

      }
}

export default reducer
