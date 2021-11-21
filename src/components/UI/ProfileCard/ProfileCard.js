import React from "react"
import classes from "./ProfileCard.module.css"

const ProfileCard = (props) => {
    const initialLetterFirstName = props.name.charAt(0)

    return (
        <div className={classes.ProfileCard}>
            <div className={classes.Profile}>
                <div className={classes.ProfileImage}>{initialLetterFirstName}</div>
                <div className={classes.ProfileDetails}>
                    <b>{props.name}</b>
                    <p>{props.email}</p>
                </div>
            </div>
            <div className={classes.Skills}>
                <b>Skills</b>
                <p>{props.skills}</p>
            </div>
        </div>
    )
}

export default ProfileCard