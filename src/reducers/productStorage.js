const initialState = {
  productStorageInfo:[],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCT_CHOOSEN_INFO":
      return{
        ...state,
        productStorageInfo:action.payload
      }
    default:
      return state;
  }
}