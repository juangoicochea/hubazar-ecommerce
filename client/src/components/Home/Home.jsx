import React, { useState, useEffect } from 'react'
import Slider from '../Slider/Slider'
import styles from '../Home/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRocket, faRotate } from '@fortawesome/free-solid-svg-icons'
import { faCreditCard } from '@fortawesome/free-regular-svg-icons'
import ProductCarrousel from '../Carrousel/ProductCarrousel'
import { useSelector, useDispatch } from 'react-redux'



const Home = () => {
    //featured products
    const products = useSelector(state => state.products.products)
    const ftProducts = products.sort((a, b) => {
        if (a.rating < b.rating) {
            return 1;
        }
        if (a.rating > b.rating) {
            return -1;
        }
        return 0;
    });
    //state paginate ft products
    const [ftPagined, setFtPagined] = useState(0);

    let rFtProducts = ftProducts.slice(ftPagined, ftPagined + 3);

    const nextFtPagined = () => {
        setFtPagined(ftPagined === 9 ? 0 : ftPagined + 3)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            nextFtPagined()
        }, 8000);
        return () => {
            clearTimeout(timer);
        }
    })

    //latest products - most saled
    const ltProducts = products.sort((a, b) => {
        if (a.added < b.added) {
            return 1;
        }
        if (a.added > b.added) {
            return -1;
        }
        return 0;
    });
    //state paginate lt products
    const [ltPagined, setLtPagined] = useState(0)
    let rLtProducts = ltProducts.slice(ltPagined, ltPagined + 3)

    const nextLtPagined = () => {
        setLtPagined(ltPagined === 9 ? 0 : ltPagined + 3)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            nextLtPagined()
        }, 8000);
        return () => {
            clearTimeout(timer);
        }
    })

    return (
        <div className={styles.background}>
            <div className={styles.sliderMain}>
                <Slider />
            </div>
            <div className={styles.iconsContainer}>
                <div className={styles.iconText}>
                    <FontAwesomeIcon className={styles.icon} icon={faRocket} size="3x" />
                    <div>
                        <span>Fast Delivery</span>
                        <br />
                        <span className={styles.textGrey}>In all our products</span>
                    </div>
                </div>
                <div className={styles.iconText}>
                    <FontAwesomeIcon className={styles.icon} icon={faRotate} size="3x" />
                    <div>
                        <span>60 Days Return</span>
                        <br />
                        <span className={styles.textGrey}>If have any problem</span>
                    </div>
                </div>
                <div className={styles.iconText}>
                    <FontAwesomeIcon className={styles.icon} icon={faCreditCard} size="3x" />
                    <div>
                        <span>Secure Payment</span>
                        <br />
                        <span className={styles.textGrey}>100% secure payment</span>
                    </div>
                </div>
            </div>
            <div className={`${styles.titleContein} ${styles.displayDesktop}`}>
                <div className={styles.ftTitle}>Featured Products</div>
                <div className={styles.ltTitle}>Latest Products</div>
            </div>
            <div className={styles.carrousels}>
                <div className={styles.ft}>
                    <div className={`${styles.ftTitle} ${styles.displayMobile}`}>Featured Products</div>
                    {
                        rFtProducts ? rFtProducts.map((e, index) => (
                            <ProductCarrousel
                                key={e.name + index}
                                id={e.product_id}
                                image={e.images}
                                name={e.name}
                                rating={e.rating}
                                price={e.price} />
                        )) : null
                    }
                </div>
                <div className={styles.lt}>
                    <div className={`${styles.ltTitle} ${styles.displayMobile}`}>Latest Products</div>
                    {
                        rLtProducts ? rLtProducts.map((e, index) => (
                            <ProductCarrousel
                                key={index + 'rlt'}
                                id={e.product_id}
                                image={e.images}
                                name={e.name}
                                rating={e.rating}
                                price={e.price} />
                        )) : null
                    }
                </div>

            </div>
        </div>
    )
}

export default Home