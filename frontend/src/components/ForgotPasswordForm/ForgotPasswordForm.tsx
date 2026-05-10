'use client'

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { IForgotPasswordForm } from '@/src/interfaces/auth'
import FormFieldContainer from '@/src/shared/FormFieldContainer/FormFieldsContainer'
import Loader from '@/src/shared/Loader/Loader'
import SubmitButton from '@/src/shared/SubmitButton/SubmitButton'
import { useForgotMutation } from '@/src/store/user/userApi'
import { forgotPasswordSchema } from '@/src/schemas/forgotPasswordFormSchema'

export default function ForgotPasswordForm() {
    const [forgotPassword] = useForgotMutation()

    const defaultValues: IForgotPasswordForm = {
        email: ''
    }

    const methods = useForm<IForgotPasswordForm>({
        defaultValues,
        resolver: zodResolver(forgotPasswordSchema)
    })

    const { handleSubmit, reset } = methods

    const submitForm: SubmitHandler<IForgotPasswordForm> = async (data) => {
        try {
            const res = await forgotPassword(data).unwrap()

            if (res) {
                toast.success('Check your email to continue.', {
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
                Forgot password?
            </h2>
            <FormProvider {...methods}>
                <form className='w-1/3 mx-auto my-0' onSubmit={handleSubmit(submitForm)}>
                    <FormFieldContainer
                        label={'Email'}
                        placeholder={'Enter your email'}
                        type='email'
                        fieldName={'email'}
                    />
                    <SubmitButton textContent='Submit'>
                        <Loader width='28' height='28' />
                    </SubmitButton>
                </form>
            </FormProvider>
        </div>
    )
}

