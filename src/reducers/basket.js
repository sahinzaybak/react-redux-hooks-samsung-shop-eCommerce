const initialState = {
  basketList:[],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_BASKET":
      if(JSON.parse(localStorage.getItem("basket") == null)){
        return{
          ...state,
          basketList: [...state.basketList, action.payload] //concat
        }
      }
      else{
        return{
          ...state,
          basketList: [...JSON.parse(localStorage.getItem("basket")), action.payload] //concat
        }
      }
     
    default:
      return state;
  }
}