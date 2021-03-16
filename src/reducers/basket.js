const initialState = {
  basketList:[],
  isLoading:''
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
    
    case "FETCH_BASKET_STORAGE":
      return{
        ...state,
        basketList: action.payload
    }

    case "FETCH_BASKET_ITEM_DELETE":
      const newBasketList = [...state.basketList] //immutable
      newBasketList.splice(action.payload, 1);
      return{
        ...state,
        basketList: newBasketList 
    }

    case "FETCH_SUMMARY_LOADING":
      return{
        ...state,
        isLoading: action.payload
    }

    case "FETCH_BASKET_CLEAR":
      return{
        ...state,
        basketList: []
    }

    case "FETCH_BASKET_INCREASE_ITEM":
      const defaultBasketList = [...state.basketList]
      defaultBasketList[action.payload.basketProductIndex].memory.price = action.payload.newPrice
      defaultBasketList[action.payload.basketProductIndex].count = action.payload.productCount
      return{
        ...state,
        basketList: [...state.basketList] 
      }
    default:
      return state;
  }
}