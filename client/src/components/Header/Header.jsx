import SearchBar from '../SearchBar/SearchBar'
import hubazarLogo from '../../assets/hubazar.png'
import styles from '../Header/Header.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons'
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
import { connect, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { fetchProducts, getCartItems } from '../../redux'
import { mainPage } from '../../env'

const Header = ({ getCartItems, numberOfCartItems, numberOfProducts, numberOfWishListItems }) => {
    const user = useSelector(state => state.login.login.name)

    useEffect(() => {
        if (numberOfProducts === 0) {
            fetchProducts()
        }
        getCartItems()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const onLogOut = () => {
        window.localStorage.removeItem('token')
        window.location.href = mainPage
    }

    return (
        <>
            <div className={styles.loginUserMobile}>
                {
                    user ? (<div className={styles.logoutContainer}> Hola <Link to={'/panels'}>{user}</Link> <input className={styles.btnLogout} type='submit' onClick={() => onLogOut()} value='Logout' /></div>) :
                        <div className={styles.login}>
                            <Link to='login' className={styles.loginLink}>Login in</Link> - <Link to='register' className={styles.registerLink}>Register</Link>
                        </div>
                }
                <div className={styles.icons}>
                    <div className={styles.cart}>
                        <Link to='/wishlist'>
                            <FontAwesomeIcon className={styles.icon} icon={faHeart} size="2x" />
                            {numberOfWishListItems > 0 && <span className={styles.cartItems}>{numberOfWishListItems}</span>}
                        </Link>
                    </div>
                    <div className={styles.cart}>
                        <Link to='/cart'>
                            <FontAwesomeIcon className={styles.icon} icon={faCartArrowDown} size="2x" />
                            {numberOfCartItems > 0 && <span className={styles.cartItems}>{numberOfCartItems}</span>}
                        </Link>
                    </div>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.logoContainer}>
                    <Link to='/'>
                        <img className={styles.logo} src={hubazarLogo} alt='Hubazar Logo' />
                    </Link>
                </div>
                <div className={styles.searchBar}>
                    <SearchBar />
                </div>
                <div className={styles.iconsContainer}>
                    <div className={styles.icons}>
                        <div className={styles.cart}>
                            <Link to='/wishlist'>
                                <FontAwesomeIcon className={styles.icon} icon={faHeart} size="2x" />
                                {numberOfWishListItems > 0 && <span className={styles.cartItems}>{numberOfWishListItems}</span>}
                            </Link>
                        </div>
                        <div className={styles.cart}>
                            <Link to='/cart'>
                                <FontAwesomeIcon className={styles.icon} icon={faCartArrowDown} size="2x" />
                                {numberOfCartItems > 0 && <span className={styles.cartItems}>{numberOfCartItems}</span>}
                            </Link>
                        </div>
                        {
                            user ? (<div></div>) : (
                                <FontAwesomeIcon className={styles.icon} icon={faUser} size="2x" />
                            )
                        }
                    </div>
                    {
                        user ? (<div className={styles.logoutContainer}> Hola <Link to={'/panels'}>{user}</Link> <input className={styles.btnLogout} type='submit' onClick={() => onLogOut()} value='Logout' /></div>) :
                            <div className={styles.login}>
                                <Link to='login' className={styles.loginLink}>Login in</Link>
                                <Link to='register' className={styles.registerLink}>Register</Link>
                            </div>
                    }
                </div>
            </div>
        </>
    )
}

//export default Header

const mapStateToProps = state => ({
    numberOfCartItems: state.cart.numberOfItems,
    numberOfWishListItems: state.wishList.numberOfItems,
    numberOfProducts: state.products.numberOfProducts,
    productLoading: state.products.loading,
    productError: state.products.error,
})

const mapDispatchToProps = dispatch => ({
    fetchProducts: () => dispatch(fetchProducts()),
    getCartItems: (userId) => dispatch(getCartItems(userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)