import React from 'react'
import styles from './Product.module.css'
import useCounter from '../../hooks/UseCounter';
import { connect } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, addToWL, removeFromWL } from '../../redux'
import { FormatMoney } from 'format-money-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faStar as starReg } from '@fortawesome/free-regular-svg-icons'
import { faCircleMinus, faCircleXmark, faCirclePlus, faStar, faHeart as heartFilled } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const ProductCard = ({ product, favoriteProducts }) => {

    const { product_id,
        name,
        rating,
        images, featured_seller, stock,
    } = product;

    const user_id = useSelector(state => state.login.login.id)
    const star = Math.floor(rating)
    const price = featured_seller?.stock?.unit_price;
    const seller_id = featured_seller?.user_id
    const seller_name = featured_seller?.name
    const formatMoney = new FormatMoney({ decimals: 2, symbol: '$', grouping: true })
    const prodPrice = formatMoney.from(parseFloat(price)) || price
    const image = images?.[0] || 'https://via.placeholder.com/150'
    const dispatch = useDispatch()
    let itemsToBuy = 0

    const addCart = () => {
        const payload = {
            product_id, name,
            stock, price,
            image, rating,
            itemsToBuy, seller_id,
            seller_name
        }
        console.log(payload, "<--- payload to cart")
        dispatch(addToCart(payload, user_id))
    }

    const addWL = () => {
        const payload = {
            product_id, name,
            stock, price,
            image, rating, seller_id
        }
        dispatch(addToWL(payload, user_id))
    }

    const removeWL = () => {
        const payload = {
            product_id, name,
            stock, price,
            image, rating, seller_id
        }
        dispatch(removeFromWL(payload, user_id))
    }

    const isFavorite = (id) => {
        const isFav = favoriteProducts && favoriteProducts.find(item => item.product_id === id)
        return isFav ? (<FontAwesomeIcon className={styles.iconHearthFilled} icon={heartFilled} onClick={removeWL} />)
            : (<FontAwesomeIcon className={styles.iconHearthFilled} icon={faHeart} onClick={addWL} />)
    }

    const Buttons = ({ initialCount, value, max }) => {
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
            <div className={styles.buttonGroup}>
                <div className={styles.buttonsStock}>
                    <button className={`${styles.buttonRemove}`} onClick={remove} ><FontAwesomeIcon icon={faCircleMinus} /></button>
                    <span className={styles.badge} >{count}</span>
                    <button className={`${styles.buttonAdd}`} onClick={add} ><FontAwesomeIcon icon={faCirclePlus} /></button>
                </div >
                <button className={`${styles.buttonReset}`} onClick={resetCount} ><FontAwesomeIcon icon={faCircleXmark} /></button>
            </div >
        )
    }

    return (
        <div className={styles.cardItem}>
            <div className={styles.cardHeader}>
                <Link to={`/product/${product_id}`}>
                    <img src={image} alt={name} className={styles.img} />
                </Link>
            </div>
            <div className={styles.cardBody}>

                <div className={styles.title}>
                    <Link to={`/product/${product_id}`}>{name.length > 40 ? (name.substring(0, 40) + "...") : name}</Link>
                </div>

                <div className={styles.rate}>
                    {
                        [...Array(star)].map((e, index) => {
                            return <FontAwesomeIcon className={styles.stars} key={index} icon={faStar} />
                        })
                    }
                    {
                        [...Array(5 - star)].map((e, index) => {
                            return <FontAwesomeIcon className={styles.stars} key={index.toString() + 'b'} icon={starReg} />
                        })
                    }
                </div>
                {isFavorite(product_id)}
                <div className={styles.priceContainer}>
                    <span className={styles.price}>{prodPrice}</span>
                    <span className={styles.available}>({stock} available)</span></div>
            </div>
            <div className={styles.cardFooter}>
                <div>
                    <Buttons initialCount={0} value={1} max={stock} />
                    <button className={`${styles.buttonSuccess}`} onClick={addCart}>Add to cart</button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    favoriteProducts: state.wishList.wishListItems,
})

export default connect(mapStateToProps)(ProductCard)

