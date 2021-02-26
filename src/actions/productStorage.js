export function holdChoosenProductInfo(_colorId, _memoryId) {
  return async dispatch => {
    dispatch({
      type: "FETCH_PRODUCT_CHOOSEN_INFO",
      payload: {
        _colorId,
        _memoryId
      }
    });
  };
}