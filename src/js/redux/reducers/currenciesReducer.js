import produce from 'immer';
import { 
  FETCH_CURRENCIES,
  ADD_CURRENCY,
  REMOVE_CURRENCY,
  SORT_CURRENCIES
 } from '../actions/types';

const initialState = {};

export default (state = initialState, action) => 
  produce(state, draft => {
    switch (action.type) {
      case FETCH_CURRENCIES:
        return {
          selected: action.payload.selected,
          reserve: action.payload.reserve
        };
      case ADD_CURRENCY:
        draft.selected.push(state.reserve.find(current => current.id === action.payload));
        draft.reserve = state.reserve.filter(current => current.id !== action.payload);
        break;
      case REMOVE_CURRENCY:
        if (state.selected.length > 1) {
          draft.reserve.push(state.selected.find(current => current.id === action.payload));
          draft.selected = state.selected.filter(current => current.id !== action.payload);
        }
        break;
      case SORT_CURRENCIES:
        if (action.payload.direction === 'asc') {
          draft.selected.sort((a, b) => a[action.payload.property] - b[action.payload.property]);
        }
        else {
          draft.selected.sort((a, b) => b[action.payload.property] - a[action.payload.property]);
        }
        break;
      default:
        return state;
    }
});