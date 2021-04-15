import axios from 'axios'
import { createBrowserHistory } from 'history';
const browserHistory = createBrowserHistory();
const BASE_URL = process.env.REACT_APP_API_URL
export function getProductList() {
  return async dispatch => {
    await axios.get(`${BASE_URL}/Products`).then(value => {
      dispatch({
        type: "FETCH_PRODUCT_LIST",
        payload: value.data,
      });
    });
  };
}

export function getProductDetail(slug) {
  return async dispatch => {
    await axios.get(`${BASE_URL}/Product-detail?slug=${slug}`).then(value => {
      if(value.data.length > 0){
        dispatch({
          type: "FETCH_PRODUCT_DETAIL",
          payload: value.data[0],
        });
      }
      else{
        browserHistory.push('/notFound')
        window.location.reload()
      }
    });
  };
}

export function productDetailClear() {
  return async dispatch => {
    dispatch({
      type: "FETCH_PRODUCT_DETAIL_CLEAR",
      payload: [],
    });
  };
}

export function filterProducts(filterCategory, filterValue) {
  return async dispatch => {
    await axios.get(`${BASE_URL}/Products?${filterCategory}=${filterValue}`).then(value => {
      dispatch({
        type: "FETCH_PRODUCT_FILTER_LIST",
        payload: value.data,
      });
    });
  };
}

