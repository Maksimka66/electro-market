import { z } from 'zod'

const passwordValidationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

export const resetPasswordSchema = z
    .object({
        newPassword: z
            .string()
            .trim()
            .min(8, { message: 'Password must be between 8 and 30' })
            .max(30, { message: 'Password must be between 8 and 30' }),
        confirmNewPassword: z
            .string()
            .trim()
            .min(8, { message: 'Password must be between 8 and 30' })
            .max(30, { message: 'Password must be between 8 and 30' })
    })
    .refine((val) => passwordValidationRegex.test(val.newPassword), {
        message:
            'Password must contain at least one uppercase letter, one lowercase letter, and one number',
        path: ['newPassword']
    })
    .refine((val) => passwordValidationRegex.test(val.newPassword), {
        message:
            'Password must contain at least one uppercase letter, one lowercase letter, and one number',
        path: ['confirmNewPassword']
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: "Passwords don't match",
        path: ['confirmNewPassword']
    })

