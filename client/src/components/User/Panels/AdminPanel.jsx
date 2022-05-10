import React, { useEffect, useState } from 'react';
import ItemsOrdered from './ItemsOrdered/ItemsOrdered';
import styles from './Panels.module.css'
import { backendUrl } from '../../../env'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useSelector } from 'react-redux'
import {
    setActive,
    setInactive,
    resetPass,
    isAdmin,
    sellerStatus,
    filterPro,
    sortPro,
    isSelected,
    fetchOrders
} from './utils/utilsAdmin';

const AdminPanel = ({ name, email, id }) => {
    const navigate = useNavigate()
    const [info, setInfo] = useState('myAccountInfo')   //change panels
    const [users, setUsers] = useState(null)            //initial state users
    const [filter, setFilter] = useState([])            //users to map
    const [orders, setOrders] = useState([])

    console.log(users, 'users-------')
    //--------------------------------------------------------------------------
    const products = useSelector(state => state.products.products) //all products
    const [filterProducts, setFilterProducts] = useState(products)
    //--------------------------------------------------------------------------
    //-----set users & filter initial state---- super_user = user_id:1
    useEffect(() => {
        if (info === 'createdOrders') {
            setOrders(fetchOrders())
        }
        if (info === 'publishedProducts') {
            setFilterProducts(products)
        }
        if (info === 'users') {
            axios(backendUrl + 'dashboard')
                .then(response => {
                    setUsers(response.data.filter(e => e.user_id !== 1 && e.user_id !== id))
                    setFilter(response.data.filter(e => e.user_id !== 1 && e.user_id !== id))
                })
                .catch((e) => { return console.error })
        }
    }, [info])
    //------------Ban____Unban users---onChange select
    const onActive = (event, user_id) => {
        const { value } = event.target;
        value === 'Active' ? setActive(user_id) : setInactive(user_id)
    }
    //------------filters users----------------------------
    const onFilter = ({ target }) => {
        const value = target.value.toLowerCase();
        users.length > 0 && (value === 'admin') ? setFilter(users.filter(e => e[value])) : value === 'provider' ? setFilter(users.filter(e => e[value] === 'true')) : setFilter(users)
    }
    //------------ search a user
    const [input, setInput] = useState('')
    const onSearch = (event) => {
        event.preventDefault();
        setInput(event.target.value.toLowerCase())
        input === '' ? setFilter(users) : setFilter(users.filter(e => e.name.toLowerCase().includes(input) || e.email === input))
    }

    return (
        <>
            <div className={styles.pageTitleWrapper}>
                {
                    info === 'myAccountInfo' ? (
                        <h1 className={styles.pageTitle}>My Account</h1>
                    ) : info === 'publishedProducts' ? (
                        <h1 className={styles.pageTitle}>Published Products</h1>
                    ) : info === 'createdOrders' || info === 'itemsOrdered' ? (
                        <h1 className={styles.pageTitle}>Created Orders</h1>
                    ) : info === 'users' ? (
                        <h1 className={styles.pageTitle}>Users</h1>
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
                                    <a name='myAccountInfo' onClick={e => setInfo(e.target.name)}>My Account</a>
                                )}
                            </li>
                            <li>
                                {info === 'publishedProducts' ? (
                                    <strong>Published Products</strong>
                                ) : (
                                    <a name='publishedProducts' onClick={e => setInfo(e.target.name)}>Published Products</a>
                                )}
                            </li>
                            <li>
                                {info === 'createdOrders' ? (
                                    <strong>Created Orders</strong>
                                ) : (
                                    <a name='createdOrders' onClick={e => setInfo(e.target.name)}>Created Orders</a>
                                )}
                            </li>
                            <li>
                                {info === 'addCategory' ? (
                                    <strong>Create category</strong>
                                ) : (
                                    <a name='addCategory' onClick={(e) => navigate('/admin/add-category')}>Create category</a>
                                )}
                            </li>
                            <li>
                                {info === 'users' ? (
                                    <strong>Users</strong>
                                ) : (
                                    <a name='users' onClick={e => setInfo(e.target.name)}>Users</a>
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
                                            <span>Admin user</span>
                                        </span>
                                        <div className={styles.blockContent}>
                                            <p><a href='#'></a>welcome super admin</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : info === 'publishedProducts' ? (
                        <div className={styles.info}>
                            <div className={styles.tableWrapper}>
                                <form>
                                    <div className={styles.filters}>
                                        <select onChange={(e) => sortPro(e, filterProducts, setFilterProducts)}>
                                            <option>Sort by</option>
                                            <option>Name</option>
                                            <option>Date</option>
                                        </select>
                                    </div>
                                    <div className={styles.filters}>
                                        Filter by status: &nbsp;
                                        <select onChange={(e) => filterPro(e, products, setFilterProducts)}>
                                            <option>All</option>
                                            <option>Published</option>
                                            <option>Waiting approve</option>
                                        </select>
                                    </div>
                                    <table className={styles.tableOrderItems}>
                                        <thead>
                                            <tr>
                                                <th>Product Title</th>
                                                <th>Date Created</th>
                                                <th>&nbsp;</th>
                                                <th>Price</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* START - BLOCK FOR EACH PRODUCT /////////////*/}
                                            {
                                                filterProducts.length > 0 ? (
                                                    filterProducts.map(e => (
                                                        <tr key={e.product_id}>
                                                            <td>
                                                                <span>Product Title: </span>
                                                                <Link to={'/product/' + e.product_id}>
                                                                    {e.name}
                                                                </Link>
                                                            </td>
                                                            <td><span>Date: </span>{e.added.slice(0, 10)}</td>
                                                            <td><span>&nbsp;</span>&nbsp;</td>
                                                            <td><span>Price: </span><span className={styles.price}>${e.featured_seller.stock.unit_price}</span></td>
                                                            <td>
                                                                <span>Status: </span>
                                                                {isSelected(e, e.product_id)}
                                                            </td>
                                                        </tr>
                                                    ))
                                                )
                                                    :
                                                    <tr><td><p>no matches</p></td></tr>
                                            }
                                            {/* END - BLOCK FOR EACH PRODUCT /////////////*/}
                                        </tbody>
                                    </table>
                                </form>
                            </div>
                        </div>
                    ) : info === 'createdOrders' ? (
                        <div className={styles.info}>
                            <form>
                                <div className={styles.filters}>
                                    Filter by status: &nbsp;
                                    <select>
                                        <option>Created</option>
                                        <option>Processing</option>
                                        <option>Cancelled</option>
                                        <option>Completed</option>
                                    </select>
                                </div>
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
                                            <tr>
                                                <td>
                                                    <span>Order: </span>
                                                    <a href='#' name='itemsOrdered' onClick={e => setInfo(e.target.name)}>
                                                        11000000071
                                                    </a>
                                                </td>
                                                <td><span>Date: </span>4/19/22</td>
                                                <td><span>Ship To: </span>Jon Doe</td>
                                                <td><span>Order Total: </span><span className={styles.price}>$550.00</span></td>
                                                <td>
                                                    <span>Status: </span>
                                                    <a href='#' name='itemsOrdered' onClick={e => setInfo(e.target.name)}>Processing</a>
                                                </td>
                                            </tr>
                                            {/* END - BLOCK FOR EACH ORDER /////////////*/}
                                        </tbody>
                                    </table>
                                </div>
                            </form>
                        </div>
                    ) : info === 'itemsOrdered' ? (
                        <div className={styles.info}>
                            <ItemsOrdered />
                            <div>
                                <a href='#' name='createdOrders' onClick={e => setInfo(e.target.name)}>Back to Created Orders</a>
                            </div>
                        </div>
                    ) : info === 'users' ? (
                        <div className={styles.info}>
                            <form>
                                <div className={styles.filters}>
                                    Search user by name/email: &nbsp;
                                    <input
                                        onChange={onSearch}
                                        onKeyUp={onSearch}
                                        onBlur={onSearch}
                                        type='text'
                                        placeholder='Name/email'
                                        value={input}
                                    />
                                    <div className={styles.br}><br /><br /></div>
                                    Filter by type: &nbsp;
                                    <select onChange={onFilter}>
                                        <option>User</option>
                                        <option>Provider</option>
                                        <option>Admin</option>
                                    </select>
                                </div>
                                <div className={styles.tableWrapper}>
                                    <table className={styles.tableOrderItems}>
                                        <thead>
                                            <tr>
                                                <th>Username</th>
                                                <th>Status</th>
                                                <th>Admin?</th>
                                                <th>Provider?</th>
                                                <th>Reset Password</th>
                                                <th>Email</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* START - BLOCK FOR EACH USER /////////////*/}
                                            {filter.length > 0 ? (filter.map(e => (
                                                <tr key={e.user_id}>
                                                    <td><span>Username: </span>{e.name}</td>
                                                    <td><span>Status: </span>
                                                        {
                                                            e.active ?
                                                                <select onChange={(event) => onActive(event, e.user_id)}>
                                                                    <option>Active</option>
                                                                    <option >Inactive</option>
                                                                </select>
                                                                :
                                                                <select onChange={(event) => onActive(event, e.user_id)}>
                                                                    <option>Inactive</option>
                                                                    <option>Active</option>
                                                                </select>
                                                        }
                                                    </td>
                                                    <td><span>Admin?: </span>
                                                        {
                                                            e.admin === true ?
                                                                <input onChange={() => isAdmin(e.user_id)} type='checkbox' value={e.admin} checked />
                                                                :
                                                                <input onChange={() => isAdmin(e.user_id)} type='checkbox' value={e.admin} />
                                                        }
                                                    </td>
                                                    <td><span>Provider?: </span>
                                                        {
                                                            sellerStatus(e.user_id, e.provider)
                                                        }
                                                    </td>
                                                    <td><span>Reset Password: </span><button onClick={() => resetPass(e.email)}>Reset</button></td>
                                                    <td>
                                                        <span>Status: </span>
                                                        <a>{e.email}</a>
                                                    </td>
                                                </tr>
                                            )))
                                                :
                                                <tr><td><span>no match</span></td></tr>
                                            }
                                            {/* END - BLOCK FOR EACH USER /////////////*/}
                                        </tbody>
                                    </table>
                                </div>
                            </form>
                        </div>
                    ) : null
                }
            </div>
        </>
    );
}

export default AdminPanel