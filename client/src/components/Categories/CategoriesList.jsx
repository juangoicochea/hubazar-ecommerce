import React from 'react'
//redux
import { connect } from 'react-redux'
import styles from '../Categories/CategoriesList.module.css'

const CategoriesList = ({ categoryList, loading, error, setCategory, selectedCategory, listOfCategories }) => {
    const categoryMarkup = loading ? (
        <div>Loading...</div>
    ) : error ? (
        <div>{error}</div>
    ) : (

        categoryList.map((category, id) => (
            //category.name === selectedCategory.name || category.parent_name === selectedCategory.name ? (
            listOfCategories[category.name] === 1 ? category.name === selectedCategory.name ? (
                <li key={id} onClick={() => setCategory("")} className={styles.selected}> {`> ${category.name}`} </li>) : (
                <li key={id} onClick={() => setCategory(category)}>{category.name}</li>
            )
                : null

        ))
    )

    return (
        <div className={styles.container}>
            <h2>Categories</h2>
            <ul>
                {categoryMarkup}
            </ul>
        </div>
    )
}

const mapStateToProps = state => ({
    categoryList: state.categories.categories_detail,
    loading: state.categories.loading,
    error: state.categories.error,
})

export default connect(mapStateToProps)(CategoriesList)