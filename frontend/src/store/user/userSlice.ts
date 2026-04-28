import { createSlice } from '@reduxjs/toolkit'
import { userApi } from './userApi'

const initialState = {
    user: null,
    accessToken: '',
    refreshToken: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    selectors: {
        selectUser: (state) => state.user,
        selectAccessToken: (state) => state.accessToken,
        selectRefreshToken: (state) => state.refreshToken
    },
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(userApi.endpoints.register.matchFulfilled, (state, { payload }) => {
            state.user = payload.createdUser
            state.accessToken = payload.accessToken
            state.refreshToken = payload.refreshToken
        })

        builder.addMatcher(userApi.endpoints.login.matchFulfilled, (state, { payload }) => {
            state.user = payload.user
            state.accessToken = payload.accessToken
            state.refreshToken = payload.refreshToken
        })

        builder.addMatcher(userApi.endpoints.logout.matchFulfilled, (state) => {
            state.user = null
            state.accessToken = ''
            state.refreshToken = ''
        })
    }
})

export const { selectUser, selectAccessToken, selectRefreshToken } = userSlice.selectors

export default userSlice.reducer
