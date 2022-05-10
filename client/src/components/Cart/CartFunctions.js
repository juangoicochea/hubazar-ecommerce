export const initCartState = {
    buyerId: '',
    cart: [],
    numberOfItems: 0,
    totalPrice: 0.0,
    discountCoupon: '',
    discountAmount: 0.0
}

/* const payload = {
    id, title,
    inventoryQty, price,
    image, rating, itemsToBuy
}
 */
export const addToCart = (cartList, item) => {
    const {
        itemsToBuy, inventoryQty
    } = item;
    if (!cartList.cart) {
        cartList.cart = [item];
        console.log("filling list with 1 item");
    }
    else {
        console.log(`cartList.cart.length: ${cartList.cart.length}`);
        let found = false;
        let newCart = cartList.cart.map(product => {
            if (product.id === item.id) {
                product.itemsToBuy + itemsToBuy > inventoryQty ? product.itemsToBuy = inventoryQty : product.itemsToBuy += itemsToBuy;
                console.log("item.itemsToBuy: " + product.itemsToBuy);
                found = true;
            }
            return product;
        });
        if (!found) {
            newCart = [...newCart, item];
            console.log("adding new item");
        }
        cartList.cart = newCart;
    }
    cartList.numberOfItems += itemsToBuy;
    cartList.totalPrice += item.price * itemsToBuy;
    return {
        ...cartList,
        cart: [...cartList.cart]

    };
}
/* 
if (cart.length === 0) {
        cart = [...cart, item]
    }
    else {
        const updatedCart = cart.map(cartItem => {
            if (cartItem.id === item.id) {
                cartItem.itemsToBuy += itemsToBuy
                cartItem.totalPrice += item.price * itemsToBuy
                return cartItem
            }
            return cartItem
        })
        cart = [...updatedCart]
    }
    return cart
}

 */
