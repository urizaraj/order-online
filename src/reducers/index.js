import { combineReducers } from 'redux'
import menuReducer from './menuReducer'
import activeItemReducer from './activeItemReducer'
import orderReducer from './orderReducer'
import locationReducer from './locationReducer'
import userReducer from './userReducer'
import newLocationReducer from './newLocationReducer'
import orderNewReducer from './orderNewReducer'

const rootReducer = combineReducers({
  menu: menuReducer,
  activeItem: activeItemReducer,
  order: orderReducer,
  orderNew: orderNewReducer,
  locations: locationReducer,
  user: userReducer,
  newLocation: newLocationReducer
})

export default rootReducer