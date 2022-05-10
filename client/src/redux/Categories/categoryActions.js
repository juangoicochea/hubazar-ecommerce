import CATEGORY_ACTIONS from './categoryTypes'
import axios from 'axios';
import { backendUrl } from '../../env.js';

//Request for action
const actionCategoriesRequest = () => {
    return {
        type: CATEGORY_ACTIONS.ACTION_CATEGORIES_REQUEST
    }
}

//Failure for action
const actionCategoriesFailure = (error) => {
    return {
        type: CATEGORY_ACTIONS.ACTION_CATEGORIES_FAILURE,
        payload: error
    }
}

//success for fetching all Categories
const fetchAllCategoriesSuccess = (Categories) => {
    return {
        type: CATEGORY_ACTIONS.FETCH_ALL_CATEGORIES_SUCCESS,
        payload: Categories
    }
}

//success for fetching all Categories detailed
const fetchDetailCategoriesSuccess = (Categories) => {
    return {
        type: CATEGORY_ACTIONS.FETCH_CATEGORIES_DETAIL,
        payload: Categories
    }
}

//succes for posting category/sub category
const postCategorySucces = (category) => {
    return {
        type: CATEGORY_ACTIONS.POST_CATEGORY_SUCCES,
        payload: category
    }
}

//Fetch all Categories
export const fetchCategories = () => {
    return (dispatch) => {
        dispatch(actionCategoriesRequest())
        let api = backendUrl + 'products/categories'
        //console.log(`fetchCategories: ${api}`)
        axios.get(api)
            .then(response => {
                const Categories = response.data
                dispatch(fetchAllCategoriesSuccess(Categories))
            })
            .catch(error => {
                const msg = error.message
                dispatch(actionCategoriesFailure(msg))
            })
    }
}

//Fetch all Categories/detailed

export const fetchDetailCategories = () => {
    return (dispatch) => {
        dispatch(actionCategoriesRequest())
        let api = backendUrl + 'category'
        axios.get(api)
            .then(response => {
                const Categories = response.data
                dispatch(fetchDetailCategoriesSuccess(Categories))
            })
            .catch(error => {
                const msg = error.message
                dispatch(actionCategoriesFailure(msg))
            })
    }
}

//Post category (only-admin)
export const postCategory = (categoryToAdd) => {
    return (dispatch) => {
        let api = backendUrl + 'category'
        //console.log(`post to ${api} of ${categoryToAdd}`)
        axios.post(api, categoryToAdd)
            .then(response => {
                dispatch(postCategorySucces(response.data))
                dispatch(fetchDetailCategories())
            })
            .catch(error => {
                const msg = error.message
                dispatch(actionCategoriesFailure(msg))
            })
    }
}