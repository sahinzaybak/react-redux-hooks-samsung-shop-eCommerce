export function basket(selectedColor, selectedMemory, productName) {
  return async dispatch => {
    dispatch({
      type: "FETCH_BASKET",
      payload: {
        productName: productName,
        color: selectedColor,
        memory : selectedMemory
      }
    });
  };
}