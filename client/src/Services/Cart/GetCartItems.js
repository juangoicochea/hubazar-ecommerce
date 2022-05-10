
/* 
import { setCartItems, fetchCartItems } from '../../redux/Cart/cartActions';
import { backendUrl } from '../../env';
import axios from 'axios';

export const GetCartItems = (userId) => {
    const savedCartItems = localStorage.getItem('savedCartItems') === true;
    const cart = savedCartItems ? localStorage.getItem('cart') : '';
    if (!userId && savedCartItems) {
        setCartItems(cart)
    }
    if (userId) {
        return axios.get(`${backendUrl}/cart/${userId}`)
            .then(response => {
                const cart = response.data;
                setCartItems(cart);
            })
            .catch(error => {
                console.log(error);
            });
    }
    return fetchCartItems(userId);
}

 */