import {createStore} from 'redux'
import rootReducers from '../reducers'


var store = createStore(rootReducers)
export default store