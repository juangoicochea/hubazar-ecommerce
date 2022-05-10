import { backendUrl } from '../../../../env'
import axios from 'axios'

// --------------------sales
export const mySales = (user_id, setOrders) => {
    axios(`${backendUrl}movement?userId=${user_id}` + '&type=seller')
        .then(response => {
            setOrders(response.data)
        })
        .catch(e => console.error)
}
// --------------------My Products
export const myProducts = (user_id, setOrders) => {
    //https://hubazar.herokuapp.com/stock/?userId
    axios(`${backendUrl}stock?userId=${user_id}`)
        .then(response => {
            setOrders(response.data)
        })
        .catch(e => console.error)
}
//-------------------change state saleOrder to sent
export const sentSale = (sale_id) => {
    axios.patch(`${backendUrl}movement/status/?orderId=${sale_id}`)
        .then(response => {
            return response.data
        })
        .catch(e => { return console.error })
}
//------------------select Change state sale
export const saleState = (initialState, sale_id) => {
    if (initialState === 'SALE') {
        return (
            <select onChange={(e) => { sentSale(sale_id) }}>
                <option>pending</option>
                <option>mark as sent</option>
            </select>
        )
    }
    if (initialState === 'SENT') {
        return (<select>
            <option>sent</option>
        </select>)
    }
    if (initialState === 'RECEIVED') {
        return (
            <select>
                <option>{initialState}</option>
            </select>
        )
    }
}
//-------------------select change state shopping
export const shoppingState = (initialState, orderId) => {
    console.log('change order shop')
    console.log(initialState, orderId)
    console.log('change order shop')
    if (initialState === 'SALE') {
        return (
            <select>
                <option>pending</option>
            </select>
        )
    }
    if (initialState === 'SENT') {
        return (
            <select onChange={() => sentSale(orderId)}>
                <option >sent</option>
                <option>mark as received</option>
            </select>)
    }
    if (initialState === 'RECEIVED') {
        return (
            <select>
                <option>{initialState}</option>
            </select>
        )
    }
}
