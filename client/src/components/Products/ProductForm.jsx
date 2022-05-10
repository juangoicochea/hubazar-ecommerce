import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Inputs from '../Inputs/Inputs'
import { addPRODUCT } from '../../redux/'
import styles from './productForm.module.css'
import TextArea from '../Inputs/TextArea'
import jwt from 'jwt-decode'
import { addStock, fetchProducts } from '../../redux'

// import { fetchCategories } from '../../redux'

const ProductForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const categories = useSelector(state => state.categories.categories_detail)

    // useEffect(() => {
    //     dispatch(fetchCategories())
    // }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const validation = {
        name: /^[A-Za-z0-9\s.,]+$/,
        image: /^https?:\/\/[\w]+(\.[\w]+)+[/#?]?.*$/
    }
    const [data, setData] = useState({
        name: '',
        description: '',
        category_name: '',
        image: [],
        imgOnScreen: ''
    })

    const [nameError, setNameError] = useState('')
    const [descriptionError, setDescriptionError] = useState('')
    const [imageError, setImagetError] = useState('')
    const [categoryError, setCategoryError] = useState(true)
    const [toggle, setToggle] = useState(false)

    const onClear = () => {
        setData({
            name: '',
            description: '',
            category_name: '',
            images: [],
            imgOnScreen: ''
        })
    }

    const onCategory = (e) => {
        // setToggle()
        if (e.target.value !== 'category') {
            setData({ ...data, category_name: e.target.value })
            setCategoryError(false)
        } else {
            setCategoryError(true)
        }
    }


    const onSubmit = (e) => {
        e.preventDefault();
        if (!nameError && !descriptionError && !imageError && !categoryError) {
            setData({ ...data, image: data.image.push(data.imgOnScreen) })
            dispatch(addPRODUCT(data))
            setToggle(true)
            document.getElementById('formOne').style.display = "none";
            onClear()
        }
    }

    //-----------------------submitTwo

    const dataEncode = localStorage.getItem('token')
    const userId = jwt(dataEncode).user_id

    const productId = useSelector(state => state.products.product_id)

    const [stock, setStock] = useState({
        user_id: userId,
        product_id: '',
        quantity: 0,
        unit_price: ''
    });

    useEffect(() => {
        setStock({
            ...stock,
            product_id: productId
        })
    }, [stock.quantity])


    const onSubmitTwo = (e) => {
        e.preventDefault();
        dispatch(addStock(stock))
        dispatch(fetchProducts())
        navigate('/add-product/done')
    }
    const onPrice = ({ target }) => {
        const { value } = target
        setStock({
            ...stock,
            unit_price: value
        })
    }

    const decrement = () => {
        if (stock.quantity > 0) {
            setStock({
                ...stock,
                quantity: stock.quantity - 1
            })
        }
    }
    const increment = () => {
        setStock({
            ...stock,
            quantity: stock.quantity + 1
        })
    }


    return (
        <>
            <div className={styles.pathContainer}>
                <div className={styles.path}>
                    Home / Sell / Add-Product
                </div>
            </div>
            <div className={styles.container} >
                <form id='formOne' className={styles.form} autoComplete="off" onSubmit={onSubmit}>
                    <div className={styles.formContent}>
                        <div className={styles.leftContainer}>
                            {
                                !imageError && <img alt='' className={styles.img} src={data.imgOnScreen} />
                            }
                            <span className={styles.labels}>Product Image</span>
                            <Inputs
                                className={styles.imgInput}
                                error={imageError}
                                setError={setImagetError}
                                data={data}
                                setData={setData}
                                type='url'
                                placeholder='Url Image'
                                name='imgOnScreen'
                                textError='Product image needs to be a Valid URL'
                                validation={validation.image}
                                value={data.imgOnScreen}
                            />
                        </div>
                        <div className={styles.rightContainer}>
                            <div className={styles.catName}>
                                <span className={styles.labels}>Product Name</span>
                                <Inputs
                                    error={nameError}
                                    setError={setNameError}
                                    data={data}
                                    setData={setData}
                                    type='text'
                                    placeholder='Product Name'
                                    name='name'
                                    textError='Product name needs to be at least 50 characters long.letters and numbers'
                                    validation={validation.name}
                                    value={data.name}
                                />
                                <span className={styles.labels}>Product Category</span>
                                <select onChange={onCategory}>
                                    <option>Category</option>
                                    {
                                        categories.map(e => (
                                            <option key={e.name} value={e.name}>{e.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <span className={styles.labelsLast}>Product Description</span>
                            <TextArea
                                className={styles.description}
                                error={descriptionError}
                                setError={setDescriptionError}
                                data={data}
                                setData={setData}
                                type='text'
                                placeholder='Description'
                                name='description'
                                textError='only letters and numbers'
                                validation={validation.name}
                                value={data.description}
                            />
                        </div>
                    </div>
                    <div className={styles.butContent}>
                        {
                            (
                                !nameError
                                && !descriptionError
                                && !imageError
                                && data.name !== ''
                                && data.description !== ''
                                && data.imgOnScreen !== ''
                                && !categoryError
                            ) ?
                                <button className={styles.butSaveOne} type='submit'>save</button>
                                :
                                <button className={styles.butDisabled} type='submit' disabled>save</button>
                        }
                        <button className={styles.butClear} onClick={onClear}>clear</button>
                    </div>
                </form>
                {
                    toggle &&
                    <form className={styles.contentStock} onSubmit={onSubmitTwo}>
                        <div className={styles.contentQuantity}>
                            <span className={styles.span}>Quantity</span>
                            <input type='button' className={styles.butStock} onClick={decrement} value='-' />
                            <span className={styles.quantity}>{stock.quantity}</span>
                            <input type='button' className={styles.butStock} onClick={increment} value='+' />
                        </div>
                        <input className={styles.unitPrice} type='number' onChange={onPrice} placeholder='unit_price' value={stock.unit_price}></input>
                        <button type='submit' className={styles.submitStock}>save</button>
                    </form>
                }
            </div >
        </>
    )
}

export default ProductForm