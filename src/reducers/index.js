import { combineReducers } from 'redux'
import menuReducer from './menuReducer'
import activeItemReducer from './activeItemReducer'
import orderReducer from './orderReducer'

const rootReducer = combineReducers({
  menu: menuReducer,
  activeItem: activeItemReducer,
  order: orderReducer
})

export default rootReducer