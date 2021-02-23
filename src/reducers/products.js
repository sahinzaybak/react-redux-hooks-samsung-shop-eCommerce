const initialState = {
  productList:[]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCT_LIST":
      return{
        ...state,
        productList: action.payload
      }
    default:
      return state;
  }
}