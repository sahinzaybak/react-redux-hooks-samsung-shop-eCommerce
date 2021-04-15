const initialState = {
  productList:[],
  productDetail:[],
  isFilter:false,
  isLoading:''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCT_LIST":
      return{
        ...state,
        productList: action.payload
      }
    case "FETCH_PRODUCT_FILTER_LIST":
      return{
        ...state,
        productList: action.payload,
        isFilter: true
      }
    case "FETCH_PRODUCT_DETAIL":
      return{
        ...state,
        productDetail: action.payload,
      }
     case "FETCH_PRODUCT_DETAIL_CLEAR":
      return{
        ...state,
        productDetail: action.payload,
      }
    case "LOADING":
      return{
        ...state,
        isLoading: action.payload
      }
    default:
      return state;
  }
}