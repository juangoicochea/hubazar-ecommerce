import React from 'react'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchProducts } from '../../redux'
import { Link } from 'react-router-dom'
import styles from './productForm.module.css'


const AddProductDone = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])
    return (
        <div>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <h2>The product was added correctly</h2>
            <h3>What are you waiting for to see him!</h3>
            <Link to={'/products'}><button className={styles.submitStock}>Products</button></Link>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
        </div>
    )
}

export default AddProductDone