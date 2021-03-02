import {combineReducers} from 'redux'
import products from './products'
import productStorage from './productStorage'
import basket from './basket'

export default combineReducers({
  products,
  productStorage,
  basket
})