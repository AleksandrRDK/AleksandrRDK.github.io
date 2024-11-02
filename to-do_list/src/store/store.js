import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

const stringMiddleware = () => (next) => (actions) => {
    if (typeof actions === "string") {
        return next({
            type: actions
        })
    }
    return next(actions)
}

const store = configureStore({
    reducer: {[apiSlice.reducerPath]: apiSlice.reducer},
    middleware: getDedaultMiddleware => getDedaultMiddleware().concat(stringMiddleware, apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;