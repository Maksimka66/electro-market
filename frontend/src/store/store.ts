import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from './user/userSlice'
import { userApi } from './user/userApi'
import { rtkQueryErrorLogger } from './errorMiddleware'

const rootPersistConfig = {
    key: 'electro_market',
    storage,
    whitelist: ['userData']
}

const rootReducer = combineReducers({
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
            .concat(rtkQueryErrorLogger)
            .concat(userApi.middleware)
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

