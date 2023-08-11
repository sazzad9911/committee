import { createStore,combineReducers } from 'redux'
import isBn from './data/isBn'
import isDark from './data/isDark'
import loader from './data/loader'
import scrollValue from './data/setScrollValue'
import user from './data/user'

const reducers=combineReducers({
    isBn:isBn,
    isDark:isDark,
    scrollValue:scrollValue,
    user:user,
    loader:loader
})
const store=createStore(reducers)
export default store