import { 
  FETCH_CURRENCIES,
  ADD_CURRENCY,
  REMOVE_CURRENCY,
  SORT_CURRENCIES
} from './types';
const rp = require('request-promise');

//Action creator which makes an API request then dispatches the results to the store in its payload
//Parameters:
//  selected: array of ids of selected currencies
//  reserve: array of ids of reserve currencies
//  conversion: option to convert prices (string)
export const fetchCurrencies = (selected, reserve, conversion) => dispatch => {
  let uri = `https://disquietude-coinmarketcap-microservice.glitch.me/api/quotes/${selected.join(',')}`;

  if(reserve.length > 0) {
    uri += ',' + reserve.join(',');
  }

  uri += '/' + conversion;

  return rp(uri, {
    method: 'GET',
    json: 'true'
  })
  .then(
    function fulfilled(response) {
      let currencies = [];
      
      for (let id in response.data) {
        let current = {
          id: id,
          name: response.data[id].name,
          symbol: response.data[id].symbol,
          rank: response.data[id].cmc_rank,
          price: response.data[id].quote[conversion].price
        }
        currencies.push(current);
      }

      let payload = {
        selected: [],
        reserve: []
      }

      for (let currency of currencies) {
        if (selected.includes(Number.parseInt(currency.id))) {
          payload.selected.push(currency);
        }
        else {
          payload.reserve.push(currency);
        }
      }

      return payload;
    },
    function rejected(err) {
      console.error(err);
    }
  )
  .then(payload => {
    dispatch({
      type: FETCH_CURRENCIES,
      payload: payload
    })
  });
}

export const addCurrency = (id) => (dispatch) => {
  dispatch({
    type: ADD_CURRENCY,
    payload: id
  })
}

export const removeCurrency = (id) => (dispatch) => {
  dispatch({
    type: REMOVE_CURRENCY,
    payload: id
  })
}

export const sortCurrencies = (property, direction) => (dispatch) => {
  dispatch({
    type: SORT_CURRENCIES,
    payload: {
      property: property,
      direction: direction
    }
  })
}