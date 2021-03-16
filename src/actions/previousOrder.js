export function previousOrder(basketList, todayDate,tableShow,totalPrice,tableHirePriceTotal) {
  return async dispatch => {
    dispatch({
      type: "FETCH_PREVIOUS_ORDER",
      payload:  {
        orderList: basketList,
        orderDate: todayDate, 
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
