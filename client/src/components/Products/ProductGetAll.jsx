import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from '../../redux'
import ProductList from './ProductList'

const ProductListAll = ({ fetchProducts, productList, loading, error, numberOfProducts }) => {
    useEffect(() => {
        if (numberOfProducts === 0) {
            console.log("fetching products")
            fetchProducts()
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const activeProducts = productList.filter(product => product.approved)
    //console.log(activeProducts, "<--- activeProducts");

    const productMarkup = loading ? (
        <div className='App-container'>
            <div className="loader"></div>
        </div>
    ) : error ? (
        <div>{error}</div>
    ) : (
        <ProductList productList={activeProducts} />
    )

    return (
        <div>
            {productMarkup}
        </div>
    )
}

const mapStateToProps = state => ({
    productList: state.products.products,
    numberOfProducts: state.products.numberOfProducts,
    loading: state.products.loading,
    error: state.products.error,
})

const mapDispatchToProps = dispatch => ({
    fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductListAll)