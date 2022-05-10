import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as starReg } from '@fortawesome/free-regular-svg-icons'
import styles from './productCF.module.css'
import { Link } from 'react-router-dom'

const ProductCarrousel = ({ id, image, name, rating, price }) => {
    const star = Math.floor(rating)

    return (
        <div className={styles.container}>
            <Link className={styles.detailLink} to={`/product/${id}`}>
                <div className={styles.item}>
                    <img className={styles.img} src={image[0]} alt={name} />
                    <div className={styles.name}>{name.substring(0, 16)}</div>
                    <div className={styles.rate}>
                        {
                            [...Array(star)].map((e, index) => {
                                return <FontAwesomeIcon key={'faStar' + index} icon={faStar} />
                            })
                        }
                        {
                            [...Array(5 - star)].map((e, index) => {
                                return <FontAwesomeIcon key={'starReg' + index} icon={starReg} />
                            })
                        }
                    </div>
                    <div className={styles.price}>{price}</div>
                </div>
            </Link>
        </div>
    )
}

export default ProductCarrousel