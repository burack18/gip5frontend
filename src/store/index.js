import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice'
import autosReducer from '../features/auto/autoSlice'

export const store  = configureStore({
    reducer:{
        user:userReducer,
        autos:autosReducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false}),
})
export default store;