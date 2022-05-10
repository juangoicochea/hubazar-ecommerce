import React from 'react'
import styles from './CartButtons.module.css'
import useCounter from '../../hooks/UseCounter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faCartArrowDown, faCircleMinus, faCircleXmark, faCirclePlus } from '@fortawesome/free-solid-svg-icons'

const CartButtons = ({ initialCount, value, max, itemsToBuy }) => {
    const [count, increment, decrement, reset] = useCounter(initialCount, value, max)
    const add = () => {
        increment()
        itemsToBuy = count + value > max ? max : count + value
    }
    const remove = () => {
        decrement()
        itemsToBuy = count - value < 0 ? 0 : count - value
    }
    const resetCount = () => {
        reset()
        itemsToBuy = 0
    }
    return (
        <div className={styles.ButtonGroup}>
            <button className={`${styles.Button}, ${styles.ButtonRegular}`} onClick={add} ><FontAwesomeIcon icon={faCirclePlus} /></button>
            <div className={styles.ButtonGroup}>
                <span className={styles.Badge} >{count}</span>
            </div>
            <button className={`${styles.Button}, ${styles.ButtonRegular}`} onClick={remove} ><FontAwesomeIcon icon={faCircleMinus} /></button>
            <button className={`${styles.Button}, ${styles.ButtonReset}`} onClick={resetCount} ><FontAwesomeIcon icon={faCircleXmark} /></button>
        </div >
    )
}

export default CartButtons