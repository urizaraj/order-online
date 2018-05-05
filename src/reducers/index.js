import { combineReducers } from 'redux'
import menuReducer from './menuReducer'
import activeItemReducer from './activeItemReducer'
import orderReducer from './orderReducer'
import locationReducer from './locationReducer'
import userReducer from './userReducer'
import locationNewReducer from './locationNewReducer'
import orderNewReducer from './orderNewReducer'

const rootReducer = combineReducers({
  menu: menuReducer,
  activeItem: activeItemReducer,
  order: orderReducer,
  orderNew: orderNewReducer,
  locations: locationReducer,
  locationNew: locationNewReducer,
  user: userReducer
})

export default rootReducer