import { combineReducers } from 'redux'
import menuReducer from './menuReducer'
import activeItemReducer from './activeItemReducer'
import orderReducer from './orderReducer'
import locationReducer from './locationReducer'

const rootReducer = combineReducers({
  menu: menuReducer,
  activeItem: activeItemReducer,
  order: orderReducer,
  locations: locationReducer
})

export default rootReducer