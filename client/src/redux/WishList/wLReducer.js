import WISH_LIST_ACTIONS from './wLTypes'

const initWishListState = {
    wishListItems: [],
    numberOfItems: 0,
    isLoading: false,
    error: null,
}

const wishListReducer = (state = initWishListState, action) => {
    const { type, payload } = action
    switch (type) {
        case WISH_LIST_ACTIONS.ADD_TO_WISH_LIST:
            {
                const {
                    product_id, name,
                    stock, price,
                    image, rating, seller_id
                } = payload

                if (state.wishListItems.length === 0) {
                    localStorage.setItem('wishList', JSON.stringify([payload]));
                    localStorage.setItem('savedWishListItems', true);
                    return {
                        ...state,
                        wishListItems: [payload],
                        numberOfItems: 1,
                    }
                }
                let found = false
                let updatedWishListItems = state.wishListItems.map(e => {
                    if (e.product_id === product_id && e.seller_id === seller_id) {
                        found = true
                        return {
                            ...e,
                            itemsToBuy: (parseInt(e.itemsToBuy) + 1) > parseInt(stock) ?
                                parseInt(stock) :
                                (parseInt(e.itemsToBuy) + 1),
                            unit_price: parseFloat(price)
                        }
                    }
                    return e
                })
                if (!found) {
                    updatedWishListItems = [...state.wishListItems, payload]
                }
                localStorage.setItem('wishList', JSON.stringify(updatedWishListItems));
                localStorage.setItem('savedWishListItems', true);
                return {
                    ...state,
                    wishListItems: updatedWishListItems,
                    numberOfItems: updatedWishListItems.length,
                }
            }

        case WISH_LIST_ACTIONS.UPDATE_TO_WISH_LIST:
            {
                const updatedWishListItems = state.wishListItems.map(e => {
                    if (e.product_id === payload.product_id && e.seller_id === payload.seller_id) {
                        return {
                            ...e,
                            itemsToBuy: (parseInt(e.itemsToBuy) + 1) > parseInt(payload.stock) ?
                                parseInt(payload.stock) :
                                (parseInt(e.itemsToBuy) + 1),
                            unit_price: parseFloat(payload.price)
                        }
                    }
                    return e
                })

                localStorage.setItem('wishList', JSON.stringify([...updatedWishListItems]));
                localStorage.setItem('savedWishListItems', true);
                return {
                    ...state,
                    wishListItems: updatedWishListItems,
                }
            }

        case WISH_LIST_ACTIONS.REMOVE_FROM_WISH_LIST:
            {
                const updatedWishListItems = state.wishListItems.filter(e => e.product_id === payload.product_id && e.seller_id === payload.seller_id)
                localStorage.setItem('wishList', JSON.stringify([...updatedWishListItems]));
                localStorage.setItem('savedWishListItems', true);
                return {
                    ...state,
                    numberOfItems: state.numberOfItems - 1,
                    wishListItems: updatedWishListItems,
                }
            }

        case WISH_LIST_ACTIONS.EMPTY_WISH_LIST:
            {
                localStorage.setItem('wishList', JSON.stringify([]));
                localStorage.setItem('savedWishListItems', false);
                return {
                    ...state,
                    wishListItems: [],
                    numberOfItems: 0
                }

            }
        case WISH_LIST_ACTIONS.SET_CART_ITEMS: {
            let numberOfItems = 0;
            let wishListItems = [];
            if (payload.length > 0) {
                payload.forEach(product => {
                    numberOfItems += 1
                    wishListItems.push(product)
                })
            }

            localStorage.setItem('wishList', JSON.stringify(...wishListItems));
            localStorage.setItem('savedWishListItems', true);


            return {
                ...state,
                wishListItems: payload,
                numberOfItems,
            }
        }
        case WISH_LIST_ACTIONS.SET_WISH_LIST_ITEMS: {
            let numberOfItems = 0;
            let wishListItems = [];
            if (payload.length > 0) {
                payload.forEach(product => {
                    numberOfItems += 1
                    wishListItems.push(product)
                })
            }

            return {
                ...state,
                wishListItems: payload,
                numberOfItems,
            }
        }
        default: return state
    }
}

export default wishListReducer