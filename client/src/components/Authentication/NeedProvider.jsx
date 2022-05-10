import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './needLoginOrRegister.module.css'

const NeedProvider = () => {
    const navigate = useNavigate()
    return (
        <div className={styles.background}>
            <div className={styles.backgroundModal}>
                <div className={styles.modal} >
                    <h3 className={styles.tittle}>You need to be an authenticated provider</h3>
                    <div className={styles.options}>
                        <div className={styles.signIn}>
                            <div>Are you a provider?</div>
                            <div className={styles.butContent}>
                                <span className={styles.buttonBefore}></span>
                                <button onClick={() => { navigate('/login') }} className={styles.buttonSignIn}>Sign in</button>
                            </div>
                        </div>
                        <div className={styles.signUp}>
                            <div>You're new?</div>
                            <button onClick={() => { navigate('/register') }} className={styles.buttonSignUp}>Sign up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NeedProvider