import React from 'react'
import useCounter from '../../hooks/UseCounter';
import { useDispatch, useSelector } from 'react-redux'
import { updateCartItem, removeFromCart } from '../../redux'
import { FormatMoney } from 'format-money-js';
import styles from './Cart.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleMinus, faCircleXmark, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

function CartProduct({ product }) {
    const {
        product_id, name,
        stock, price,
        image, itemsToBuy, seller_id, seller_name,
    } = product

    const user_id = useSelector(state => state.login.login.id)
    let inventoryQty = 'no';
    if (stock) {
        inventoryQty = stock
    }

    const formatMoney = new FormatMoney({ decimals: 2, symbol: '$', grouping: true })
    const prodPrice = formatMoney.from(parseFloat(price)) || price

    let newCount = itemsToBuy
    const dispatch = useDispatch()
    const updateCart = () => {
        const payload = {
            product_id,
            price,
            itemsToBuy: newCount,
            seller_id
        }
        dispatch(updateCartItem(payload))
    }
    const removeCartItem = () => {
        const payload = {
            product_id, seller_id
        }
        dispatch(removeFromCart(payload, user_id))
    }

    const Buttons = ({ initialCount, value, max }) => {
        const [count, increment, decrement, reset] = useCounter(initialCount, value, max)
        const add = () => {
            increment()
            newCount = count + value > max ? max : count + value
        }
        const remove = () => {
            decrement()
            newCount = count - value < 0 ? 0 : count - value
        }
        const resetCount = () => {
            reset()
            newCount = 0
        }
        return (
            <div className={styles.buttonGroup}>
                <div className={styles.buttonsStock}>
                    <button className={`${styles.buttonRemove}`} onClick={remove} ><FontAwesomeIcon icon={faCircleMinus} /></button>
                    <span className={styles.badge} >{count}</span>
                    <button className={`${styles.buttonAdd}`} onClick={add} ><FontAwesomeIcon icon={faCirclePlus} /></button>
                </div >
                <button className={`${styles.buttonReset}`} onClick={removeCartItem} ><FontAwesomeIcon icon={faCircleXmark} /></button>
            </div >
        )
    }

    return (
        <div className={styles.cardItem} key={product_id}>
            <div className={styles.insideContainer}>
                <div className={styles.cardHeader}>
                    <Link className={styles.link} to={`/product/${product_id}`}>

                        <img src={image} alt={product_id} className={styles.img} />
                    </Link>
                </div>
                <Link className={styles.link} to={`/product/${product_id}`}>
                    <div className={styles.cardName}>{name}</div> from ({seller_name})
                </Link>
            </div>
            <div className={styles.cardFooter}>
                <div className={styles.cardFooter}>
                    <div className={styles.priceContainer}>
                        <span className={styles.price}>{prodPrice}</span>
                        <span className={styles.available}>({inventoryQty} available)</span>
                    </div>
                    <Buttons initialCount={itemsToBuy} value={1} max={inventoryQty} />
                    <button className={`${styles.buttonSuccess}`} onClick={updateCart}>Update cart</button>
                </div>
            </div>
        </div>
    )
}
export default CartProduct
