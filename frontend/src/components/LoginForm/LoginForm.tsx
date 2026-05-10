'use client'

import Link from 'next/link'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ILoginForm } from '@/src/interfaces/auth'
import FormFieldContainer from '@/src/shared/FormFieldContainer/FormFieldsContainer'
import Checkbox from '@/src/shared/Checkbox/Checkbox'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/src/schemas/loginFormSchema'
import { useLoginMutation } from '@/src/store/user/userApi'
import Loader from '@/src/shared/Loader/Loader'
import SubmitButton from '@/src/shared/SubmitButton/SubmitButton'

export default function LoginForm() {
    const [loginUser] = useLoginMutation()

    const defaultValues: ILoginForm = {
        email: '',
        password: ''
    }

    const methods = useForm<ILoginForm>({
        defaultValues,
        resolver: zodResolver(loginSchema)
    })

    const { handleSubmit, reset } = methods

    const submitForm: SubmitHandler<ILoginForm> = async (data) => {
        try {
            const res = await loginUser(data).unwrap()

            if (res) {
                toast.success('Successful login!', {
                    style: {
                        background: '#00FF7F',
                        color: '#000000'
                    }
                })

                reset()
            }
        } catch (e) {
            console.log(e)

            toast.error('Check your login and password, then try again!', {
                style: {
                    background: '#B00000',
                    color: '#ffffff'
                }
            })
        }
    }

    return (
        <div className='w-full'>
            <h2 className='font-(family-name:--font-main-poppins) text-[40px] mx-auto mb-8 w-1/3'>
                Sign in
            </h2>
            <FormProvider {...methods}>
                <form className='w-1/3 mx-auto my-0' onSubmit={handleSubmit(submitForm)}>
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
                        type='email'
                        fieldName={'email'}
                    />
                    <FormFieldContainer
                        label={'Password'}
                        placeholder={'Enter your password'}
                        type='password'
                        fieldName={'password'}
                    />
                    <div className='mb-8 flex justify-between'>
                        <Checkbox label={<span>Remember me</span>} />
                        <Link className='text-[#141718] font-semibold' href='/auth/forgot-password'>
                            Forgot password?
                        </Link>
                    </div>
                    <SubmitButton textContent='Sign in'>
                        <Loader width='28' height='28' />
                    </SubmitButton>
                </form>
            </FormProvider>
        </div>
    )
}

