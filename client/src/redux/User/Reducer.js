import { combineReducers } from 'redux'
import loginReducer from './Login/loginReducer'
import registerReducer from './Register/registerReducer'

const loginReducers = combineReducers({
    login: loginReducer,
    register: registerReducer,
})

export default loginReducers