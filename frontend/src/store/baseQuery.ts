import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { RootState } from './store'
import { savedToken } from './features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    prepareHeaders: (headers: Headers, { getState }) => {
        const state = getState() as RootState
        const token = state.auth.token

        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        } else {
            headers.delete('Authorization')
        }

        return headers
    }
})

const baseQueryForRefresh = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    prepareHeaders: (headers: Headers, { getState }) => {
        const state = getState() as RootState
        const refreshToken = state.auth.refreshToken

        if (refreshToken) {
            headers.set('Authorization', `Bearer ${refreshToken}`)
        } else {
            headers.delete('Authorization')
        }

        return headers
    }
})

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 401) {
        const state = api.getState() as RootState

        const refreshResult = await baseQueryForRefresh(
            {
                url: '/auth/refresh',
                method: 'POST',
                body: {
                    sid: state.auth.sid
                }
            },
            api,
            extraOptions
        )

        if (refreshResult.data) {
            api.dispatch(savedToken(refreshResult.data))

            result = await baseQuery(args, api, extraOptions)
        } else {
            console.log('No token!')
        }
    }
    return result
}

