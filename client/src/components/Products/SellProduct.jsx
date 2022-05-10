import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addStock, fetchProducts } from '../../redux'
import styles from './seller.option.module.css'
import { useNavigate } from 'react-router-dom'

const SellProduct = (
    { product_id
    }
) => {

    const user_id = useSelector(state => state.login.login.id)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [count, setCount] = useState(0);
    const [price, setPrice] = useState(0);
    const addToStock = () => {
        if (count > 0) {
            const payload = {
                user_id,
                product_id,
                quantity: count,
                unit_price: price
            }
            console.log(payload, 'payload from Seller');
            dispatch(addStock(payload))
            dispatch(fetchProducts())
            navigate('/add-product/done')

        }
    }

    const handleInputChange = (e) => {
        setPrice(e.target.value.replace(/[^\d.]/ig, ""))
    }
    return (
        <div className={styles.modalContent}>
            <h4>Sell this Product</h4>
            <div className={styles.cardSeller}>
                <div className={styles.contentCount}>
                    Available units:
                    <button className={styles.incDec} onClick={() => { if (count > 0) { setCount(count - 1) } }}>-</button>
                    <div className={styles.count} >{count}</div>
                    <button className={styles.incDec} onClick={() => { setCount(count + 1) }}>+</button>
                </div>
                <div >Price:
                    <input type="text"
                        className="price"
                        onChange={(e) => handleInputChange(e)}
                        placeholder="Price"
                        pattern="[0-9.]+"
                        value={price}
                    />
                </div>

                <button className={styles.cart} onClick={() => { addToStock() }}>Add to Stock</button>
            </div>
        </div>
    )
}

export default SellProduct