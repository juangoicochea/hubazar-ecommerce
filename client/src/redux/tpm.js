import PRODUCT_ACTIONS from './productTypes'
import axios from 'axios';
import { backendUrl } from '../../env.js';

//Request for action
const actionProductsRequest = () => {
    return {
        type: PRODUCT_ACTIONS.ACTION_PRODUCTS_REQUEST
    }
}

//Failure for action
const actionProductsFailure = (error) => {
    return {
        type: PRODUCT_ACTIONS.ACTION_PRODUCTS_FAILURE,
        payload: error
    }
}

//success for fetching all Products
const fetchAllProductsSuccess = (Products) => {
    return {
        type: PRODUCT_ACTIONS.FETCH_ALL_PRODUCTS_SUCCESS,
        payload: Products
    }
}
//succes for fetching product by category
const fetchProductsCategorySucces = (products) => {
    return {
        type: PRODUCT_ACTIONS.FETCH_PRODUCT_CATEGORY_SUCCES,
        payload: products
    }
}

//Fetch all Products
export const fetchProducts = () => {
    return (dispatch) => {
        dispatch(actionProductsRequest())
        let api = backendUrl + 'products'
        axios.get(api)
            .then(response => {
                const products = response.data
                dispatch(fetchAllProductsSuccess(products))
            })
            .catch(error => {
                const msg = error.message
                dispatch(actionProductsFailure(msg))
            })
    }
}

//success for fetching some Products
const fetchProductsByNameSuccess = (Products) => {
    return {
        type: PRODUCT_ACTIONS.FETCH_A_PRODUCT_SUCCESS,
        payload: Products
    }
}
//success for fetching a Products by id
const fetchProductByIdSuccess = (Product) => {
    return {
        type: PRODUCT_ACTIONS.FETCH_PRODUCT_ID_SUCCESS,
        payload: Product
    }
}

//Fetch one  PRODUCTs by ID
export const fetchProductById = (id) => {
    return (dispatch) => {
        dispatch(actionProductsRequest())
        let api = backendUrl + `products/?product_id=${id}`
        axios.get(api)
            .then(response => {
                const Products = response.data
                dispatch(fetchProductByIdSuccess(Products))
            })
            .catch(error => {
                const msg = error.message
                dispatch(actionProductsFailure(msg))
            })
    }
}


//Fetch one  search
export const fetchProductByName = (search) => {
    return (dispatch) => {
        dispatch(actionProductsRequest())
        let api = backendUrl + 'products/search/?search=' + search
        axios.get(api)
            .then(response => {
                const Products = response.data
                dispatch(fetchProductsByNameSuccess(Products))
            })
            .catch(error => {
                const msg = error.message
                dispatch(actionProductsFailure(msg))
            })
    }
}

//add the PRODUCT
const addProductSuccess = (product_id) => {
    return {
        type: PRODUCT_ACTIONS.ADD_PRODUCT_SUCCESS,
        payload: product_id
    }
}

const addStockSucces = () => {
    return {
        type: PRODUCT_ACTIONS.ADD_STOCK
    }
}

export const addPRODUCT = (product) => {
    return (dispatch) => {
        dispatch(actionProductsRequest())
        let api = backendUrl + 'products'
        console.log(`Adding PRODUCT to: ${api}`)
        axios.post(api, product)
            .then(response => {
                dispatch(addProductSuccess(response.data.product_id))
            })
            .catch(error => {
                const msg = error.message
                dispatch(actionProductsFailure(msg))
            })
    }
}

export const addStock = (product) => {
    return dispatch => {
        dispatch(actionProductsRequest())
        let api = backendUrl + 'stock'
        console.log(`Adding STOCK to: ${api}`)
        axios.post(api, product)
            .then(response => {
                console.log(response.data, 'data stock')
                dispatch(addStockSucces())
            })
            .catch(console.error)
    }
}

//Remove the PRODUCT
const deleteProductSuccess = (Products) => {
    return {
        type: PRODUCT_ACTIONS.DELETE_PRODUCT_SUCCESS,
        payload: Products
    }
}

export const deleteProduct = (Product) => {
    return (dispatch) => {
        dispatch(actionProductsRequest())
        let api = backendUrl + 'Product/' + Product.id
        console.log(`deleting Diet with id ${Product.id} to: ${api}`)
        axios.delete(api, Product)
            .then(response => {
                dispatch(deleteProductSuccess(Product.id))
            })
            .catch(error => {
                const msg = error.message
                dispatch(actionProductsFailure(msg))
            })
    }
}

//Update the Product
const updateProductSuccess = (Product) => {
    return {
        type: PRODUCT_ACTIONS.UPDATE_PRODUCT_SUCCESS,
        payload: Product
    }
}

export const updateProduct = (Product) => {
    return (dispatch) => {
        dispatch(actionProductsRequest())
        let api = backendUrl + 'Product/'
        console.log(`updating Product with id ${Product.id} to: ${api}`)
        axios.put(api, Product)
            .then(response => {
                dispatch(updateProductSuccess(Product.id))
            })
            .catch(error => {
                const msg = error.message
                dispatch(actionProductsFailure(msg))
            })
    }
}

export const clearSearchedProducts = () => {
    return {
        type: PRODUCT_ACTIONS.CLEAR_PRODUCT_SUCCESS
    }
}

export const fetchProductByCategory = (category) => {
    return dispatch => {
        dispatch(actionProductsRequest())
        let api = backendUrl + 'products/categories/?name=' + category;
        axios(api)
            .then(response => {
                const products = response.data
                dispatch(fetchProductsCategorySucces(products))
            })
            .catch(error => {
                const msg = error.message
                dispatch(actionProductsFailure(msg))
            })
    }
}

