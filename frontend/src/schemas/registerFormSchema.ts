import { z } from 'zod'

const passwordValidationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

export const registerSchema = z
    .object({
        username: z
            .string()
            .nonempty('Username should not be empty')
            .trim()
            .min(5, { message: 'Username should be between 5 and 50 symbols' })
            .max(50, { message: 'Username should be between 5 and 50 symbols' }),
        email: z.email('Invalid email').nonempty('Email should not be empty').trim(),
        password: z
            .string()
            .trim()
            .min(8, { message: 'Password must be between 8 and 30' })
            .max(30, { message: 'Password must be between 8 and 30' }),
        confirmPassword: z
            .string()
            .trim()
            .min(8, { message: 'Password must be between 8 and 30' })
            .max(30, { message: 'Password must be between 8 and 30' }),
        policy: z.boolean()
    })
    .refine((val) => passwordValidationRegex.test(val.password), {
        message:
            'Password must contain at least one uppercase letter, one lowercase letter, and one number',
        path: ['password']
    })
    .refine((val) => passwordValidationRegex.test(val.password), {
        message:
            'Password must contain at least one uppercase letter, one lowercase letter, and one number',
        path: ['confirmNewPassword']
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords must be same',
        path: ['confirmPassword']
    })
    .refine((data) => data.policy === true, {
        message: 'You should agree to our terms and conditions first',
        path: ['policy']
    })

