import { all, takeEvery } from "@redux-saga/core/effects";

import {
    auth,
    logout,
    checkAuthTimeout,
    resetPassword,
    getResetPasswordToken
} from "../authSlice"

import { authUserSaga, checkAuthTimeoutSaga, logoutSaga, resetPasswordSaga } from "./auth";

export function* watchAuth() {
    yield all([
        takeEvery(auth.type, authUserSaga),
        takeEvery(logout.type, logoutSaga),
        takeEvery(checkAuthTimeout.type, checkAuthTimeoutSaga),
        takeEvery(resetPassword.type, getResetPasswordToken),
        takeEvery(resetPassword.type, resetPasswordSaga)
    ])
}

// export function* watchUserRole() {
//     yield takeEvery(assignRole.type, assignRoleSaga)
// }