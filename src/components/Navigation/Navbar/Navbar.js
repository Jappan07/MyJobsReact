import React, { useContext } from "react"
import { useHistory } from "react-router"
import classes from "./Navbar.module.css"

import AuthContext from "../../../store/auth-context"

import Logo from "../../UI/Logo/Logo"
import Button from "../../UI/Button/Button"
import NavigationItems from "../NavigationItems/NavigationItems"
import UserBubble from "../../UI/UserBubble/UserBubble"

const Navbar = () => {
    const history = useHistory()

    const authCtx = useContext(AuthContext)
    const isLoggedIn = authCtx.isLoggedIn

    const logoutHandler = () => {
        authCtx.logout()
        history.replace("/")
    }

    const onClickHandler = () => {
        history.push("/auth")
    }

    return (
        <header className={classes.Navbar}>
            <div className={classes.LinksContainer}>
                <Logo size="22px" />
                <nav>
                    <NavigationItems />
                    {!isLoggedIn && <Button clicked={onClickHandler} btnType="NotDefault">Login/Signup</Button>}
                    {isLoggedIn && <UserBubble clicked={logoutHandler} />}
                </nav>
            </div>
        </header>
    )
}

export default Navbar