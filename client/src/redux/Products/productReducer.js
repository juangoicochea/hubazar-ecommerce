import PRODUCT_ACTIONS from './productTypes'

const productState = {
    products: [],
    product_id: '',
    foundProducts: [],
    loading: "",
    error: "",
    numberOfProducts: 0,
    numberOfFoundProducts: 0
}

const productReducer = (state = productState, action) => {
    const { type, payload } = action
    switch (type) {
        case PRODUCT_ACTIONS.ACTION_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            }
        case PRODUCT_ACTIONS.ACTION_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case PRODUCT_ACTIONS.CLEAR_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                foundProducts: [],
                numberOfFoundProducts: 0
            }
        case PRODUCT_ACTIONS.FETCH_ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: payload,
                numberOfProducts: payload.length,
                error: ''
            }
        case PRODUCT_ACTIONS.FETCH_A_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                foundProducts: payload,
                numberOfFoundProducts: payload.length,
                error: ''
            }
        case PRODUCT_ACTIONS.FETCH_PRODUCT_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                foundProducts: payload,
                numberOfFoundProducts: payload.length,
                error: ''
            }
        case PRODUCT_ACTIONS.ADD_PRODUCT_SUCCESS:
            {
                return {
                    ...state,
                    loading: false,
                    products: [...state.products, payload],
                    product_id: payload,
                    numberOfProducts: state.numberOfProducts + 1,
                    error: ''
                }
            }

        case PRODUCT_ACTIONS.ADD_STOCK:
            {
                return state
            }

        case PRODUCT_ACTIONS.UPDATE_PRODUCT_SUCCESS:
            {
                const updatedProducts = state.products.map(product => {
                    if (product.product_id === payload.product_id) {
                        return payload
                    }
                    return product
                }
                )
                return {
                    ...state,
                    loading: false,
                    products: updatedProducts,
                    error: ''

                }
            }
        case PRODUCT_ACTIONS.DELETE_PRODUCT_SUCCESS:
            {
                const updatedProducts = state.products.filter(product => product.product_id !== payload.product_id)
                return {
                    ...state,
                    loading: false,
                    products: updatedProducts,
                    numberOfProducts: state.numberOfProducts - 1,
                    error: ''

                }
            }

        case PRODUCT_ACTIONS.FETCH_PRODUCT_CATEGORY_SUCCES:
            return {
                ...state,
                loading: false,
                foundProducts: payload,
                numberOfFoundProducts: payload.length,
                error: ''
            }
        case PRODUCT_ACTIONS.CLEAR_FILTER_CATEGORY:
            return {
                ...state,
                loading: false,
                foundProducts: state.products,
                numberOfFoundProducts: state.products.length,
                error: ''
            }
        default: return state
    }
}

export default productReducer