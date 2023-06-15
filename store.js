import { createStore,combineReducers } from 'redux'
import isBn from './data/isBn'
import isDark from './data/isDark'

const reducers=combineReducers({
    isBn:isBn,
    isDark:isDark
})
const store=createStore(reducers)
export default store