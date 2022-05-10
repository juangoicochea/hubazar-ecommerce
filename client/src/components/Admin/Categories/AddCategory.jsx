import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Inputs from '../../Inputs/Inputs'
import styles from './add-category.module.css'
import { postCategory } from '../../../redux'
import ModalError from '../../Modal/ModalError'


const AddCategory = () => {
  const dispatch = useDispatch()
  const categories = useSelector(state => state.categories.categories_detail)
  const categoriesFathers = categories.filter(cat => !cat.parent_name)
  const isAdmin = useSelector(state => state.login.login.isAdmin)


  //reg exp
  const validation = {
    name: /^[A-Za-z\s.,]+$/,
  }

  //add category
  const [data, setData] = useState({
    name: ''
  })
  const [nameError, setNameError] = useState('')

  const onSubmit = (e) => {
    e.preventDefault();
    if (!nameError) {
      dispatch(postCategory(data))
      setData({ name: '' })
    }
  }

  //add subcategory
  const [data2, setData2] = useState({
    name: '',
    parent_name: ''
  })

  const [nameSubCatError, setNameSubCatError] = useState('')
  const [parent_nameError, setParentNameError] = useState(true)

  const onFather = ({ target }) => {
    const { value } = target;
    setData2({
      ...data2,
      parent_name: value
    })
    setParentNameError(false)
  }

  const onSubmit2 = (e) => {
    e.preventDefault();
    if (!parent_nameError && !nameSubCatError) {
      dispatch(postCategory(data2))
      setData2({
        name: '',
        parent_name: ''
      })
    }
  }
  return (
    <div className={styles.background}>
      <div className={styles.maxWidth}>
        <div className={styles.formContent}>
          <form onSubmit={onSubmit} autoComplete='off'>
            <div className={styles.formCat}>
              <p className={styles.tittle}>Add a category</p>
              <Inputs
                error={nameError}
                setError={setNameError}
                data={data}
                setData={setData}
                type='text'
                placeholder='title'
                name='name'
                textError='category name only letters'
                validation={validation.name}
                value={data.name}
              />
              {
                nameError.length === 0 || data.name.length === 0 ?
                  <button className={styles.submitDisabled} type='submit' disabled>add</button>
                  :
                  <button className={styles.submit} type='submit'>add</button>

              }
            </div>
          </form>
          <form onSubmit={onSubmit2} autoComplete='off'>
            <div className={styles.formSubCat}>
              <p className={styles.tittle}>Add a subcategory</p>
              <select onChange={onFather}>
                <option>select parent category</option>
                {
                  categoriesFathers.map(e => (<option key={e.name} value={e.name}>{e.name}</option>))
                }
              </select>
              <Inputs
                error={nameSubCatError}
                setError={setNameSubCatError}
                data={data2}
                setData={setData2}
                type='text'
                placeholder='title'
                name='name'
                textError='category name only letters'
                validation={validation.name}
                value={data2.name}
              />
              {
                !parent_nameError && !nameSubCatError ?
                  <button className={styles.submit} type='submit'>add</button> :
                  <button className={styles.submitDisabled} type='submit' disabled>add</button>
              }
            </div>
          </form>
        </div>
      </div>
      {
        !isAdmin && <ModalError />
      }
    </div>
  )
}

export default AddCategory