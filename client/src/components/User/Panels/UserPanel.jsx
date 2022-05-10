import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Panels.module.css'
import ItemsOrdered from './ItemsOrdered/ItemsOrdered';
import ModalLoginFailure from '../../Modal/ModalLoginFailure'
import { wantSell, myOrders, returnOrders } from './utils/utilsUser'

const UserPanel = ({ name, email, user_id }) => {
    const [info, setInfo] = useState('myAccountInfo')
    const providerInfo = useSelector(state => state.login.login.isProvider)
    const [wantSellError, setWantSellError] = useState(true)
    const [orders, setOrders] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        info === 'myOrdersInfo' && myOrders(user_id, setOrders)
    }, [info])

    console.log(orders, 'orders--')
    const updateInfo = (e) => {
        setInfo(e.target.name);
    }



    return (
        <>
            <div className={styles.pageTitleWrapper}>
                {
                    info === 'myAccountInfo' ? (
                        <h1 className={styles.pageTitle}>My Account</h1>
                    ) : info === 'myOrdersInfo' || info === 'itemsOrdered' ? (
                        <h1 className={styles.pageTitle}>My Orders</h1>
                    ) : info === 'myWishList' ? (
                        <h1 className={styles.pageTitle}>My Wish List</h1>
                    ) : null
                }
            </div>
            <div className={styles.container}>

                <div className={styles.menu}>
                    <div className={styles.menuWrapper}>
                        <ul>
                            <li>
                                {info === 'myAccountInfo' ? (
                                    <strong>My Account</strong>
                                ) : (
                                    <a name='myAccountInfo' onClick={e => updateInfo(e)}>My Account</a>
                                )}
                            </li>
                            <li>
                                {info === 'myOrdersInfo' ? (
                                    <strong>My Orders</strong>
                                ) : (
                                    <a name='myOrdersInfo' onClick={e => updateInfo(e)}>My Orders</a>
                                )}
                            </li>
                            <li>
                                {info === 'myWishList' ? (
                                    <strong>My Wish List</strong>
                                ) : (
                                    //<a name='myWishList' onClick={e => updateInfo(e)}>My Wish List</a>
                                    <a name='myWishList' onClick={() => navigate('/wishlist')}>My Wish List</a>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
                {
                    info === 'myAccountInfo' ? (
                        <div className={styles.info}>
                            <div className={styles.blockDashboardInfo}>
                                <div className={styles.blockTitle}>
                                    Account Information
                                </div>
                                <div className={styles.blockContent}>
                                    <div className={styles.boxInformation}>
                                        <span className={styles.boxTitle}>
                                            <span>Contact Information</span>
                                        </span>
                                        <div className={styles.blockContent}>
                                            <p>{name}<br /> {email}<br /></p>
                                        </div>
                                    </div>
                                    <div className={styles.boxUserType}>
                                        <span className={styles.boxTitle}>
                                            <span>Buyer user</span>
                                        </span>
                                        <div className={styles.blockContent}>
                                            {
                                                providerInfo === 'requested' ?
                                                    <p>request provider under evaluation</p>
                                                    : <>
                                                        <a href='#' onClick={() => wantSell(user_id, setWantSellError)}>Do you want to Sell?</a>
                                                        {!wantSellError && <ModalLoginFailure msgError={'request sent :D'} />}
                                                    </>
                                            }
                                            {
                                                providerInfo === 'rejected' &&
                                                <p>your request has been declined </p>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : info === 'myOrdersInfo' ? (
                        <div className={styles.info}>
                            <div className={styles.tableWrapper}>
                                <table className={styles.tableOrderItems}>
                                    <thead>
                                        <tr>
                                            <th>Order #</th>
                                            <th>Date</th>
                                            <th>Ship To</th>
                                            <th>Order Total</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* START - BLOCK FOR EACH ORDER /////////////*/}
                                        {returnOrders(orders)}
                                        {/* <tr>
                                            <td>
                                                <span>Order: </span>
                                                <a href='#' name='itemsOrdered' onClick={e => updateInfo(e)}>
                                                    11000000071
                                                </a>
                                            </td>
                                            <td><span>Date: </span>4/19/22</td>
                                            <td><span>Ship To: </span>Jon Doe</td>
                                            <td><span>Order Total: </span><span className={styles.price}>$550.00</span></td>
                                            <td>
                                                <span>Status: </span><a href='#' name='itemsOrdered' onClick={e => updateInfo(e)}>Pending</a>
                                            </td>
                                        </tr> */}
                                        {/* END - BLOCK FOR EACH ORDER /////////////*/}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : info === 'itemsOrdered' ? (
                        <div className={styles.info}>
                            <ItemsOrdered />
                            <div>
                                <a href='#' name='myOrdersInfo' onClick={e => updateInfo(e)}>Back to My Orders</a>
                            </div>
                        </div>
                    ) : info === 'myWishList' ? (
                        <div className={styles.info}>
                            My wish list info
                        </div>
                    ) : null
                }
            </div>
        </>
    );
}

export default UserPanel