import { put } from "@redux-saga/core/effects";

import { assignRole } from "../userRoleSlice"

export function* assignRoleSaga(action) {
    yield put(assignRole({ role: action.payload.role }))
}