import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

// import { applyMiddleware, combineReducers, createStore } from 'redux';
// import { Provider } from "react-redux"

// import createSagaMiddleware from '@redux-saga/core';
// import { watchAuth, watchUserRole } from "./store/sagas/index"
// import authReducer from "./store/authSlice"
// import userRoleReducer from "./store/userRoleSlice"

// const rootReducer = combineReducers({
// auth: authReducer,
// userRole: userRoleReducer
// })

// const sagaMiddleware = createSagaMiddleware()

// const store = createStore(
//   rootReducer,
//   applyMiddleware(sagaMiddleware)
// )

// sagaMiddleware.run(watchAuth)

ReactDOM.render(
  // <Provider store={store}>
  <App />
  // </Provider>,
  , document.getElementById('root')
);
