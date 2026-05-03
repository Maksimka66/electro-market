import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api'
    }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: '/user/register',
                method: 'POST',
                body: data
            })
        }),
        login: builder.mutation({
            query: (data) => ({
                url: '/user/login',
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/user/logout',
                method: 'POST'
            })
        }),
        reset: builder.mutation({
            query: () => ({
                url: '/user/reset',
                method: 'PATCH'
            })
        })
    })
})

export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useResetMutation } =
    userApi

