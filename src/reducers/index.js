import { combineReducers } from 'redux'
import menuReducer from './menuReducer'
import activeItemReducer from './activeItemReducer'
import orderReducer from './orderReducer'
import locationReducer from './locationReducer'
import userReducer from './userReducer'
import newLocationReducer from './newLocationReducer'

const rootReducer = combineReducers({
  menu: menuReducer,
  activeItem: activeItemReducer,
  order: orderReducer,
  locations: locationReducer,
  user: userReducer,
  newLocation: newLocationReducer
})

export default rootReducer