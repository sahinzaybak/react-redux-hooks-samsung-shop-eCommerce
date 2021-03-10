import {combineReducers} from 'redux'
import products from './products'
import productStorage from './productStorage'
import basket from './basket'
import couponCode from './couponCode'

export default combineReducers({
  products,
  productStorage,
  basket,
  couponCode
})