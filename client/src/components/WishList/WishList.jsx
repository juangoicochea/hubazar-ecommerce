import React from 'react'
import { connect } from 'react-redux'
import { addToCart } from '../../redux'
import WishListProduct from './WlProduct'
import styles from './WishList.module.css'
import { NavLink, useNavigate } from 'react-router-dom'

export const Wishlist = ({ numberOfWishListItems, wishListItems }) => {
    //const [cart, setCart] = useLocalStorage('cart', '');
    const navigate = useNavigate()

    const listMarkup = wishListItems.length > 0 ? (wishListItems.map(product => (
        <WishListProduct key={product.id} product={product} />
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

    return (
        <div className={styles.container}>
            <div className={styles.titlePage}>
                {
                    numberOfWishListItems === 0 ? <span>Wish List is empty</span> :
                        numberOfWishListItems >= 1 ? <span>Wish List ({numberOfWishListItems} items)</span> : <span>Wish List ({numberOfWishListItems} item)</span>
                }
            </div>

            <div className={styles.productList}>
                {listMarkup}
                {
                    listMarkup.length > 0 ? <button className={`${styles.buttonSuccess} ${styles.continue}`} onClick={() => { navigate('/products') }}>Continue Shopping</button>
                        :
                        <div></div>
                }
            </div>
        </div>

    )
}

const mapStateToProps = state => {
    return {
        numberOfWishListItems: state.wishList.numberOfItems,
        wishListItems: state.wishList.wishListItems,
        isLoading: state.wishList.isLoading,
        error: state.wishList.error,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addToCart: (number) => dispatch(addToCart(number))
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Wishlist)