import React from 'react'
import classes from "./PageNavigationControls.module.css"

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const PageNavigation = React.memo((props) => {
    return (
        <div className={classes.PageNavigationControls}>
            <span onClick={props.page <= 1 ? null : props.prevPage}>
                <ArrowBackIcon className={props.page <= 1 ? classes.DisableButton : null} />
            </span>
            <span>
                {props.page}
            </span>
            <span onClick={props.page >= props.totalNumberOfPages ? null : props.nextPage}>
                <ArrowForwardIcon className={props.page >= props.totalNumberOfPages ? classes.DisableButton : null} />
            </span>
        </div>
    )
})

export default PageNavigation
