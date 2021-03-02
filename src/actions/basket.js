export function basket(selectedColor, selectedMemory, productName, productId) {
  return async dispatch => {
    dispatch({
      type: "FETCH_BASKET",
      payload: {
        productName: productName,
        color: selectedColor,
        memory : selectedMemory,
        productId : productId
      }
    });
  };
}