import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import ProductList from './ProductList';

const ProductSearch = () => {
    const navigate = useNavigate()

    const found = useSelector(state => state.products.foundProducts);
    if (found.length === 1) {
        const product_id = found[0].product_id
        navigate('/product/' + product_id)
    }

    return (
        <div>
            {
                found.length > 1 ?
                    <ProductList productList={found} /> : <div>'ups!! no existen coincidencias'</div>
            }
        </div>
    )
}

export default ProductSearch