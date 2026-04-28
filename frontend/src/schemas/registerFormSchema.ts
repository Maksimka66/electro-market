import { z } from 'zod'

const passwordValidationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

export const registerSchema = z
    .object({
        username: z.string().nonempty('Username is required').trim(),
        email: z.email('Email is not valid').nonempty('Username is required').trim(),
        password: z.string().trim().min(8, { message: 'The password must be at least 8 symbols' }),
        confirmPassword: z
            .string()
            .trim()
            .min(8, { message: 'The password must be at least 8 symbols' }),
        policy: z.boolean()
    })
    .refine((val) => passwordValidationRegex.test(val.password), {
        message:
            'The password must contain at least one number, one uppercase letter and one lowercase letter',
        path: ['password']
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword']
    })
    .refine((data) => data.policy === true, {
        message: 'You should agree to our terms and conditions first',
        path: ['policy']
    })

