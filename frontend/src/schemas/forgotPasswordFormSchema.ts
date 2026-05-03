import { z } from 'zod'

export const forgotPasswordSchema = z.object({
    email: z.email('Email is not valid').trim()
})

