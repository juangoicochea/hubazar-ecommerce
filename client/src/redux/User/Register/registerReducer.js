import REGISTER_ACTIONS from './registerTypes';

const registerState = {

    loading: '',
    error: '',
    succes: ''
}

const registerReducer = (state = registerState, action) => {
    const { type, payload } = action
    switch (type) {
        case REGISTER_ACTIONS.REGISTER_CUSTOMER_INFO:
            return {
                ...state,
                loading: true,
                error: ''
            }
        case REGISTER_ACTIONS.ACTION_CUSTOMER_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case REGISTER_ACTIONS.ADD_CUSTOMER_SUCCESS:
            {
                return {
                    ...state,
                    loading: false,
                    error: false,
                    succes: true
                }
            }
        case REGISTER_ACTIONS.ACTION_SIGNUP_GOOGLE:
            {
                return {
                    ...state,
                    loading:false,
                    error:false,
                    succes:true
                }
            }    
        default: return state
    }
}

export default registerReducer