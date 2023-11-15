import { Fragment, useEffect } from "react"
import { Route } from "react-router"
import React from "react";
import { USER_LOGIN } from "../../ultil/settings/config";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import Footer from "../HomeTemplate/Layout/Footer/Footer";
import HeaderCheckout from "./HeaderCheckout/HeaderCheckout";


const CheckoutTemplate = (props) => {
    const { Component, ...restProps } = props
    useEffect(() => {
        window.scrollTo(0, 0)
    })
    if (!localStorage.getItem(USER_LOGIN)) {
        return <Redirect to='/login' />
    }

    return <Route {...restProps} render={(propsRoute) => {
        return <Fragment>
        <HeaderCheckout/>
            <Component {...propsRoute} />
        <Footer/>
        </Fragment>
    }} />
}

export default CheckoutTemplate