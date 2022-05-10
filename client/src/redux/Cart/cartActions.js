import CART_ACTIONS from './cartTypes'
import axios from 'axios';
import { backendUrl } from '../../env.js';

//------------------------------------------------------
// Private Functions
//------------------------------------------------------

const setCartItemsRequest = () => {
    return {
        type: CART_ACTIONS.ACTION_CART_REQUEST
    }
}

//Failure for action
const setCartItemsFailure = (error) => {
    return {
        type: CART_ACTIONS.ACTION_CART_FAILURE,
        payload: error
    }
}

//success for fetching all Products
const setCartItemsSuccess = (cart) => {
    return {
        type: CART_ACTIONS.SET_CART_ITEMS,
        payload: cart
    }
}

const setCartItemsFromDBSuccess = (cart) => {
    return {
        type: CART_ACTIONS.SAVE_DB_CART_ITEMS,
        payload: cart
    }
}

const addToCartSuccess = (payload) => {
    return {
        type: CART_ACTIONS.ADD_TO_CART,
        payload
    }
}


const checkoutRequest = () => {
    return {
        type: CART_ACTIONS.CHECKOUT_REQUEST
    }
}

export const checkoutSuccess = () => {
    return {
        type: CART_ACTIONS.CHECKOUT_SUCCESS,
    }
}

const checkoutFailure = (error) => {
    return {
        type: CART_ACTIONS.CHECKOUT_FAILURE,
        payload: error
    }
}

const fetchCartItemsRequest = () => {
    return {
        type: CART_ACTIONS.ACTION_CART_REQUEST
    }
}

//Failure for action
const fetchCartItemsFailure = (error) => {
    return {
        type: CART_ACTIONS.ACTION_CART_FAILURE,
        payload: error
    }
}

//success for fetching all Products
const fetchCartItemsSuccess = (cart) => {
    return {
        type: CART_ACTIONS.ACTION_CART_SUCCESS,
        payload: cart
    }
}

const removeFromCartSuccess = (payload) => {
    return {
        type: CART_ACTIONS.REMOVE_FROM_CART,
        payload
    }
}
const emptyCartSuccess = (payload) => {
    return {
        type: CART_ACTIONS.EMPTY_CART,
        payload
    }
}

const updateCartItemSuccess = (payload) => {
    return {
        type: CART_ACTIONS.UPDATE_TO_CART,
        payload
    }
}

//------------------------------------------------------
// Exported Functions
//------------------------------------------------------

export const addToCart = (payload) => {
    return dispatch => {
        dispatch(addToCartSuccess(payload))
    }
}

export const postCartToDB = (cartItems, userId) => {
    return dispatch => {
        dispatch(setCartItemsRequest())
        if (userId && cartItems?.length > 0) {
            //console.log("solo pasa si el carrito no esta vacio y tiene un usuario");
            const backendItems = cartItems.map(product => {
                return {
                    product_id: product.product_id,
                    seller_id: product.seller_id,
                    quantity: product.itemsToBuy
                }
            })
            const backendData = {
                buyer_id: userId,
                products: backendItems
            }
            //console.log(backendData, "carrito para el backend");
            axios.post(`${backendUrl}cart/`, backendData)
                .then(res => {
                    console.log(res.data, '<--- data added to Cart Backend')
                    dispatch(setCartItemsFromDBSuccess(res.data))
                }).catch(err => {
                    dispatch(setCartItemsFailure(err))
                })
            //*/
        }
    }
}

export const fetchCartItems = (userId) => {
    return (dispatch) => {
        dispatch(fetchCartItemsRequest());
        return axios.get(`${backendUrl}cart/?id=${userId}`)
            .then(response => {
                const cart = response.data;
                dispatch(fetchCartItemsSuccess(cart));
            })
            .catch(error => dispatch(fetchCartItemsFailure(error.data)));
    };
}

export const checkOutCart = (buyer) => {
    return dispatch => {
        dispatch(checkoutRequest())
        return axios.post(`${backendUrl}movement/prueba`, { buyer: buyer.toString() })
            .then(response => {

                if (typeof (response.data) === 'string') {
                    if (response.data.includes('mercadopago')) {
                        window.location.href = response.data
                        dispatch(checkoutSuccess())
                    } else {
                        dispatch(checkoutFailure(response.data))
                    }
                } else {
                    dispatch(checkOutCart(response.data))
                }
            })
            .catch(e => { return console.error })
    }
}


// export const checkOutCart = (userId, external_reference) => {
//     return (dispatch) => {
//         dispatch(checkoutRequest());
//         return axios.post(`${backendUrl}/mp_confirmation/?external_reference=${external_reference}`)
//             .then(axios.delete(`${backendUrl}/cart/all/${external_reference}`, { body: { id: external_reference } })
//                 .then((data) => {
//                     console.log("RESPONSE: ", data)
//                     dispatch(checkoutSuccess(data));
//                 })
//                 .catch(error => dispatch(checkoutFailure(error))));
//     };
// }

