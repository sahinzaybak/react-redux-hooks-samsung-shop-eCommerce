export function holdChoosenProductInfo(colorId, memoryId, simId) {
  return async dispatch => {
    dispatch({
      type: "FETCH_PRODUCT_SELECTED_INFO",
      payload: {
        colorId,
        memoryId,
        simId
      }
    });
  };
}