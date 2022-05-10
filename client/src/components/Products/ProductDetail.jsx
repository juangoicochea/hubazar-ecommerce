import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchProductById } from '../../redux/Products/productActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faCircleMinus, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { faStar as starReg } from '@fortawesome/free-regular-svg-icons'
import styles from './productDetail.module.css'
import ProductCarrousel from '../Carrousel/ProductCarrousel'
import usePaginate from '../../hooks/usePaginate'
import { addToCart, addToWL, removeFromWL, removeFromCart } from '../../redux'
import ModalOptions from './ModalOptions'
import SellProduct from './SellProduct'
import { FormatMoney } from 'format-money-js';
import * as Shareon from "shareon";
import "shareon/css";
import useCounter from '../../hooks/UseCounter';

const ProductDetail = () => {
    let {
        product_id,
        name,
        rating,
        images,
        stock,
        featured_seller,
        category_name,
        description,
    } = useSelector(state => state.products.foundProducts)
    const dispatch = useDispatch();
    const { id } = useParams()
    const related = useSelector(state => state.products.products).filter(e => { return e.category_name === category_name })
    const loading = useSelector(state => state.products.loading)
    const error = useSelector(state => state.products.error)
    const isProvider = useSelector(state => state.login.login.isProvider)

    const favoriteProducts = useSelector(state => state.wishList.wishListItems)
    const { prevPage, nextPage, items } = usePaginate(related, 5)
    const [render, setRender] = useState(false)
    const [modalOptions, setModalOptions] = useState(false)
    const [sellerOptions, setSellerOptions] = useState(false)
    const user_id = useSelector(state => state.login.login.id)

    useEffect(() => {
        dispatch(fetchProductById(id))
    }, [render])



    useEffect(() => {
        Shareon.init()
    });

    const image = images || 'https://via.placeholder.com/150'
    const price = featured_seller?.stock?.unit_price;
    const fsStock = featured_seller?.stock?.quantity;
    const seller_id = featured_seller?.user_id
    const seller_name = featured_seller?.name
    const formatMoney = new FormatMoney({ decimals: 2, symbol: '$', grouping: true })
    const prodPrice = formatMoney.from(parseFloat(price)) || price
    const [count, add, remove, reset] = useCounter(0, 1, fsStock)


    useEffect(() => {
        reset()
        setCounter(0)
    }, [id])


    if (rating) {
        var star = Math.floor(rating)
    }

    const onClick = () => {
        setRender(!render)
    }

    const [counter, setCounter] = useState(0)
    const increment = () => {
        add()
        setCounter(count + 1 > fsStock ? fsStock : count + 1)
    }
    const decrement = () => {
        remove()
        setCounter(count - 1 < 0 ? 0 : count - 1)
    }

    const addCart = () => {
        if (counter !== 0) {
            const payload = {
                product_id, name,
                stock: fsStock, price,
                image, rating,
                seller_id, seller_name,
                itemsToBuy: counter
            }

            dispatch(addToCart(payload, user_id))
        } else {
            dispatch(removeFromCart({ product_id }))
        }
    }

    const addWL = () => {
        const payload = {
            product_id, name,
            stock: fsStock, price,
            image, rating, seller_id
        }
        dispatch(addToWL(payload, user_id))
    }
    const removeWL = () => {
        const payload = {
            product_id, name,
            stock: fsStock, price,
            image, rating, seller_id
        }
        dispatch(removeFromWL(payload, user_id))
    }

    const isFavorite = (id) => {
        const isFav = favoriteProducts && favoriteProducts.find(item => item.product_id === id)
        return isFav ? (<button className={styles.buttons} onClick={removeWL}>Delete From wishlist</button>)
            : (<button className={styles.buttons} onClick={addWL}>Add to wishlist</button>
            )
    }

    const sampleText = 'The seller did not include a product description.'

    return loading ? (
        <div className='App-container'>
            <div className="loader"></div>
        </div>
    ) : error ? (
        <div>{error}</div>
    ) :
        (
            <>
                <div className={styles.categoryContainer} >
                    <div className={styles.category} >Category - {category_name}</div>
                </div>
                <div className={styles.container}>
                    {
                        name &&
                        <div className={styles.content}>
                            <div className={styles.contentHeader}>
                                <div className={styles.contentHeaderLeft}>
                                    <div className={styles.title}>{name}</div>
                                    {
                                        rating &&
                                        <div className={styles.rate}>
                                            {
                                                [...Array(star)].map((e, index) => {
                                                    return <FontAwesomeIcon key={index} icon={faStar} />
                                                })
                                            }
                                            {
                                                [...Array(5 - star)].map((e, index) => {
                                                    return <FontAwesomeIcon key={index.toString() + 'b'} icon={starReg} />
                                                })
                                            }
                                        </div>
                                    }
                                </div>
                                <div className={styles.contentHeaderRight}>
                                    <div className="shareon">
                                        <a className="facebook"></a>
                                        <a className="twitter"></a>
                                        <a className="whatsapp"></a>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.detail}>
                                {
                                    <img className={styles.img} src={images[0]} alt='' />
                                }
                                <div className={styles.contentPSD}>
                                    <div className={styles.price}>{prodPrice}</div>
                                    <div className={styles.stock}>{fsStock} available (from {seller_name})</div>
                                    <div className={styles.description}>{description ? description : sampleText}</div>
                                </div>
                                <div className={styles.add}>
                                    <div className={styles.box}>
                                        <button className={styles.decrement} onClick={decrement}><FontAwesomeIcon icon={faCircleMinus} /></button>
                                        <div className={styles.counter}>{count}</div>
                                        <button className={styles.increment} onClick={increment}><FontAwesomeIcon icon={faCirclePlus} /></button>
                                    </div>
                                    <button className={styles.buttons} onClick={addCart}>Add to cart</button>

                                    {isFavorite(product_id)}
                                    <button className={styles.buttonOptions} onClick={(e) => { setModalOptions(true) }}>{stock - fsStock} more options</button>
                                    {isProvider === "true" && <button className={styles.buttonOptions} onClick={(e) => { setSellerOptions(!sellerOptions) }}>Sell This Product</button>}
                                    <div className="sell"><form action=""></form></div>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        sellerOptions &&
                        <div className={styles.relatedTitle}>
                            <SellProduct
                                setSellerOptions={setSellerOptions}
                                product_id={product_id}
                                name={name}
                                image={images}
                                rating={rating}
                            />
                        </div>
                    }
                    <div className={styles.relatedTitle}>

                        <span>Related Products</span>
                    </div>
                    <div className={styles.related}>
                        <div className={styles.carrousel} onClick={onClick}>
                            {
                                items ? items.map((e, i) => (
                                    <ProductCarrousel key={e.name + 'asd' + i} id={e.product_id} image={e.images} name={e.name} rating={e.rating} price={e.price} />
                                ))
                                    : <span>loading...</span>
                            }
                        </div>
                    </div>
                    {
                        modalOptions &&
                        <ModalOptions
                            modalOptions={setModalOptions}
                            product_id={product_id}
                            name={name}
                            image={images}
                            rating={rating}
                        />
                    }
                </div>
            </>
        )
}

export default ProductDetail