export const getCartItems = (userId) => {
    // console.log("getting CartItems")
    const savedCartItems = JSON.parse(localStorage.getItem('savedCartItems')) === true;
    let cartFromLocalStorage = [];
    if (savedCartItems) {
        //console.log("should find saved cart items");
        cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'));
        //console.log(cartFromLocalStorage, "cart from local storage");
    }

    return (dispatch) => {
        if (!userId && savedCartItems) {
            //console.log("saving local cart items to redux");
            dispatch(setCartItemsSuccess(cartFromLocalStorage));
            console.log(cartFromLocalStorage, `cart from local storage for Guest user`);
        }
        if (userId) {
            //console.log(`saving cart items in the database  from user: ${userId} to redux`);
            //console.log(cartFromLocalStorage, `cart from local storage for user ${userId}`);
            axios.get(`${backendUrl}cart/?id=${userId}`)
                .then(response => {
                    let cart = response.data;
                    if (Array.isArray(cart) && cart.length > 0) {
                        cart = cart.map(item => {
                            return {
                                product_id: item.product_id,
                                name: item.product.name,
                                stock: item.product.stock,
                                price: item.product.price,
                                image: item.product.images[0],
                                rating: item.product.rating,
                                itemsToBuy: item.quantity,
                                seller_id: item.seller_id,
                                seller_name: item.seller_name
                            }
                        })
                        //console.log(cart, "<--- cart from db");
                        cartFromLocalStorage = [...cartFromLocalStorage, ...cart];
                        //TODO: get rid of duplicate items
                        const uniq = (list) => {
                            var seen = {};
                            return list.filter(function (item) {
                                return seen.hasOwnProperty(item.seller_id + "" + item.product_id) ? false : (seen[item.seller_id + "" + item.product_id] = true);
                            });
                        }
                        cartFromLocalStorage = uniq(cartFromLocalStorage);
                        console.log(cartFromLocalStorage, "<--- cart from db after uniq");

                        localStorage.setItem('cart', JSON.stringify(cartFromLocalStorage));
                        localStorage.setItem('savedCartItems', true);
                        dispatch(setCartItemsSuccess(cartFromLocalStorage))
                    }
                    else {
                        console.log(cartFromLocalStorage, "<--- cart from db");
                    }

                    //dispatch(getCartItemsFromDBSuccess(cart));
                })
                .catch(err => {
                    dispatch(setCartItemsFailure(err))
                })

            /*             return axios.get(`${backendUrl}cart/?id=${userId}`)
                            .then(response => {
                                let cart = response.data;
                                if (Array.isArray(cart) && cart.length > 0) {
                                    cart = cart.map(item => {
                                        return {
                                            product_id: item.product_id,
                                            name: item.product.name,
                                            stock: item.product.stock,
                                            price: item.product.price,
                                            image: item.product.images[0],
                                            rating: item.product.rating,
                                            itemsToBuy: item.quantity,
                                            seller_id: item.seller_id,
                                        }
                                    })
                                    console.log(cart, "<--- cart from db");
                                    //cartFromLocalStorage = [...cartFromLocalStorage, ...cart];
                                    localStorage.setItem('cart', JSON.stringify(cartFromLocalStorage));
                                    localStorage.setItem('savedCartItems', true);
                                    dispatch(setCartItemsSuccess(cartFromLocalStorage))
                                }
                                else {
                                    console.log(cartFromLocalStorage, "<--- cart from db");
                                }
            
                                //dispatch(getCartItemsFromDBSuccess(cart));
                            })
                            .catch(error => {
                                console.log(error);
                                dispatch(setCartItemsFailure(error));
                            }); */
        }
    };
}


export const updateCartItem = (payload) => {
    return {
        type: CART_ACTIONS.UPDATE_TO_CART,
        payload
    }
}

export const removeFromCart = (cartItem, userId) => {
    return dispatch => {
        dispatch(fetchCartItemsRequest());
        if (!userId) {
            return dispatch(removeFromCartSuccess(cartItem));
        }
        const backendData = {
            buyer_id: userId,
            target: cartItem.product_id,
            seller_id: cartItem.seller_id
        }
        //console.log(backendData, "<--- backendData to delete");

        return axios.delete(`${backendUrl}cart/`, { data: backendData })
            .then(response => {
                dispatch(removeFromCartSuccess(cartItem));
                dispatch(fetchCartItems(userId));
            })
            .catch(error => dispatch(fetchCartItemsFailure(error)));
    };
}
//removeFromCartSuccess

export const emptyCart = (userId) => {
    return dispatch => {
        dispatch(fetchCartItemsRequest());
        if (!userId) {
            return dispatch(emptyCartSuccess());
        }
        const backendData = {
            buyer_id: userId,
            target: "ALL",
            seller_id: 1
        }
        console.log(backendData, "<--- backendData");
        const url = `${backendUrl}cart/all/${userId}`;
        console.log(url, "<--- url");
        return axios.delete(url)
            .then(response => {
                console.log(response.data, "<--- response");
                dispatch(emptyCartSuccess());
            })
            .catch(error => dispatch(fetchCartItemsFailure(error)));
        // */
    };
}


