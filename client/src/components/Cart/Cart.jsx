import React from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { emptyCart, checkOutCart } from '../../redux'
import CartProduct from './CartProduct'
import { FormatMoney } from 'format-money-js';
import styles from './Cart.module.css'
import { NavLink, useNavigate } from 'react-router-dom'


export const Cart = ({ numberOfItems, totalPrice, discountCoupon, discountAmount, cartItems, emptyCart }) => {
    const dispatch = useDispatch()
    const formatMoney = new FormatMoney({ decimals: 2, symbol: '$', grouping: true })
    const prodPrice = formatMoney.from(parseFloat(totalPrice)) || totalPrice
    const user_id = useSelector(state => state.login.login.id)
    const navigate = useNavigate()
    const listMarkup = cartItems.length > 0 ? (cartItems.map(product => (
        <CartProduct key={product.id} product={product} />
    )))
        : (<div className={styles.addProducts}>
            Add some products to cart
            <span>&nbsp;</span>
            <NavLink to={'/products'}>
                <button className={styles.button}>
                    All products
                </button>
            </NavLink>
        </div>)

    const cleanCartItems = () => {
        emptyCart(user_id)
    }

    const handleChechOut = () => {
        user_id ? dispatch(checkOutCart(user_id)) : navigate('/need-authenticated')
    }

    return (
        <div className={styles.container}>
            <div className={styles.titlePage}>
                {
                    numberOfItems === 0 ? <span>Shopping Cart empty</span> :
                        numberOfItems >= 1 ? <span>Shopping Cart ({numberOfItems} items)</span> : <span>Carrito de Compras ({numberOfItems} item)</span>
                }
            </div>
            {
                totalPrice > 0 ?
                    <div className={styles.summary}>
                        <div className={styles.titleSummary}>
                            Summary
                            <br /><br />
                            Order Total: <span>{prodPrice}</span>
                        </div>
                        <button onClick={handleChechOut} className={`${styles.buttonSuccess}`}>Proceed to Checkout</button>
                        <button className={`${styles.buttonSecondary} ${styles.continue}`} onClick={cleanCartItems}>Empty Cart !</button>
                        <button className={`${styles.buttonSuccess} ${styles.continue}`} onClick={() => { navigate('/products') }}>Continue Shopping</button>
                    </div>
                    : null
            }
            <div className={styles.productList}>
                {listMarkup}
            </div>
        </div>

    )
}

const mapStateToProps = state => {
    return {
        cartItems: state.cart.cartItems,
        numberOfItems: state.cart.numberOfItems,
        totalPrice: state.cart.totalPrice,
        discountCoupon: state.cart.discountCoupon,
        discountAmount: state.cart.discountAmount,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        emptyCart: (userId) => dispatch(emptyCart(userId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)