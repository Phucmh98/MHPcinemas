import { Fragment, useEffect } from "react"
import { Route } from "react-router"
import React from "react";
import Header from "./Layout/Header/Header";
import Footer from "./Layout/Footer/Footer";

export const HomeTemplate = (props) => {
    const { Component, ...restProps } = props

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    return <Route {...restProps} render={(propsRoute) => {
        return <Fragment>
            <Header {...restProps} />
            <Component {...restProps} />
            <hr/>
            <Footer {...restProps} />
        </Fragment>
    }} />
}