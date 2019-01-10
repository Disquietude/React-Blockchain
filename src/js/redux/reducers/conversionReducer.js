import { CHANGE_CONVERSION } from '../actions/types'

const initialState = 'USD';

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CONVERSION:
      return action.payload;
    default:
      return state;
  }
};