import { combineReducers } from 'redux'
import menuReducer from './menuReducer'
import activeItemReducer from './activeItemReducer'

const rootReducer = combineReducers({
  menu: menuReducer,
  activeItem: activeItemReducer
})

export default rootReducer