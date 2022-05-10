import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ItemsOrdered from './ItemsOrdered/ItemsOrdered';
import styles from './Panels.module.css'
import { myOrders } from './utils/utilsUser'
import { mySales } from './utils/utilsProvider'
import ItemsOrderedShopping from './ItemsOrdered/ItemsOrderedShopping'
import { useSelector } from 'react-redux';


const ProviderPanel = ({ id, name, email }) => {
    const [info, setInfo] = useState('myAccountInfo')
    const [orders, setOrders] = useState([])
    const [saveOrder, setSaveOrder] = useState([])
    const [sales, setSales] = useState([])
    const [salesSave, setSalesSave] = useState([])
    const [myProducts, setMyProducts] = useState([])
    const allProducts = useSelector(state => state.products.products)

    let sellerProducts = allProducts.filter(product => {
        return product.sellers.some(seller => seller.user_id === id)
    })

    sellerProducts = sellerProducts.map(product => {
        const seller = product.sellers.find(seller => seller.user_id === id)
        return {
            id: product.product_id,
            name: product.name,
            price: seller.stock.unit_price,
            quantity: seller.stock.quantity,
            approved: product.approved,
            category_name: product.category_name,
        }
    })

    console.log(sellerProducts, "sellerProducts");

    const updateInfo = (e) => {
        setInfo(e.target.name);
    }

    useEffect(() => {
        mySales(id, setSales)
    }, [info === 'mySalesInfo']) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setMyProducts(sellerProducts)
    }, [info === 'publishedProducts']) // eslint-disable-line react-hooks/exhaustive-deps

    const getOrders = (e) => {
        setInfo(e.target.name)
        myOrders(id, setOrders)
    }

    return (
        <>
            <div className={styles.pageTitleWrapper}>
                {
                    info === 'myAccountInfo' ? (
                        <h1 className={styles.pageTitle}>My Account</h1>
                    ) : info === 'mySalesInfo' || info === 'itemsOrdered' ? (
                        <h1 className={styles.pageTitle}>My Sales</h1>
                    ) : info === 'publishedProducts' ? (
                        <h1 className={styles.pageTitle}>Published Products</h1>
                    ) : info === 'myShopping' || info === 'itemsOrderedShopping' ? (
                        <h1 className={styles.pageTitle}>My Shopping</h1>

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
                                {info === 'mySalesInfo' ? (
                                    <strong>My Sales</strong>
                                ) : (
                                    <a name='mySalesInfo' onClick={e => updateInfo(e)}>My Sales</a>
                                )}
                            </li>
                            <li>
                                {info === 'myShopping' ? (
                                    <strong>My shopping</strong>
                                ) : (
                                    <a name='myShopping' onClick={getOrders}>My shopping</a>
                                )}
                            </li>
                            <li>
                                {info === 'publishedProducts' ? (
                                    <strong>Published Products</strong>
                                ) : (
                                    <a name='publishedProducts' onClick={e => updateInfo(e)}>Published Products</a>
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
                                            <span>Provider user</span>
                                        </span>
                                        <div className={styles.blockContent}>
                                            <p><Link to='/add-product'>Public a new product</Link></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : info === 'mySalesInfo' ? (
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
                                        {/* START - BLOCK FOR EACH sale /////////////*/}

                                        {sales.length > 0 ? sales.map(sale => (
                                            <tr key={sale.order_id}>
                                                <td>
                                                    <span>Order: </span>
                                                    <a href='#' name='itemsOrdered' onClick={e => { setSalesSave(sale); updateInfo(e) }}>
                                                        {sale.order_id}
                                                    </a>
                                                </td>
                                                <td><span>Date: </span>{sale.input}</td>
                                                <td><span>Bought from: </span>{sale.buyer_name}</td>
                                                <td><span>Order Total: </span><span className={styles.price}>${sale.unit_price * sale.quantity}</span></td>
                                                <td>
                                                    <span>Status: </span><a href='#' onClick={e => { setSalesSave(sale); updateInfo(e) }} name='itemsOrdered' >{sale.type === 'SALE' ? 'pending' : sale.type}</a>

                                                </td>
                                            </tr>
                                        )) : <tr><td><span>Nothing here</span></td></tr>}
                                        {/* END - BLOCK FOR EACH ORDER /////////////*/}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    ) : info === 'myShopping' ? (
                        <div className={styles.info}>
                            <div className={styles.tableWrapper}>
                                <table className={styles.tableOrderItems}>
                                    <thead>
                                        <tr>
                                            <th>Order #</th>
                                            <th>Date</th>
                                            <th>Bought from</th>
                                            <th>Order Total</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* START - BLOCK FOR EACH shopping /////////////*/}
                                        {orders.length > 0 ? orders.map(order => (
                                            <tr key={order.order_id}>
                                                <td>
                                                    <span>Order: </span>
                                                    <a href='#' name='itemsOrderedShopping' onClick={e => { setSaveOrder(order); updateInfo(e) }}>
                                                        {order.order_id}
                                                    </a>
                                                </td>
                                                <td><span>Date: </span>{order.input}</td>
                                                <td><span>Bought from: </span>{order.seller_name}</td>
                                                <td><span>Order Total: </span><span className={styles.price}>${order.unit_price * order.quantity}</span></td>
                                                <td>
                                                    {console.log(order.type, 'map order')}
                                                    <span>Status: </span><a href='#' onClick={e => { setSaveOrder(order); updateInfo(e) }} name='itemsOrderedShopping' >{order.type === 'SALE' ? 'pending' : order.type}</a>
                                                </td>
                                            </tr>
                                        )) : <tr><td><span>Nothing here</span></td></tr>}

                                        {/* END - BLOCK FOR EACH shpping/////////////*/}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    ) : info === 'itemsOrderedShopping' ? (
                        <div className={styles.info}>
                            <ItemsOrderedShopping order={saveOrder} />
                            <div>
                                <a href='#' name='myShopping' onClick={e => updateInfo(e)}>Back to my shopping</a>
                            </div>
                        </div>
                    ) : info === 'itemsOrdered' ? (
                        <div className={styles.info}>
                            <ItemsOrdered order={salesSave} />
                            <div>
                                <a href='#' name='mySalesInfo' onClick={e => updateInfo(e)}>Back to my sales</a>
                            </div>
                        </div>
                    ) : info === 'publishedProducts' ? (
                        <div className={styles.info}>
                            <div className={styles.tableWrapper}>
                                <table className={styles.tableOrderItems}>
                                    <thead>
                                        <tr>
                                            <th>Product Name</th>
                                            <th>Category</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Approved</th>
                                        </tr>
                                        {/* 
                                        return {
            id: product.product_id,
            name: product.name,
            price: seller.stock.unit_price,
            quantity: seller.stock.quantity,
            approved: product.approved,
            category_name: product.category_name,
        }
         */}                            </thead>
                                    <tbody>
                                        {/* START - BLOCK FOR EACH shopping /////////////*/}
                                        {myProducts.length > 0 ? myProducts.map(product => (
                                            <tr key={product.name}>
                                                <td>
                                                    <span>Name </span>
                                                    <Link to={`/product/${product.id}`} >
                                                        {product.name}
                                                    </Link>
                                                </td>
                                                <td><span>Category </span>{product.category_name}</td>
                                                <td><span>Price: </span>${product.price}</td>
                                                <td><span>Quantity </span><span className={styles.price}>{product.quantity}</span></td>
                                                <td>
                                                    {console.log(product.type, 'map order')}
                                                    <span>Status: </span>{product.approved ? 'approved' : "pending"}
                                                </td>
                                            </tr>
                                        )) : <tr><td><span>Nothing here</span></td></tr>}

                                        {/* END - BLOCK FOR EACH shpping/////////////*/}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    ) : null
                }
            </div>
        </>
    );
}

export default ProviderPanel