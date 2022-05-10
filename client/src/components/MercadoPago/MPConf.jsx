// import axios from 'axios';
import React, { useEffect } from 'react'
import { useLocation } from 'react-router';
import { emptyCart } from '../../redux'
import axios from 'axios';
import { mainPage, backendUrl } from '../../env';
import { useDispatch } from 'react-redux';
import styles from './MPConfig.module.css'
import mercadopago from '../../assets/mercadopago.png'

export default function MPConf() {
    const query = useLocation().search;
    const collection_id = new URLSearchParams(query).get("collection_id");
    const collection_status = new URLSearchParams(query).get("collection_status");
    const status = new URLSearchParams(query).get("status");
    const external_reference = new URLSearchParams(query).get("external_reference");
    const dispatch = useDispatch()
    useEffect(() => {
        axios.post(`${backendUrl}mp_confirmation/?external_reference=${external_reference}`)
            .then(res => {
                dispatch(emptyCart(external_reference))
            }
            )
            .catch(e => console.error)

        setTimeout(() => {
            window.location.href = mainPage
        }, 5000)
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={styles.container}>
            <img src={mercadopago} width='200' /><br />
            <strong>Transaction Status: {status}</strong>
            <p>You'll be redirected...</p>
        </div>
    )
}