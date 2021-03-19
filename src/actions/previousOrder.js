export function previousOrder(basketList, todayDate, tableShow, paymentMethod, totalPrice, tableHirePriceTotal) {
  debugger;
  return async dispatch => {
    dispatch({
      type: "FETCH_PREVIOUS_ORDER",
      payload:  {
        orderList: basketList,
        totalPrice: totalPrice,
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
