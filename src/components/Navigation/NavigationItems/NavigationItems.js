import React, { useContext } from "react"
import classes from "./NavigationItems.module.css"

import AuthContext from "../../../store/auth-context"
import UserRoleContext from "../../../store/userRole-context"

import NavigationItem from "./NavigatonItem/NavigationItem"

const NavigationItems = () => {
    const authCtx = useContext(AuthContext)
    const userRoleCtx = useContext(UserRoleContext)

    const isLoggedIn = authCtx.isLoggedIn
    const isRecruiter = userRoleCtx.isRecruiter

    return (
        <ul className={classes.NavigationItems}>
            {isLoggedIn && (
                <React.Fragment>
                    <NavigationItem link="postings">Postings</NavigationItem>
                    {isRecruiter
                        ? <NavigationItem link="postjob">Post Job</NavigationItem>
                        : <NavigationItem link="appliedjobs">Applied Jobs</NavigationItem>
                    }
                </React.Fragment>
            )}
        </ul>
    )
}

export default NavigationItems
