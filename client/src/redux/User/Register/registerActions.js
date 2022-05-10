import REGISTER_ACTIONS from './registerTypes';
import axios from 'axios';
import { backendUrl } from '../../../env';


const actionCustomerRequest = () => {
    return {
        type: REGISTER_ACTIONS.REGISTER_CUSTOMER_INFO
    }
}

const addCustomerSuccess = (Customers) => {
    return {
        type: REGISTER_ACTIONS.ADD_CUSTOMER_SUCCESS,
        payload: Customers
    }
}

const actionCustomerFailure = (error) => {
    return {
        type: REGISTER_ACTIONS.ACTION_CUSTOMER_FAILURE,
        payload: error
    }
}

export const addCUSTOMER = (Customer) => {
    return (dispatch) => {
        dispatch(actionCustomerRequest())
        let api = backendUrl + 'auth/register'
        axios.post(api, Customer)
            .then(response => {
                dispatch(addCustomerSuccess(response.data))

            })
            .catch(error => {
                const msg = error.message
                dispatch(actionCustomerFailure(msg))
            })
    }
}

export const signUpGoogle = (userData) => async (dispatch) => {
    const data = await axios.post("http://localhost:5000/auth/loginGoogle", userData);
    return dispatch({
        type: REGISTER_ACTIONS.ACTION_SIGNUP_GOOGLE,
        payload: data,
    });
};