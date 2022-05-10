import React, { useEffect, useState } from 'react'
import styles from './modalLoginFailure.module.css'

const ModalLoginFailure = ({ msgError }) => {
    const [displayNone, setDisplayNone] = useState({ opacity: '100%', transition: 'all 1s' })

    useEffect(() => {
        setTimeout(() => {
            setDisplayNone({ opacity: '0%', transition: 'all 1s' })
        }, 3000)
    }, [])


    return (
        <>
            {
                <div style={displayNone}>
                    <div className={styles.modalError}>
                        <div className={styles.background}>
                            <span className={styles.textError}>
                                {msgError}
                            </span>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ModalLoginFailure