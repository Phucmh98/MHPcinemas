import React from 'react'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import logoLoading from '../../assets/img/Loading/loading_logo.gif'
import './Loading.css'
export default function Loading(props) {
    const { isLoading } = useSelector(state => state.LoadingReducer)

    return (
        <Fragment>
            {isLoading ?
                <div className='loading-img' style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#051122cb', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 99 }}>
                    <img src={logoLoading} alt="err" style={{ height: 200, width: 200 }} />
                </div> : ''}
        </Fragment>
    )
}
