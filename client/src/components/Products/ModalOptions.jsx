import React from 'react'
import { useSelector } from 'react-redux'
import styles from './modalOptions.module.css'
import { orderBy } from '../../utils'
import SellerOptions from './SellerOptions'

const ModalOptions = ({ modalOptions, product_id, name, image }) => {

    const buyingOptions = useSelector(state => state.products.foundProducts.sellers).sort((a, b) => orderBy(a.stock.unit_price, b.stock.unit_price)).filter(e => { return e.stock.quantity > 0 })

    return (
        <div className={styles.backgroundModal}>
            <div className={styles.modalContent}>
                <button
                    className={styles.closeModal}
                    onClick={() => { modalOptions(false) }}
                >x</button>
                <h4>All buying options</h4>
                {
                    buyingOptions.map(element => (
                        <SellerOptions
                            key={element.name}
                            product_id={product_id}
                            name={name}
                            image={image}
                            seller={element}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default ModalOptions