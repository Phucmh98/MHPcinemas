import { Fragment, useEffect } from "react"
import { Route } from "react-router"
import React from "react";


export const UserTemplate = (props) => {
    const { Component, ...restProps } = props
    useEffect(() => {
        window.scrollTo(0, 0)
    })
    return <Route {...restProps} render={(propsRoute) => {
        return <Fragment>            
                <Component {...propsRoute} />           
            
        </Fragment>
    }} />
}