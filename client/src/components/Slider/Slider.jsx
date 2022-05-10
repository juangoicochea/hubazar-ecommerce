import React, { useState, useEffect } from 'react'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import styles from '../Slider/Slider.module.css'
import banner1 from "../../assets/banner-1.png";
import banner2 from "../../assets/banner-2.png";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchProductByCategory } from '../../redux'

const slideImages = [
    banner1,
    banner2
  ]

const Slider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const onCategory = (e) => {
    dispatch(fetchProductByCategory(e))
    navigate("/find-product")   
  }

    return (
      <div className={styles.container}>
        <Slide easing="ease">
          <a onClick={() => onCategory('Electronics')}>
            <div className={styles.eachSlide}>
              <div style={{'backgroundImage': `url('${slideImages[0]}')`}}>
              </div>
            </div>
          </a>
          <a onClick={() => onCategory('Sports')}>
            <div className={styles.eachSlide}>
              <div style={{'backgroundImage': `url('${slideImages[1]}')`}}>
              </div>
            </div>
          </a>
        </Slide>
      </div>
    )
};

export default Slider;