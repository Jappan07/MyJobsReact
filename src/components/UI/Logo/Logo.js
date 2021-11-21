import React from "react"
import { useHistory } from "react-router"
import classes from "./Logo.module.css"

const Logo = (props) => {
    const history = useHistory()

    return (
        <div onClick={() => history.push("/")} className={classes.Logo}>
            <h2
                style={{ fontSize: props.size, color: "#43AFFF" }}
                className={classes.LogoText}>
                <span>My</span>Jobs
            </h2>
        </div>
    )
}

export default Logo