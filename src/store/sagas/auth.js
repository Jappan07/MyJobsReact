import { put, delay } from "redux-saga/effects"

import axios from "../../axios-jobs"

import {
    authStart,
    authSuccess,
    authFailed,
    logout,
    resetPasswordStart,
    resetPasswordSuccess,
    resetPasswordFailed
} from "../authSlice"

const EXPIRE_IN_MINUTES = 30

const loginSurvivalTime = () => {
    const currentTime = new Date().getTime()
    const futureTime = new Date(currentTime + EXPIRE_IN_MINUTES * 60000)
    const remainingTime = futureTime - currentTime
    return remainingTime
}

export function* authUserSaga(action) {
    yield put(authStart())

    try {
        const enteredEmail = action.payload.enteredEmail
        const enteredPassword = action.payload.enteredPassword
        const response = yield axios.post("auth/login", {
            "email": enteredEmail,
            "password": enteredPassword
        })
        const token = response.data.data.token
        const userRole = response.data.data.userRole
        yield localStorage.setItem("token", token)
        yield localStorage.setItem("userRole", userRole)

        yield put(
            authSuccess({ token: token, userRole: userRole })
        )

    } catch (error) {
        yield put(authFailed({ error: error.response.data.message }))
    }
}

export function* logoutSaga(action) {
    yield put(logout())
}

export function* getPasswordTokenSaga(action) {
    yield put(resetPasswordStart())

    try {
        const response = yield axios.get(`auth/resetpassword?email=${action.enteredEmail}`)
        const passwordResetToken = response.data.data.token
        yield put(resetPasswordSuccess({ token: passwordResetToken }))
    }
    catch (error) {
        yield put(resetPasswordFailed({ error: error.response.data.message }))
    }

}

export function* resetPasswordSaga(action) {
    yield put(resetPasswordStart())
    try {
        const response = yield axios.get(`auth/resetpassword/${action.token}`)
        const statusCode = response.data.code
        if (statusCode === 200) {
            yield put(resetPasswordStart())
        }
    } catch (error) {
        const errorMessage = error.response.data.message
        yield put(resetPasswordFailed({ error: errorMessage }))
    }
}

export function* checkAuthTimeoutSaga(action) {
    const duration = yield loginSurvivalTime()
    yield delay(duration)
    yield put(logout())
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem("token")

    if (!token) yield put(logout())
    else yield put(authSuccess({ token: token }))

}

