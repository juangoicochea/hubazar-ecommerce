import React from 'react'
import { orderBy } from '../../utils/'
import styles from './Product.module.css'
import ProductCard from './ProductCard'
import CategoriesList from '../Categories/CategoriesList'
import Pagination from '../Paginate/Pagination'
import { PRODUCTS_PER_PAGE } from '../../env'
import { useSelector } from 'react-redux'

const ProductList = ({ productList }) => {
    const categoryList = useSelector(state => state.categories.categories_detail)
    const [listCategoriesWithProducts, setListCategoriesWithProducts] = React.useState([])

    React.useEffect(() => {
        let listOfCategories = {}
        productList.length > 0 && categoryList.filter(category => {
            return productList.some(product => {
                if (product.category_name === category.name) {
                    listOfCategories[category.name] = 1;
                    if (category.parent_name !== null) {
                        listOfCategories[category.parent_name] = 1;
                    }
                }
                return product.category_name === category.name || product.category_name === category.parent_name
            }
            )
        })
        setListCategoriesWithProducts(listOfCategories)
    }, [productList, categoryList])


    const [search, setSearch] = React.useState('')
    const [order, setOrder] = React.useState('')
    const [category, setCategory] = React.useState('')

    const findChildrenCategories = (categoryName) => {
        const result = categoryList.filter(searchedCategory => {
            return searchedCategory.parent_name === categoryName
        })
        return result
    }

    let childrenCategories = findChildrenCategories(category?.name)
    let parentAndChildrenCategories = [category, ...childrenCategories]
    let productsPerCategory = category?.name?.length > 0 ? productList.filter(product =>
        parentAndChildrenCategories.some(category => product.category_name === category.name)) : productList

    let filteredProducts = search.length === 0 ? productsPerCategory :
        productsPerCategory.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))

    //productList.length > 0 && console.log(categoriesWithProducts, '<- Categories With Products')
    //console.log(parentAndChildrenCategories, '<- parent and children category')
    //console.log(category, '<- selected category')
    //console.log(childrenCategories, '<- children category')
    //console.log(productsPerCategory, '<--------- Filter by category and name')
    switch (order) {
        case 'nameAsc':
            filteredProducts = filteredProducts.sort((a, b) => orderBy(a.name.toLowerCase(), b.name.toLowerCase()))
            break;
        case 'nameDesc':
            filteredProducts = filteredProducts.sort((a, b) => orderBy(b.name.toLowerCase(), a.name.toLowerCase()))
            break;
        case 'scoreAsc':
            filteredProducts = filteredProducts.sort((a, b) => orderBy(a.rating, b.rating))
            break;
        case 'scoreDesc':
            filteredProducts = filteredProducts.sort((a, b) => orderBy(b.rating, a.rating))
            break;
        case 'priceAsc':
            filteredProducts = filteredProducts.sort((a, b) => orderBy(a.price, b.price))
            break;
        case 'priceDesc':
            filteredProducts = filteredProducts.sort((a, b) => orderBy(b.price, a.price))
            break;
        default:
            break;
    }

    let pages = filteredProducts.length ? Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE) : 1
    /*     if (pages === 0) {
            pages = 'No items founded'
        }
     */
    return (
        <div className={styles.container}>
            <div className={styles.menuList}>
                <div className={styles.filters}>
                    <h2>FILTER</h2>
                    <input
                        name="search"
                        type="text"
                        placeholder="Filter by name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className={styles.buttonSuccess} onClick={(e) => setSearch('')}>clear</button>
                    <select name="order" onChange={(e) => setOrder(e.target.value)}>
                        <option value="">Order by...</option>
                        <option value="nameAsc">name Ascending</option>
                        <option value="nameDesc">name Descending</option>
                        <option value="scoreAsc">Score Ascending</option>
                        <option value="scoreDesc">Score Descending</option>
                        <option value="priceAsc">Price Ascending</option>
                        <option value="priceDesc">Price Descending</option>
                    </select>
                </div>
                <CategoriesList selectedCategory={category} setCategory={setCategory} listOfCategories={listCategoriesWithProducts} />
            </div>

            <div className={styles.productsContainer}>
                {
                    pages >= 0 ? (
                        <Pagination
                            data={filteredProducts}
                            RenderComponent={ProductCard}
                            pageLimit={pages}
                            dataLimit={PRODUCTS_PER_PAGE}
                        />
                    ) : (
                        <div className={styles.noResults}>Your search returned no results.</div>
                    )
                }
            </div>
        </div>
    )
}

export default ProductList