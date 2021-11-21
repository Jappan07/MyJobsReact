import { createSlice } from '@reduxjs/toolkit'

import { updateObject } from "../utils/updateObject"

const initialAuthState = {
    token: "",
    resetPasswordToken: "",
    isLoggedIn: false,
    error: null,
    loading: false,
    authRedirectPath: '/',
    userRole: null,
    isRecruiter: null,
}

const checkIfRecruiter = (role) => {
    if (role === 0) {
        return true
    }
    else if (role === 1) {
        return false
    }
}

const authSlice = createSlice({
    name: "authentication",
    initialState: initialAuthState,
    reducers: {
        auth(state) { },

        authStart(state) {
            return updateObject(state, { error: null, loading: true });
        },

        authSuccess(state, action) {
            return updateObject(state, {
                error: null,
                loading: false,
                isLoggedIn: true,
                token: action.payload.token,
                userRole: action.payload.userRole,
                isRecruiter: checkIfRecruiter(action.payload.userRole),
            });
        },

        authFailed(state, action) {
            return updateObject(state, {
                error: action.payload.error,
                loading: false
            })
        },

        logout(state) {
            localStorage.removeItem("token")
            localStorage.removeItem("userRole")
            return updateObject(state, {
                token: null,
                isLoggedIn: false
            })
        },

        getResetPasswordToken(state, action) {
            updateObject(state, {
                resetPasswordToken: action.payload.resetPasswordToken
            })
        },

        resetPasswordStart(state) {
            return updateObject(state, {
                error: null,
                loading: true
            })
        },

        resetPasswordSuccess(state, action) {
            return updateObject(state, {
                loading: false,
                resetPasswordToken: action.payload.resetPasswordToken
            })
        },

        resetPasswordFailed(state, action) {
            return updateObject(state, {
                loading: false,
                resetPasswordToken: null,
                error: action.payload.error
            })
        },

        resetPassword(state) { },

        checkAuthTimeout(state) { },

        authCheckState(state) { },

        setAuthRedirectPath(state, action) {
            return updateObject(state, { authRedirectPath: action.payload.path })
        }
    }
})

export const {
    auth,
    authStart,
    authSuccess,
    authFailed,
    logout,
    checkAuthTimeout,
    authCheckState,
    resetPassword,
    resetPasswordStart,
    resetPasswordSuccess,
    resetPasswordFailed,
    getResetPasswordToken,
    setAuthRedirectPath
} = authSlice.actions

export default authSlice.reducer
