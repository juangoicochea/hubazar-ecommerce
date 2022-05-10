import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from '../SearchBar/SearchBar.module.css'
import { fetchProductByName } from '../../redux/Products/productActions'
import { useNavigate } from 'react-router-dom';


export default function SearchBar() {
    const [input, setInput] = useState('');
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [suggestions, setSuggestions] = useState([])
    const [products, setProducts] = useState([]);
    const productList = useSelector(state => state.products.products)

    const suggestionHandler = (text, id) => {
        setInput("")
        setSuggestions([])
        navigate(`/product/${id}`)
    }

    const onChangeHandler = (text) => {
        let matches = []
        if (text.length > 0) {
            matches = products.filter(product => {
                const regex = new RegExp(`${text}`, "gi")
                return product.name.match(regex)
            })
        }
        setSuggestions(matches)
        setInput(text)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const tmp = input
        dispatch(fetchProductByName(tmp))
        setInput("")
        setSuggestions([])

        navigate('/find-product')
    }

    const onKeyIntro = (e) => {
        if (e.keyCode === 13) {
            onSubmit(e)
            navigate('/find-product')
        }
    }

    useEffect(() => {
        setProducts(productList)
    }, [productList])
    return (
        <div className={styles.container}>
            <form onSubmit={onSubmit}>
                <input
                    onChange={e => onChangeHandler(e.target.value)}
                    onKeyDown={onKeyIntro}
                    value={input}
                    type='text'
                    placeholder='What are you looking for...'
                />
                <button type='submit'>Search</button>
            </form>
            {
                suggestions.length > 0 &&
                <div className={styles.suggestions}>
                    <ul>
                        {suggestions && suggestions.slice(0, 3).map((suggestion, i) =>
                            <li key={i}
                                className={styles.liSuggestions}
                                onClick={(name, id) => { suggestionHandler(suggestion.name, suggestion.product_id) }}>
                                {suggestion.name.length > 40 ? (suggestion.name.substring(0, 35) + "...") : suggestion.name}
                            </li>
                        )}
                    </ul>
                </div>
            }

        </div>
    )
}