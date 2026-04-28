import { z } from 'zod'

const passwordValidationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

export const loginSchema = z
    .object({
        email: z.email('Email is not valid').trim(),
        password: z.string().trim().min(8, { message: 'The password must be at least 8 symbols' }),
        rememberMe: z.boolean().optional()
    })
    .refine((val) => passwordValidationRegex.test(val.password), {
        message:
            'The password must contain at least one number, one uppercase letter and one lowercase letter',
        path: ['password']
    })

