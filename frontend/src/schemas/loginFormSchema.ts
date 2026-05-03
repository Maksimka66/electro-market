import { z } from 'zod'

const passwordValidationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

export const loginSchema = z
    .object({
        email: z.email('Invalid email').trim(),
        password: z
            .string()
            .trim()
            .min(8, { message: 'Password must be between 8 and 30' })
            .max(30, { message: 'Password must be between 8 and 30' }),
        rememberMe: z.boolean().optional()
    })
    .refine((val) => passwordValidationRegex.test(val.password), {
        message:
            'Password must contain at least one uppercase letter, one lowercase letter, and one number',
        path: ['password']
    })

