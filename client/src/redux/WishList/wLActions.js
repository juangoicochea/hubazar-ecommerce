import WISH_LIST_ACTIONS from './wLTypes'
import axios from 'axios';
import { backendUrl } from '../../env.js';

export const addToWL = (payload, userId) => {
    return dispatch => {
        dispatch(setWishListItemsRequest())
        if (userId) {
            const backendData = {
                user_id: userId,
                product_id: payload.product_id,
                seller_id: payload.seller_id,
            }
            //console.log(backendData, "backendData")
            axios.post(`${backendUrl}wishlist/`, backendData)
                .then(res => {
                    //console.log(res.data, '<--- add to wish list')
                    dispatch(addToWLSuccess(payload))

                }).catch(err => {
                    //console.log(err)
                    dispatch(setWishListItemsFailure(err))
                })
        }
        dispatch(addToWLSuccess(payload))
    }
}

export const removeFromWL = (payload, userId) => {
    return dispatch => {
        dispatch(setWishListItemsRequest())
        if (userId) {
            const backendData = {
                user_id: userId,
                target: payload.product_id,
                seller_id: payload.seller_id,
            }
            //console.log(payload, '<--- payload data to remove from wish list')
            //console.log(backendData, '<--- backend data to remove from wish list')
            axios.delete(`${backendUrl}wishlist/`, { data: backendData })
                .then(res => {
                    //console.log(res.data, '<--- remove wish list item')
                    dispatch(removeFromWLSuccess(payload))
                }).catch(err => {
                    //console.log(err)
                    dispatch(setWishListItemsFailure(err))
                })
        }
        dispatch(removeFromWLSuccess(payload))
    }
}

export const removeFromWLSuccess = (payload) => {
    return {
        type: WISH_LIST_ACTIONS.REMOVE_FROM_WISH_LIST,
        payload
    }
}

export const emptyWLSuccess = () => {
    return {
        type: WISH_LIST_ACTIONS.EMPTY_WISH_LIST
    }
}
export const emptyWL = (payload, userId) => {
    return dispatch => {
        dispatch(setWishListItemsRequest())
        if (userId) {
            const backendData = {
                user_id: userId,
                target: "all",
                seller_id: payload.seller_id,
            }
            axios.delete(`${backendUrl}wishlist/`, { data: backendData })
                .then(res => {
                    console.log(res.data, '<--- remove wish list item')
                    dispatch(emptyWLSuccess(payload))
                }).catch(err => {
                    dispatch(setWishListItemsFailure(err))
                })
        }
        dispatch(emptyWLSuccess(payload))
    }
}
const fetchWLItemsRequest = () => {
    return {
        type: WISH_LIST_ACTIONS.ACTION_WISH_LIST_REQUEST
    }
}
//Failure for action
const fetchWLItemsFailure = (error) => {
    return {
        type: WISH_LIST_ACTIONS.ACTION_WISH_LIST_FAILURE,
        payload: error
    }
}

//success for fetching all Products
const addToWLSuccess = (wishList) => {
    return {
        type: WISH_LIST_ACTIONS.ADD_TO_WISH_LIST,
        payload: wishList
    }
}

export const fetchWLItems = (userId) => {
    return (dispatch) => {
        //console.log("fetching wish list items on user id: ", userId)
        dispatch(fetchWLItemsRequest());
        return axios.get(`${backendUrl}wishlist/?user_id=${userId}`)
            .then(response => {
                const wishList = response.data;
                //console.log(wishList, '<--- wish list');
                const wishListItems = wishList.map(item => {
                    return {
                        name: item.name,
                        stock: item.stock,
                        price: item.price,
                        image: item.images?.[0],
                        rating: item.rating,
                        seller_id: item.seller_id,
                        product_id: item.product_id,
                    }
                })
                //localStorage.setItem('wishList', wishList);
                //localStorage.setItem('savedWishListItems', true);
                dispatch(setWishListItemsSuccess(wishListItems));
            })
            .catch(error => dispatch(fetchWLItemsFailure(error)));
    };
}

const setWishListItemsRequest = () => {
    return {
        type: WISH_LIST_ACTIONS.ACTION_WISH_LIST_REQUEST
    }
}

//Failure for action
const setWishListItemsFailure = (error) => {
    return {
        type: WISH_LIST_ACTIONS.ACTION_WISH_LIST_FAILURE,
        payload: error
    }
}

//success for fetching all Products
const setWishListItemsSuccess = (wishList) => {
    return {
        type: WISH_LIST_ACTIONS.SET_WISH_LIST_ITEMS,
        payload: wishList
    }
}

export const getWishListItems = (userId) => {
    console.log("getting Wish List Items")
    const savedWishListItems = JSON.parse(localStorage.getItem('savedWishListItems')) === true;
    let wishList = [];
    if (savedWishListItems) {
        console.log("should find saved wishList items on local Storage");
        wishList = JSON.parse(localStorage.getItem('wishList'));
    }
    return (dispatch) => {
        dispatch(setWishListItemsRequest())
        if (!userId && savedWishListItems) {
            console.log("saving local wishList items to redux");
            dispatch(setWishListItemsSuccess(wishList));
        }
        if (userId) {
            return axios.get(`${backendUrl}/wishList/${userId}`)
                .then(response => {
                    console.log("should find saved wishList items on backend");
                    const wishList = response.data;
                    dispatch(setWishListItemsSuccess(wishList));
                    localStorage.setItem('wishList', wishList);
                    localStorage.setItem('savedWishListItems', true);
                })
                .catch(error => {
                    console.log(error);
                    dispatch(setWishListItemsFailure(error));
                });
        }
    };
}
