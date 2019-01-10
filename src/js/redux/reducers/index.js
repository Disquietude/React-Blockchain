import { combineReducers } from 'redux';
import currenciesReducer from './currenciesReducer';
import conversionReducer from './conversionReducer';

export default combineReducers({
  currencies: currenciesReducer,
  conversion: conversionReducer
});