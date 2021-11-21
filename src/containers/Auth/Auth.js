import React, { useState, useEffect } from "react"
import classes from "./Auth.module.css"

import Login from "./Login/Login"
import Signup from "./Signup/Signup"

const Auth = () => {
    const [title] = useState("Login")
    const [isLogin, setIsLogin] = useState(true)

    useEffect(() => {
        document.title = title
    }, [title])

    const loginHandler = (loginState) => {
        setIsLogin(loginState)
    }

    let renderSwitchMode = null

    if (isLogin) {
        renderSwitchMode = (
            <p>New to MyJobs? <span onClick={() => setIsLogin(false)}>Create an account</span></p>
        )
    }
    else {

        renderSwitchMode = (
            <p>Have an account? <span onClick={() => setIsLogin(true)}>Login</span></p>
        )
    }

    return (
        <div
            style={isLogin ? { height: "auto" } : { marginTop: "20px" }}
            className={classes.Auth}>
            <h1>
                {isLogin ? "Login" : "Signup"}
            </h1>
            {isLogin ? <Login isLogin={isLogin} /> : <Signup isLoginHandler={loginHandler} />}
            <div className={classes.SwitchMode}>
                {renderSwitchMode}
            </div>
        </div>
    )
}

export default Auth