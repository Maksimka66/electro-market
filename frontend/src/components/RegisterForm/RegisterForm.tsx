'use client'

import Link from 'next/link'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { IRegisterForm } from '@/src/interfaces/auth'
import FormFieldContainer from '@/src/shared/FormFieldContainer/FormFieldsContainer'
import Checkbox from '@/src/shared/Checkbox/Checkbox'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '@/src/schemas/registerFormSchema'

export default function RegisterForm() {
    const defaultValues = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        policy: false
    }

    const methods = useForm<IRegisterForm>({
        defaultValues,
        resolver: zodResolver(registerSchema)
    })

    const { handleSubmit } = methods

    const submitForm: SubmitHandler<IRegisterForm> = (data) => {
        console.log(data)
    }

    return (
        <FormProvider {...methods}>
            <form className='w-1/3 mx-auto my-0' onSubmit={handleSubmit(submitForm)}>
                <h2 className='font-(family-name:--font-main-poppins) text-[40px] mb-6'>Sign up</h2>
                <div className='flex gap-1 mb-8'>
                    <span className='font-(family-name:--font-second-inter) font-normal text-4 text-[#6C7275] leading-6.5'>
                        Already have an account?
                    </span>
                    <Link
                        className='font-(family-name:--font-second-inter) font-normal text-4 text-green-500 leading-6.5'
                        href='/auth/login'
                    >
                        Sign in
                    </Link>
                </div>
                <FormFieldContainer
                    label={'Username'}
                    placeholder={'Enter your username'}
                    fieldName={'username'}
                />
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
                <FormFieldContainer
                    label={'Confirm password'}
                    placeholder={'Confirm your password'}
                    fieldName={'confirmPassword'}
                />
                <Checkbox
                    label={
                        <span>
                            I agree with{' '}
                            <Link className='text-[#141718] font-semibold' href=''>
                                Privacy Policy
                            </Link>{' '}
                            and{' '}
                            <Link className='text-[#141718] font-semibold' href=''>
                                Terms of Use
                            </Link>
                        </span>
                    }
                />
                <button className='w-full py-2.5 rounded-lg bg-[#141718] font-(family-name:--font-second-inter) font-medium leading-7 tracking-[-0.4px] text-4 text-[#ffffff] cursor-pointer'>
                    Sign up
                </button>
            </form>
        </FormProvider>
    )
}

