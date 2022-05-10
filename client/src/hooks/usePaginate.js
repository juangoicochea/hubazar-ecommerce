import { useState } from 'react'

const usePaginate = (array, count) => {
    const [currentPage, setCurrentPage] = useState(0)
    let items = array.slice(currentPage, currentPage + count);

    const nextPage = () => {

        if (array.slice(currentPage + count, currentPage + (count * 2)).length > 0) {
            setCurrentPage(currentPage + count)
        }
    }

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - count)
        }
    }

    return {
        nextPage,
        prevPage,
        items
    }
}
export default usePaginate;