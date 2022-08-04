import userReducer from '../features/user/userSlice'
import autosReducer from '../features/auto/autoSlice'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist:['autos']
  }

 const persistedReducer = persistReducer(persistConfig,combineReducers({
    user:userReducer,
    autos:autosReducer
 }))
  
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })
  
 export let persistor = persistStore(store)
