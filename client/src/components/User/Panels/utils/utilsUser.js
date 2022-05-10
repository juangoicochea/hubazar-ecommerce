import styles from '../Panels.module.css'
const { default: axios } = require("axios")
const { backendUrl } = require('../../../../env')

//do you want to sell?
export const wantSell = (user_id, setWantSellError) => {
    axios.patch(`${backendUrl}dashboard/provider?userId=${user_id}`)
        .then(response => {
            setWantSellError(false)
        })
        .catch(e => {
            setWantSellError(true)
            return console.error
        })
}
//my orders
export const myOrders = (user_id, setOrders) => {
    axios(`${backendUrl}movement?userId=${user_id}`)
        .then(response => {
            setOrders(response.data)
        })
        .catch(e => console.error)
}
//return orders
export const returnOrders = (orders) => {
    return (
        orders.map(order => (
            <tr>
                <td>
                    <span>Order: </span>
                    <a href='#' name='itemsOrdered' onClick={''}>
                        {order.order_id}
                    </a>
                </td>
                <td><span>Date: </span>{order.input}</td>
                <td><span>Ship To: </span>Jon Doe</td>
                <td><span>Order Total: </span><span className={styles.price}>$550.00</span></td>
                <td>
                    <span>Status: </span><a href='#' name='itemsOrdered' onClick={''}>Pending</a>
                </td>
            </tr>
        ))
    )
}