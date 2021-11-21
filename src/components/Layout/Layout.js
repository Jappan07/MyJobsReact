import React from "react"
import classes from "./Layout.module.css"
import { ToastContainer } from 'react-toastify';

import Navbar from "../Navigation/Navbar/Navbar"

const Layout = (props) => {
    return (
        <React.Fragment>
            <Navbar />
            <main className={classes.SiteMain}>
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable={false}
                    pauseOnHover={false}
                />
                {props.children}
            </main>
        </React.Fragment>
    )
}

export default Layout