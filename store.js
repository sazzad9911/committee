import { createStore,combineReducers } from 'redux'
import comity from './data/comity'
import expenseDateSort from './data/expenseDateSort'
import isBn from './data/isBn'
import isDark from './data/isDark'
import loader from './data/loader'
import scrollValue from './data/setScrollValue'
import toast from './data/toast'
import user from './data/user'

const reducers=combineReducers({
    isBn:isBn,
    isDark:isDark,
    scrollValue:scrollValue,
    user:user,
    loader:loader,
    comity:comity,
    toast:toast,
    expenseDateSort:expenseDateSort
})
const store=createStore(reducers)
export default store