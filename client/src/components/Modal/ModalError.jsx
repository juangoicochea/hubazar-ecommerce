import React from 'react'
import styles from './modalError.module.css'
import { useNavigate } from 'react-router-dom'

const ModalError = () => {
    const navigate = useNavigate()

    return (
        <div className={styles.background}>
            <div className={styles.maxWidth}>
                <div className={styles.modalContent}>
                    <img className={styles.img} src='http://www.imagenesanimadas.net/Mecanica/Sirenas/Sirena-15.gif' />
                    <p className={styles.tittle}><b>Unauthorized access</b></p>
                    <span className={styles.body}>you need admin permissions to continue</span>
                    <br></br><br></br>
                    <span>are you administrator?</span>
                    <button className={styles.button} onClick={() => { navigate('/login') }}>sign in</button>
                </div>
            </div>
        </div>
    )
}

export default ModalError