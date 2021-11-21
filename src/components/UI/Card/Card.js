import React, { useContext } from "react"
import classes from "./Card.module.css"

import UserRoleContext from "../../../store/userRole-context";

import LocationOnIcon from '@mui/icons-material/LocationOn';
import ClearIcon from '@mui/icons-material/Clear';

import Button from "../Button/Button"

const Card = (props) => {

    const userRoleCtx = useContext(UserRoleContext)
    const isRecruiter = userRoleCtx.isRecruiter

    return (
        <div
            style={{ height: props.height, width: props.width }}
            className={classes.Card}>
            {
                props.extraInformation && props.clicked &&
                <span
                    onClick={props.clicked}
                    style={{ cursor: "pointer" }}>
                    <ClearIcon className={classes.ClearIcon} />
                </span>
            }
            <h4 className={classes.Heading}>{props.heading}</h4>
            <p className={classes.Content}>{props.content}</p>
            {props.extraInformation
                ? <div className={classes.Information}>
                    <span>
                        <LocationOnIcon style={{ color: "#43AFFF" }} />
                        <p>{props.extraInformation?.location}</p>
                    </span>
                    {props.extraInformation.buttonRequired &&
                        <Button
                            clicked={props.buttonClicked}
                            btnType="Secondary">
                            {isRecruiter ? "View Applications" : "Apply"}
                        </Button>
                    }
                </div>
                : null}
        </div>
    )
}

export default Card