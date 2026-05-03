import { createSlice } from '@reduxjs/toolkit'
import { userApi } from './userApi'

const initialState = {
    email: '',
    accessToken: '',
    refreshToken: ''
}

export const userSlice = createSlice({
    name: 'userData',
    initialState,
    selectors: {
        selectEmail: (state) => state.email,
        selectAccessToken: (state) => state.accessToken,
        selectRefreshToken: (state) => state.refreshToken
    },
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(userApi.endpoints.register.matchFulfilled, (state, { payload }) => {
            state.email = payload.createdUser.email
            state.accessToken = payload.accessToken
            state.refreshToken = payload.refreshToken
        })

        builder.addMatcher(userApi.endpoints.login.matchFulfilled, (state, { payload }) => {
            state.email = payload.user.email
            state.accessToken = payload.accessToken
            state.refreshToken = payload.refreshToken
        })

        builder.addMatcher(userApi.endpoints.logout.matchFulfilled, (state) => {
            state.email = ''
            state.accessToken = ''
            state.refreshToken = ''
        })

        // builder.addMatcher(userApi.endpoints.reset.matchFulfilled, (state, { payload }) => {
        //     state.user.password = payload.password
        // })
    }
})

export const { selectEmail, selectAccessToken, selectRefreshToken } = userSlice.selectors

export default userSlice.reducer

