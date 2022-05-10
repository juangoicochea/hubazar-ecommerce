import PRODUCT_ACTIONS from './productTypes'
import axios from 'axios';
import { backendUrl } from '../../env.js';
import { generateRandomInt } from '../../utils'

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
//success for fetching product by category
const fetchProductsCategorySuccess = (products) => {
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
                //TODO: generate random price

                const productWithQty = products.map(product => {
                    const stock = product.stock || generateRandomInt(100) + 1;
                    return {
                        ...product,
                        stock
                    }
                })

                dispatch(fetchAllProductsSuccess(productWithQty))
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
                const products = response.data
                //TODO: generate random price
                const stock = products.stock || generateRandomInt(100) + 1;
                const productWithQty = {
                    ...products,
                    stock
                }
                dispatch(fetchProductByIdSuccess(productWithQty))
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
                const products = response.data
                //TODO: generate random price

                const productWithQty = products.map(product => {
                    const stock = product.stock || generateRandomInt(100) + 1;
                    return {
                        ...product,
                        stock
                    }
                })
                dispatch(fetchProductsByNameSuccess(productWithQty))
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

const addStockSuccess = () => {
    return {
        type: PRODUCT_ACTIONS.ADD_STOCK
    }
}

export const addPRODUCT = (product) => {
    return (dispatch) => {
        dispatch(actionProductsRequest())
        let api = backendUrl + 'products'
        //console.log(`Adding PRODUCT to: ${api}`)
        //console.log(product, '<------ add product')
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
        console.log(product)
        axios.post(api, product)
            .then(response => {
                console.log(response.data, '---data stock')
                dispatch(addStockSuccess())
            })
            .catch((e) => {
                console.log(e)
                dispatch(actionProductsFailure(e))
            })
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
        // console.log(`deleting Diet with id ${Product.id} to: ${api}`)
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
        //console.log(`updating Product with id ${Product.id} to: ${api}`)
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
                dispatch(fetchProductsCategorySuccess(products))
            })
            .catch(error => {
                const msg = error.message
                dispatch(actionProductsFailure(msg))
            })
    }
}

export const clearFilterCategory = () => {
    return {
        type: PRODUCT_ACTIONS.CLEAR_FILTER_CATEGORY
    }
}
