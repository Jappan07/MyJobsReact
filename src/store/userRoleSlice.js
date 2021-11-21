import { createSlice } from "@reduxjs/toolkit";

const initialUserRoleState = {
    userRole: "",
    isRecruiter: null,
}

const userRoleSlice = createSlice({
    name: "userRole",
    initialState: initialUserRoleState,
    reducers: {
        assignRole(state, action) {
            const role = action.payload.role

            state.userRole = role

            if (role === 0) {
                state.isRecruiter = true
            }
            else if (role === 1) {
                state.isRecruiter = false
            }
        }
    }
})

export const { assignRole } = userRoleSlice.actions

export default userRoleSlice.reducer