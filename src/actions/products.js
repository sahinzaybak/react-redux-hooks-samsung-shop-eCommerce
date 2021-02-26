import axios from 'axios'
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
      dispatch({
        type: "FETCH_PRODUCT_DETAIL",
        payload: value.data[0],
      });
    });
  };
}