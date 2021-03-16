import {combineReducers} from 'redux'
import products from './products'
import productStorage from './productStorage'
import basket from './basket'
import couponCode from './couponCode'
import previousOrder from './previousOrder'

export default combineReducers({
  products,
  productStorage,
  basket,
  couponCode,
  previousOrder
})