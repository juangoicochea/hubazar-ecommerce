import React, { useEffect, useState } from 'react'
import usePaginate from '../../hooks/usePaginate'
import styles from './Paginate.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight, faAnglesLeft, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'

const Pagination = ({ data, RenderComponent, pageLimit, dataLimit, resetPage }) => {
    const [pages] = useState(Math.round(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1)
    }, [data])

    const goToNextPage = () => {
        currentPage < pageLimit && setCurrentPage((page) => page + 1);
        if (items.indexOf(currentPage) === 9) {
            nextPage()
        }
    }

    const goToPreviousPage = () => {
        setCurrentPage((page) => page > 1 ? page - 1 : 1);
        if (items.indexOf(currentPage) === 0) {
            prevPage()
        }
    }

    const changePage = (event) => {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    };

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    };
    // const [currentLimit, setCurrentLimit]=useState(0)
    // const [limit, setLimit] = useState(getPaginationGroup().slice(0, 10))
    const {
        nextPage,
        prevPage,
        items } = usePaginate(getPaginationGroup(), 10)

    return (
        <>
            <div className={styles.listContainer}>
                {getPaginatedData().map((d, idx) => (
                    <RenderComponent key={idx} product={d} />
                ))}
            </div>

            <div className={styles.pagination}>
                <button onClick={prevPage} className={styles.nextPrev}>
                    <FontAwesomeIcon icon={faAnglesLeft} />
                </button>
                <button
                    onClick={goToPreviousPage}
                    className={`${styles.nextPrev} ${currentPage === 1 ? 'disabled' : ''}`}
                >
                    <FontAwesomeIcon icon={faAngleLeft} />
                </button>

                {items.map((item, index) => (
                    <button
                        key={index}
                        onClick={changePage}
                        className={`${styles.paginationItem} ${currentPage === item ? styles.active : null}`}
                    >
                        <span>{item}</span>
                    </button>
                ))}

                <button
                    onClick={goToNextPage}
                    className={`${styles.nextPrev} ${currentPage === pages ? 'disabled' : ''}`}
                >
                    <FontAwesomeIcon icon={faAngleRight} />
                </button>
                <button onClick={nextPage} className={styles.nextPrev}>
                    <FontAwesomeIcon icon={faAnglesRight} />
                </button>
            </div>
        </>
    );
}
export default Pagination