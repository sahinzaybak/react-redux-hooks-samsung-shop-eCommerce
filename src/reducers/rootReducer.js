import {combineReducers} from 'redux'
import products from './products'
import productStorage from './productStorage'

export default combineReducers({
  products,
  productStorage
})