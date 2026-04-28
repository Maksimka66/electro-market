'use client'

import Link from 'next/link'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { ILoginForm } from '@/src/interfaces/auth'
import FormFieldContainer from '@/src/shared/FormFieldContainer/FormFieldsContainer'
import Checkbox from '@/src/shared/Checkbox/Checkbox'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/src/schemas/loginFormSchema'

export default function LoginForm() {
    const defaultValues = {
        email: '',
        password: ''
    }

    const methods = useForm<ILoginForm>({
        defaultValues,
        resolver: zodResolver(loginSchema)
    })

    const { handleSubmit } = methods

    const submitForm: SubmitHandler<ILoginForm> = (data) => {}

    return (
        <FormProvider {...methods}>
            <form className='w-1/3 mx-auto my-0' onSubmit={handleSubmit(submitForm)}>
                <h2 className='font-(family-name:--font-main-poppins) text-[40px] mb-6'>Sign in</h2>
                <div className='flex gap-1 mb-8'>
                    <span className='font-(family-name:--font-second-inter) font-normal text-4 text-[#141718] leading-6.5'>
                        Don’t have an account yet?
                    </span>
                    <Link
                        className='font-(family-name:--font-second-inter) font-normal text-4 text-green-500 leading-6.5'
                        href='/auth/register'
                    >
                        Sign up
                    </Link>
                </div>
                <FormFieldContainer
                    label={'Email'}
                    placeholder={'Enter your email'}
                    fieldName={'email'}
                />
                <FormFieldContainer
                    label={'Password'}
                    placeholder={'Enter your password'}
                    fieldName={'password'}
                />
                <div className='flex justify-between'>
                    <Checkbox label={<span>Remember me</span>} />
                    <Link className='text-[#141718] font-semibold' href='/auth/forgot-password'>
                        Forgot password?
                    </Link>
                </div>
                <button className='w-full py-2.5 rounded-lg bg-[#141718] font-(family-name:--font-second-inter) font-medium leading-7 tracking-[-0.4px] text-4 text-[#ffffff] cursor-pointer'>
                    Sign in
                </button>
            </form>
        </FormProvider>
    )
}

