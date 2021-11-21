import React from "react"
import classes from "./FallbackUi.module.css"

const FallbackUi = (props) => {
    return (
        <div
            style={{ height: props.height, width: props.width, background: props.background }}
            className={classes.FallBack}>
            <span>{props.icon}</span>
            <p>{props.content}</p>
            {props.children}
        </div>
    )
}

export default FallbackUi