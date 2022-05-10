import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Route404.module.css'
import image404 from '../../assets/image404.jpg'

const Route_404 = () => {
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <img src={image404} className={styles.img} />
            </div>
            <div className={styles.right}>
                <p>The requested page does not exist.</p>
                <Link className={styles.link} to={'/'}>Back to home</Link>
            </div>
        </div>
    )
}

export default Route_404