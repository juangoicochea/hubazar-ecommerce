import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './nav.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { fetchProductByCategory, clearFilterCategory } from '../../redux'


const Nav = () => {
    const categories = useSelector(state => state.categories.categories_detail)
    const auth = useSelector(state => state.login.login)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false)

    const onClick = () => {
        setToggle(!toggle)
    }
    const onCategory = (e) => {
        onClick()
        dispatch(fetchProductByCategory(e.target.id))
        navigate('/find-product')
    }
    const onCategoryReset = () => {
        dispatch(clearFilterCategory())
    }

    console.log(auth.permission, ' permission---')
    console.log(auth.isProvider, ' provider---')
    console.log(auth, 'auth---')

    return (
        <div className={styles.background}>
            <div className={styles.container} >
                <NavLink className={styles.link} to={'/'}>Home</NavLink>
                <NavLink className={styles.link} to={'/products'}>Products</NavLink>
                <label className={styles.label} onClick={onClick}>Categories
                    {
                        toggle &&
                        <ul className={styles.ul}>
                            {
                                categories.map(e => (
                                    <li onClick={onCategory} id={e.name} key={e.name} className={styles.li}>{e.name}</li>
                                ))
                            }
                            <li className={styles.li} onClick={onCategoryReset}>all</li>
                        </ul>
                    }
                </label>
                {

                    auth.permission === "approved" && auth.isProvider === 'true' ?
                        <NavLink className={styles.link} to={'/add-product'}>Sell</NavLink> :
                        <NavLink className={styles.link} to={'/need-provider'}>Sell</NavLink>
                }
                {
                    auth.permission === "approved" ?
                        <NavLink className={styles.link} to={'/panels'}>User</NavLink> :
                        <NavLink className={styles.link} to={'/need-authenticated'}>User</NavLink>
                }
            </div>
        </div>
    )
}

export default Nav