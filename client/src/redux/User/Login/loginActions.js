import LOGIN_ACTIONS from './loginTypes';
import axios from 'axios';
import { backendUrl } from '../../../env.js';
import jwt from 'jwt-decode'
import { mainPage } from '../../../env.js';

//const jwtEncode = require("jsonwebtoken");

const actionLoginRequest = () => {
    return {
        type: LOGIN_ACTIONS.LOGIN_CUSTOMER_INFO
    }
}


const actionLoginSuccess = (Customers) => {
    return {
        type: LOGIN_ACTIONS.ACTION_LOGIN_SUCCESS,
        payload: Customers
    }
}
const actionLoginFailure = (error) => {
    return {
        type: LOGIN_ACTIONS.ACTION_LOGIN_FAILURE,
        payload: error
    }
}

const actionPasswordRecoverSuccess = (info) => {
    return {
        type: LOGIN_ACTIONS.PASSWORD_RECOVER_SUCCESS,
        payload: info
    }
}
const actionPasswordRecoverFailure = (error) => {
    return {
        type: LOGIN_ACTIONS.PASSWORD_RECOVER_FAILURE,
        payload: error
    }
}
export const signIn = (Customers) => {
    return dispatch => {
        dispatch(actionLoginRequest())
        let api = backendUrl + 'auth/login'
        axios.post(api, Customers)
            .then(response => {
                console.log(response, "login success?")
                dispatch(actionLoginSuccess(response.data))
            })
            .catch(error => {
                console.log(error)
                const msg = error.message
                dispatch(actionLoginFailure(msg))
            })
    }
}
export const passwordRecover = (email) => {
    return dispatch => {
        dispatch(actionLoginRequest())
        let api = backendUrl + 'auth/forgot'
        axios.post(api, email)
            .then(response => {
                console.log(response, "email")
                dispatch(actionPasswordRecoverSuccess(response.data))
            })
            .catch(error => {
                console.log(error)
                const msg = error.message
                dispatch(actionPasswordRecoverFailure(msg))
            })
    }
}



export const getUserCredentials = () => {
    return async (dispatch) => {
        const credentials = JSON.parse(localStorage.getItem("userCredentials"));
        dispatch({
            type: LOGIN_ACTIONS.ACTION_GET_CREDENTIALS,
            payload: credentials,
        });
    };
};

export const loginGoogle = (userData) => async (dispatch) => {

    const data = await axios.post(`${backendUrl}auth/loginGoogle`, userData);
    window.localStorage.setItem('token', data.data)
    window.location.href = mainPage
    return dispatch({
        type: LOGIN_ACTIONS.ACTION_LOGIN_GOOGLE,
        payload: data
    });
};

export const loginFromLocalStorage = () => async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
        return dispatch(actionLoginSuccess(token))
    }
}


//Request for action
const actionVerifyRequest = () => {
    return {
        type: LOGIN_ACTIONS.ACTION_VERIFY_REQUEST
    }
}

//Failure for action
const actionVerifyFailure = (error) => {
    return {
        type: LOGIN_ACTIONS.ACTION_VERIFY_FAILURE,
        payload: error
    }
}
//success for fetching the token
const fetchTokenSuccess = (Token) => {
    return {
        type: LOGIN_ACTIONS.FETCH_TOKEN_SUCCESS,
        payload: Token
    }
}

//success permission
const permissionRequest = () => {
    return {
        type: LOGIN_ACTIONS.PERMISSION_REQUEST
    }
}

const permissionFailure = (e) => {
    return {
        type: LOGIN_ACTIONS.ACTION_VERIFY_FAILURE,
        payload: e
    }
}

const permissionSuccess = (payload) => {
    return {
        type: LOGIN_ACTIONS.PERMISSION_SUCCESS,
        payload
    }
}

//activar cuenta
export const fetchToken = (tkn) => {
    return dispatch => {
        //dispatch(actionVerifyRequest())
        let api = backendUrl + 'auth/verify/' + tkn
        console.log(`fetchToken: ${api}`)
        axios.get(api)
            .then(response => {
                const tken = response.data
                dispatch(fetchTokenSuccess(tken))
            })
            .catch(error => {
                const msg = error.message
                dispatch(actionVerifyFailure(msg))
                localStorage.removeItem('token')
            })
    }
}

//permissions

export const permission = (token) => {
    return dispatch => {
        dispatch(permissionRequest())
        const data_user = jwt(token)
        //console.log(data_user, '<--- data user for permission');
        let api = backendUrl + 'auth/is-verify'
        if (!data_user.iss) {
            axios.get(api, {
                headers: {
                    'token': token
                }
            })
                .then(response => {
                    console.log(response.data, '<--- permission response>');
                    dispatch(permissionSuccess(data_user))
                })
                .catch(error => {
                    const msg = error.message
                    console.log(msg, '<--- permission error>');
                    window.localStorage.removeItem('token')
                    window.location.href = mainPage
                    dispatch(permissionFailure(msg))
                })
        }
    }
}


