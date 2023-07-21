import { createStore,combineReducers } from 'redux'
import isBn from './data/isBn'
import isDark from './data/isDark'
import scrollValue from './data/setScrollValue'

const reducers=combineReducers({
    isBn:isBn,
    isDark:isDark,
    scrollValue:scrollValue
})
const store=createStore(reducers)
export default store