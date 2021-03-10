export function basket(selectedColor, selectedMemory, productName, productId) {
  return async dispatch => {
    dispatch({
      type: "FETCH_BASKET",
      payload: {
        productName: productName,
        color: selectedColor,
        count:1,
        memory : selectedMemory,
        productId : productId
      }
    });
  };
}

export function basketItemDelete(productIndex) {
  return async dispatch => {
    dispatch({
      type: "FETCH_BASKET_ITEM_DELETE",
      payload: productIndex
    });
  };
}

export function summaryLoading(bool) {
  return async dispatch => {
    debugger;
    dispatch({
      type: "FETCH_SUMMARY_LOADING",
      payload: bool
    });
  };
}

export function basketItemIncreaseCount(newPrice,basketProductIndex,productCount) {
  return async dispatch => {
    dispatch({
      type: "FETCH_BASKET_INCREASE_ITEM",
      payload: {
        newPrice:newPrice,
        basketProductIndex:basketProductIndex,
        productCount:productCount
      }
    });
  };
}


