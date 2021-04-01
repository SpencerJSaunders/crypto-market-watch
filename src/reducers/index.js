import { combineReducers } from 'redux'
import marketInfo from './marketInfoReducer'
import searchTerm from './searchTermReducer'

export default combineReducers({
    coins: marketInfo,
    searchTerm: searchTerm
})