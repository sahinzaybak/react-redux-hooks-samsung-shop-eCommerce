const initialState = {
  couponCodeList: [],
  checkCouponCode:''
}
export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_COUPON_CODE_LIST":
      return {
        ...state,
        couponCodeList: action.payload
      }
    case "FETCH_CHECK_COUPON_CODE":
      return {
        ...state,
        checkCouponCode: action.payload
      }
      default:
        return state;
  }
}