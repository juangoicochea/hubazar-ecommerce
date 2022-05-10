import React from 'react'
import styles from './ItemsOrdered.module.css'
import { saleState } from '../utils/utilsProvider'

const ItemsOrdered = ({ order }) => {
    const seller = order.buyer_name
    const sellerEmail = order.buyer_email

    return (
        <>
            <div className={styles.orderStatusWrap}>
                <div className={styles.orderInfoWrap}>
                    <div>
                        <div className={styles.orderId}>Order # {order.order_id}</div>
                        <div className={styles.orderDate}>
                            <span>Order Date: </span>
                            <span>{order.input}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.orderStatusInner}>
                    {saleState(order.type, order.order_id)}
                </div>
            </div>
            <div className={styles.orderDetailsItems}>
                <div className={styles.tableWrapper}>

                    <div className={styles.sellerInfo}>
                        <div>Buyer info</div>
                        <div><span>Name: {seller}</span> <a href={`mailto:${sellerEmail}`}>Contact buyer</a></div>
                    </div>

                    <table className={styles.tableOrderItems}>
                        <thead>
                            <tr>
                                <th>&nbsp;</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th className={styles.qty}>Qty</th>
                                <th className={styles.qty}>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* START - BLOCK FOR EACH PRODUCT /////////////*/}
                            <tr>
                                <td>&nbsp;</td>
                                <td>
                                    <strong className={styles.productItemName}>{order.product}</strong>
                                </td>
                                <td className={styles.price}>
                                    ${order.unit_price}
                                </td>
                                <td className={styles.qty}>
                                    <ul className={styles.itemsQty}>
                                        {order.quantity}
                                    </ul>
                                </td>
                                <td className={styles.subtotal}>
                                    <span className={styles.priceExcludingTax}>
                                        <span className={styles.price}>{order.unit_price * order.quantity}</span>
                                    </span>
                                </td>
                            </tr>
                            {/* END - BLOCK FOR EACH PRODUCT ///////////////*/}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colspan="4" className={styles.mark} scope="row">
                                    <strong>Grand Total</strong>
                                </th>
                                <td className={styles.amount}>
                                    <strong>
                                        <span className={styles.price}>{order.unit_price * order.quantity}</span>
                                    </strong>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ItemsOrdered