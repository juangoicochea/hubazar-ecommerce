import CART_ACTIONS from './cartTypes'

const initCartState = {
  isLoading: false,
  error: null,
  cartItems: [],
  numberOfItems: 0,
  savedOnDB: false,
  totalPrice: 0.0,
  discountCoupon: '',
  discountAmount: 0.0
}

const cartReducer = (state = initCartState, action) => {
  const { type, payload } = action
  switch (type) {
    //logged get cart
    case CART_ACTIONS.LOAD_CART:

      const total = payload.map(e => {
        return parseFloat(e.unit_price) * parseInt(e.quantity)
      })
      return {
        ...state,
        cartItems: payload,
        numberOfItems: payload.length,
        totalPrice: total.reduce((a, b) => { return a + b })
      }

    case CART_ACTIONS.ADD_TO_CART:
      {
        if (payload.itemsToBuy === 0) return state
        if (state.cartItems.length === 0) {
          localStorage.setItem('cart', JSON.stringify([payload]));
          localStorage.setItem('savedCartItems', true);
          return {
            ...state,
            savedOnDB: false,
            cartItems: [payload],
            numberOfItems: parseInt(payload.itemsToBuy),
            totalPrice: parseFloat(payload.price) * parseInt(payload.itemsToBuy)
          }
        }
        let oldQty = 0
        let oldPrice = 0.0
        let newPrice = 0.0
        let newQuantity = 0
        let newTotalPrice = 0.0

        let found = false
        let updatedCartItems = state.cartItems.map(cartItem => {
          if (cartItem.product_id === payload.product_id && cartItem.seller_id === payload.seller_id) {
            oldQty = parseInt(payload.itemsToBuy)
            oldPrice = parseFloat(payload.price) * parseFloat(oldQty)
            newQuantity = (parseInt(payload.itemsToBuy) + parseInt(cartItem.itemsToBuy)) > parseInt(payload.stock) ?
              parseInt(payload.stock) :
              (parseInt(payload.itemsToBuy) + parseInt(cartItem.itemsToBuy))
            newPrice = parseFloat(payload.price) * newQuantity
            found = true
            return {
              ...cartItem,
              itemsToBuy: newQuantity,
              unit_price: parseFloat(payload.price)
            }
          }
          return cartItem
        })

        if (!found) {
          updatedCartItems = [...state.cartItems, payload]
          newPrice = parseFloat(payload.price) * parseInt(payload.itemsToBuy)
          newTotalPrice = parseFloat(state.totalPrice) + parseFloat(newPrice)
          newQuantity = parseInt(payload.itemsToBuy) + parseInt(state.numberOfItems)

        }
        else {
          newTotalPrice = parseFloat(state.totalPrice) + parseFloat(newPrice) - parseFloat(oldPrice)
          newQuantity = parseInt(payload.itemsToBuy) + parseInt(state.numberOfItems)

        }
        localStorage.setItem('cart', JSON.stringify([...updatedCartItems]));
        localStorage.setItem('savedCartItems', true);
        return {
          ...state,
          savedOnDB: false,
          cartItems: updatedCartItems,
          numberOfItems: newQuantity,
          totalPrice: newTotalPrice
        }
      }

    case CART_ACTIONS.UPDATE_TO_CART:
      {
        let oldQty = 0
        let oldPrice = 0.0
        let newPrice = parseFloat(payload.price) * parseFloat(payload.itemsToBuy)
        let updatedCartItems = state.cartItems.map(e => {
          if (e.product_id === payload.product_id && e.seller_id === payload.seller_id) {
            oldQty = parseInt(e.itemsToBuy)
            oldPrice = parseFloat(e.price) * parseFloat(oldQty)
            const newQuantity = parseInt(payload.itemsToBuy) > e.stock ? e.stock : parseInt(payload.itemsToBuy)
            newPrice = parseFloat(payload.price) * newQuantity
            return {
              ...e,
              itemsToBuy: newQuantity,
              unit_price: parseFloat(payload.price)
            }
          }
          return e
        })

        const newTotal = parseFloat(state.totalPrice) + parseFloat(newPrice) - parseFloat(oldPrice)
        const newQuantity = parseInt(state.numberOfItems) + parseInt(payload.itemsToBuy) - parseInt(oldQty)

        if (payload.itemsToBuy === 0) {
          updatedCartItems = updatedCartItems.filter(e => {
            return e.product_id !== payload.product_id && e.seller_id !== payload.seller_id
          })

        }
        localStorage.setItem('cart', JSON.stringify([...updatedCartItems]));
        localStorage.setItem('savedCartItems', true);
        return {
          ...state,
          savedOnDB: false,
          cartItems: updatedCartItems,
          numberOfItems: newQuantity,
          totalPrice: newTotal
        }
      }

    case CART_ACTIONS.REMOVE_FROM_CART:
      {
        const productToRemove = state.cartItems.find(product => product.product_id === payload.product_id && product.seller_id === payload.seller_id)
        const { itemsToBuy, price } = productToRemove
        const newTotal = parseFloat(state.totalPrice) - parseFloat(itemsToBuy) * parseFloat(price)
        const updatedCartItems = state.cartItems.filter(product => !(product.product_id === payload.product_id && product.seller_id === payload.seller_id))
        const newQuantity = parseInt(state.numberOfItems) - parseInt(itemsToBuy)
        localStorage.setItem('cart', JSON.stringify([...updatedCartItems]));
        localStorage.setItem('savedCartItems', true);
        return {
          ...state,
          savedOnDB: false,
          numberOfItems: newQuantity,
          cartItems: updatedCartItems,
          totalPrice: newTotal
        }
      }

    case CART_ACTIONS.EMPTY_CART:
      {
        localStorage.setItem('cart', JSON.stringify([]));
        localStorage.setItem('savedCartItems', false);
        return {
          ...state,
          savedOnDB: false,
          cartItems: [],
          numberOfItems: 0,
          totalPrice: 0.0
        }
      }

    case CART_ACTIONS.SET_CART_ITEMS: {
      let numberOfItems = 0;
      let totalPrice = 0.0;
      let cartItems = [];
      if (payload?.length > 0) {
        payload.forEach(product => {
          numberOfItems += parseInt(product.itemsToBuy)
          totalPrice += parseFloat(product.price) * parseFloat(product.itemsToBuy)
          cartItems.push(product)
        })
      }
      return {
        ...state,
        savedOnDB: false,
        cartItems: payload,
        numberOfItems,
        totalPrice
      }
    }

    case CART_ACTIONS.SET_DB_CART_ITEMS: {
      let numberOfItems = 0;
      let totalPrice = 0.0;
      let cartItems = [];
      if (payload.length > 0) {
        payload.forEach(product => {
          numberOfItems += parseInt(product.itemsToBuy)
          totalPrice += parseFloat(product.price) * parseFloat(product.itemsToBuy)
          cartItems.push(product)
        })
      }
      return {
        ...state,
        cartItems: payload,
        numberOfItems,
        savedOnDB: true,
        totalPrice
      }
    }

    case CART_ACTIONS.SAVE_DB_CART_ITEMS: {
      return {
        ...state,
        savedOnDB: true
      }
    }

    case CART_ACTIONS.ACTION_CART_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }

    case CART_ACTIONS.ACTION_CART_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: payload
      }
    }
    case CART_ACTIONS.CHECKOUT_REQUEST:
      {
        return {
          ...state,
          isLoading: true
        }
      }
    case CART_ACTIONS.CHECKOUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload
      }
    case CART_ACTIONS.CHECKOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        cartItems: [],
        totalPrice: 0.0
      }
    default: return state
  }
}

export default cartReducer