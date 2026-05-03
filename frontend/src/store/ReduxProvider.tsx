'use client'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './store'
import Loader from '../shared/Loader/Loader'
import { IReduxProvider } from '../interfaces/props'

export default function ReduxProvider({ children }: IReduxProvider) {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={<Loader width='100' height='100' />}>
                {children}
            </PersistGate>
        </Provider>
    )
}

