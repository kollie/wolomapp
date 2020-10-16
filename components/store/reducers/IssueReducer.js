import { SET_ISSUES, REMOVE_ISSUE } from "../actions/ActionTypes";

const initialState = {
  issues: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ISSUES:
      return {
        ...state,
        issues: action.issues
      };
    case REMOVE_ISSUE:
      return {
        ...state,
        places: state.places.filter(place => {
          return place.key !== action.key;
        })
      };
    default:
      return state;
  }
};

export default reducer;
