import { CHANGE_CONVERSION } from './types';
import { fetchCurrencies } from './currencyActions';

export const changeConversion = (selected, reserve, conversion) => dispatch => {
  let selectedIds = [], reserveIds = [];
  
  selected.forEach(element => {
    selectedIds.push(Number.parseInt(element.id));
  });

  reserve.forEach(element => {
    reserveIds.push(Number.parseInt(element.id));
  });

  return dispatch(
    fetchCurrencies(selectedIds, reserveIds, conversion)
  ).then(
    function fulfilled() {
      dispatch({
        type: CHANGE_CONVERSION,
        payload: conversion
      });
    },
    function rejected(err) {
      console.error(err);
    } 
  )
}