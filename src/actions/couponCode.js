import axios from 'axios'
const BASE_URL = process.env.REACT_APP_API_URL
export function couponCodeList() {
  return async dispatch => {
    await axios.get(`${BASE_URL}/CouponCode`).then(value => {
      dispatch({
        type: "FETCH_COUPON_CODE_LIST",
        payload: value.data,
      });
    });
  };
}

export function checkCouponCode(bool) {
  debugger;
  return async dispatch => {
    dispatch({
      type: "FETCH_CHECK_COUPON_CODE",
      payload: bool
    });
  };
}
