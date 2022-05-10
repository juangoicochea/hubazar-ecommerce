import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux'
import styles from './seller.option.module.css'

const SellerOptions = (
    { product_id,
        name,
        image,
        seller, }
) => {

    const user_id = useSelector(state => state.login.login.id)
    const dispatch = useDispatch()
    const [count, setCount] = useState(0);
    //console.log(seller, 'seller detail')
    const addCart = () => {
        if (count !== 0) {
            const payload = {
                product_id, name,
                stock: seller.stock.quantity, price: seller.stock.unit_price,
                image,
                seller_id: seller.user_id, seller_name: seller.name,
                itemsToBuy: count
            }
            console.log(payload, 'payload from modal');
            dispatch(addToCart(payload, user_id))
        } else {
            dispatch(removeFromCart({ product_id }))
        }
    }
    return (
        <div key={seller.user_id} className={styles.optionSeller}>
            <span className={styles.sellerName}>Sold by:&nbsp;<b> {seller.name}</b></span>
            <div className={styles.cardSeller}>
                <div>${seller.stock.unit_price}</div>
                <div>avaible units: {seller.stock.quantity}</div>
                <div className={styles.contentCount}>
                    <button className={styles.incDec} onClick={() => { if (count > 0) { setCount(count - 1) } }}>-</button>
                    <div className={styles.count} >{count}</div>
                    <button className={styles.incDec} onClick={() => { if (count < seller.stock.quantity) { setCount(count + 1) } }}>+</button>
                </div>
                <button className={styles.cart} onClick={() => { addCart() }}>Add to cart</button>
            </div>
        </div>
    )
}

export default SellerOptions