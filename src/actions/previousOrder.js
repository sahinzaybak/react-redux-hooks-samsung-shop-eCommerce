export function previousOrder(basketList, isCouponCode, todayDate, tableShow, paymentMethod, totalPrice, tableHirePriceTotal) {
  return async dispatch => {
    dispatch({
      type: "FETCH_PREVIOUS_ORDER",
      payload:  {
        orderList: basketList,
        totalPrice: totalPrice,
        isCouponCode: isCouponCode,
        orderDate: todayDate, 
        paymentMethod: paymentMethod,
        orderPrice: tableShow == false ? totalPrice : tableHirePriceTotal
      }
    });
  };
}

export function previousOrderStorage() {
  return async dispatch => {
    dispatch({
      type: "FETCH_PREV_ORDER_STORAGE",
      payload: JSON.parse(localStorage.getItem("myPrevOrderList"))
    });
  };
}
