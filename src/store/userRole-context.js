import React, { useState } from "react"

const UserRoleContext = React.createContext({
    userRole: null,
    assignRole: (role) => { },
    isRecruiter: null,
})


export const UserRoleContextProvider = (props) => {
    const initialUserRole = localStorage.getItem("userRole")
    const [userRole, setUserRole] = useState(initialUserRole)
    const [userIsRecruiter, setUserIsRecruiter] = useState(!(!!+initialUserRole))

    const assignRoleHandler = (role) => {
        setUserRole(role)
        localStorage.setItem("userRole", role)
        if (role === 0) {
            setUserIsRecruiter(true)
        }
        else if (role === 1) {
            setUserIsRecruiter(false)
        }
    }

    const contextValue = {
        userRole: userRole,
        assignRole: assignRoleHandler,
        isRecruiter: userIsRecruiter
    }

    return <UserRoleContext.Provider value={contextValue}>
        {props.children}
    </UserRoleContext.Provider>

}

export default UserRoleContext
