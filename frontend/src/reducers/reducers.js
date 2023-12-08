// reducers.js
import { SET_DOC_ID } from "../actions/types"

const initialState = {
  docId: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DOC_ID:
      return {
        ...state,
        docId: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
