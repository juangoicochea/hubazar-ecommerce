import LOGIN_ACTIONS from './loginTypes';
import jwt from 'jwt-decode';

const loginState = {
    loading: '',
    name: '',
    id: "",
    email: '',
    isAdmin: false,
    isProvider: false,
    token: '',
    error: '',
    userGoogleData: [],
    userCredentials: [],
    expiresAt: "",
    issuedAt: "",
}

const loginReducer = (state = loginState, action) => {
    const { type, payload } = action
    switch (type) {
        case LOGIN_ACTIONS.LOGIN_CUSTOMER_INFO:
            return {
                ...state,
                loading: true,
                error: ''
            }
        case LOGIN_ACTIONS.ACTION_LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case LOGIN_ACTIONS.ACTION_LOGIN_SUCCESS:
            {
                const data = jwt(payload)
                window.localStorage.setItem('token', payload)
                return {
                    ...state,
                    loading: false,
                    name: data.name,
                    id: data.user_id,
                    token: payload,
                    email: data.email,
                    isAdmin: data.isAdmin,
                    isProvider: data.isProvider,
                    error: '',
                    expiresAt: Date(data.exp),
                    issuedAt: Date(data.iat),
                    permission: 'approved'
                }
            }
        case LOGIN_ACTIONS.ACTION_LOGIN_GOOGLE:
            const info = payload.data
            return {
                ...state,
                loading: false,
                name: info.name,
                id: info.user_id,
                email: info.email,
                isAdmin: info.admin,
                isProvider: info.provider,
                permission: 'approved',
                userGoogleData: [...state.userGoogleData, payload]
            }
        case LOGIN_ACTIONS.ACTION_GET_CREDENTIALS:
            return {
                ...state,
                userCredentials: payload
            }
        case LOGIN_ACTIONS.ACTION_VERIFY_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            }
        case LOGIN_ACTIONS.ACTION_VERIFY_FAILURE:
            return {
                name: '',
                id: "",
                email: '',
                isAdmin: false,
                isProvider: false,
                userGoogleData: [],
                userCredentials: [],
                expiresAt: "",
                issuedAt: "",
                loading: false,
                error: payload,
                permission: 'denied'
            }
        case LOGIN_ACTIONS.FETCH_TOKEN_SUCCESS:
            {
                return {
                    ...state,
                    loading: false,
                    token: payload,
                    permission: 'approved',
                    error: ''
                }
            }
        case LOGIN_ACTIONS.PERMISSION_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    error: ''

                }
            }

        case LOGIN_ACTIONS.PERMISSION_FAILURE:
            {
                return {
                    ...state,
                    loading: false,
                    error: payload,
                    permission: 'denied'
                }
            }
        case LOGIN_ACTIONS.PERMISSION_SUCCESS:
            {
                return {
                    ...state,
                    loading: false,
                    error: '',
                    name: payload.name,
                    id: payload.user_id,
                    email: payload.email,
                    isAdmin: payload.isAdmin,
                    isProvider: payload.isProvider,
                    expiresAt: Date(payload.exp),
                    issuedAt: Date(payload.iat),
                    permission: 'approved'
                }
            }

        case LOGIN_ACTIONS.PASSWORD_RECOVER_SUCCESS:
            {
                return {
                    ...state,
                    loading:false,
                    error:'',
                    email:payload
                }
            } 
        case LOGIN_ACTIONS.PASSWORD_RECOVER_FAILURE:
            {
                return {
                    ...state,
                    loading:false,
                    error:payload
                }
            }       
        default: return state
    }
}

export default loginReducer