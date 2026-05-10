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
        forgot: builder.mutation({
            query: (data) => ({
                url: '/user/forgot',
                body: data,
                method: 'POST'
            })
        }),
        reset: builder.mutation({
            query: ({ code, ...data }) => ({
                url: `/user/reset/?code=${code}`,
                body: data,
                method: 'PATCH'
            })
        })
    })
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useForgotMutation,
    useResetMutation
} = userApi

