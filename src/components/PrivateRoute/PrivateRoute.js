import React from "react"
import { Route, Redirect } from "react-router-dom"

const PrivateRoute = ({ component: Component, ...rest }) => {
    let token = localStorage.getItem("token")

    return (
        <Route {...rest} render={props => (
            token ? (
                <Component {...props} />
            ) : (
                <Redirect to={{
                    pathname: "/",
                    state: { from: props.location }
                }} />
            )
        )} />
    )
}

export default PrivateRoute