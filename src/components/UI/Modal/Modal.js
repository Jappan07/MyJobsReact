import React from "react"
import classes from "./Modal.module.css"

import ClearIcon from '@mui/icons-material/Clear';

import Backdrop from "../Backdrop/Backdrop"

const Modal = (props) => {
    return (
        <React.Fragment>
            <Backdrop clicked={props.modalClosed} show={props.show} />
            <div className={classes.Modal}
                style={{
                    transform: props.show ? "translateY(0)" : "translateY(-100vh)",
                    opacity: props.show ? "1" : "0"
                }}>
                <span style={{ cursor: "pointer" }} onClick={props.modalClosed}>
                    <ClearIcon />
                </span>
                {props.children}
            </div>
        </React.Fragment>
    )
}

export default React.memo(Modal, (prevProps, nextProps) => nextProps.show === prevProps.show && nextProps.children === prevProps.children)