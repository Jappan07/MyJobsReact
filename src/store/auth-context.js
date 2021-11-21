import React, { useState } from "react"

const AuthContext = React.createContext({
    name: "",
    token: "",
    resetPasswordToken: "",
    resetPassword: (resetPasswordToken) => { },
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { },
    getName: () => { }
})

const EXPIRE_IN_MINUTES = 30

const loginSurvivalTime = () => {
    const currentTime = new Date().getTime()
    const futureTime = new Date(currentTime + EXPIRE_IN_MINUTES * 60000)
    const remainingTime = futureTime - currentTime
    return remainingTime
}

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem("token")
    const initialName = localStorage.getItem("name")
    const [token, setToken] = useState(initialToken)
    const [name, setName] = useState(initialName)
    const [resetPasswordToken, setResetPasswordToken] = useState(null)

    const userIsLoggedIn = !!token

    const resetPasswordHandler = (resetPasswordToken) => {
        setResetPasswordToken(resetPasswordToken)
    }

    const logoutHandler = () => {
        setToken(null)
        localStorage.removeItem("token")
        localStorage.removeItem("userRole")
        localStorage.removeItem("name")
    }

    const loginHandler = (token) => {
        setToken(token)
        localStorage.setItem("token", token)

        const duration = loginSurvivalTime()
        setTimeout(logoutHandler, duration);
    }

    const nameHandler = (name) => {
        setName(name)
        localStorage.setItem("name", name)
    }

    const contextValue = {
        name: name,
        token: token,
        resetPasswordToken: resetPasswordToken,
        resetPassword: resetPasswordHandler,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        getName: nameHandler
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext