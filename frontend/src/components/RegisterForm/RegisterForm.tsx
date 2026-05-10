'use client'

import Link from 'next/link'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { IRegisterForm } from '@/src/interfaces/auth'
import FormFieldContainer from '@/src/shared/FormFieldContainer/FormFieldsContainer'
import Checkbox from '@/src/shared/Checkbox/Checkbox'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '@/src/schemas/registerFormSchema'
import { useRegisterMutation } from '@/src/store/user/userApi'
import Loader from '@/src/shared/Loader/Loader'
import SubmitButton from '@/src/shared/SubmitButton/SubmitButton'

export default function RegisterForm() {
    const [registerUser] = useRegisterMutation()

    const defaultValues: IRegisterForm = {
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

    const { handleSubmit, reset } = methods

    const submitForm: SubmitHandler<IRegisterForm> = async (data) => {
        try {
            const res = await registerUser(data).unwrap()

            if (res) {
                toast.success('You`re almost done! Check your email to activate your account.', {
                    style: {
                        background: '#00FF7F',
                        color: '#000000'
                    }
                })

                reset()
            }
        } catch (e) {
            console.log(e)

            toast.error('Something wrong, please try again later!', {
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
                Sign up
            </h2>
            <FormProvider {...methods}>
                <form className='w-1/3 mx-auto my-0' onSubmit={handleSubmit(submitForm)}>
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
                        type='text'
                        fieldName={'username'}
                    />
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
                    <FormFieldContainer
                        label={'Confirm password'}
                        placeholder={'Confirm your password'}
                        type='password'
                        fieldName={'confirmPassword'}
                    />
                    <div className='mb-8'>
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
                    </div>
                    <SubmitButton textContent='Sign up'>
                        <Loader width='28' height='28' />
                    </SubmitButton>
                </form>
            </FormProvider>
        </div>
    )
}

