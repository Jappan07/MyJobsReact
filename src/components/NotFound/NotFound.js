import React from 'react'
import { useHistory } from 'react-router-dom'

const NotFound = () => {
    let history = useHistory()

    return (
        <div style={{ textAlign: "center" }}>
            <h1>404 Not Found!</h1>
            <span style={{
                color: "#fff",
                textDecoration: "underline",
                cursor: "pointer"
            }}
                onClick={() => history.goBack()}>Go back</span>
        </div>
    )
}

export default NotFound
