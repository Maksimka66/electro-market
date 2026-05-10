'use client'

import { useSearchParams } from 'next/navigation'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { IResetPasswordForm } from '@/src/interfaces/auth'
import FormFieldContainer from '@/src/shared/FormFieldContainer/FormFieldsContainer'
import Loader from '@/src/shared/Loader/Loader'
import SubmitButton from '@/src/shared/SubmitButton/SubmitButton'
import { resetPasswordSchema } from '@/src/schemas/resetPasswordFormSchema'
import { useResetMutation } from '@/src/store/user/userApi'

export default function ResetPasswordForm() {
    const [resetPassword] = useResetMutation()

    const searchParams = useSearchParams()

    const code = searchParams.get('code')

    const defaultValues: IResetPasswordForm = {
        newPassword: '',
        confirmNewPassword: ''
    }

    const methods = useForm<IResetPasswordForm>({
        defaultValues,
        resolver: zodResolver(resetPasswordSchema)
    })

    const { handleSubmit, reset } = methods

    const submitForm: SubmitHandler<IResetPasswordForm> = async (data) => {
        try {
            const res = await resetPassword({ code, ...data }).unwrap()

            if (res) {
                toast.success('You`ve changed your password!', {
                    style: {
                        background: '#00FF7F',
                        color: '#000000'
                    }
                })

                reset()
            }
        } catch (e) {
            console.log(e)

            toast.error('Something`s wrong, please try again later!', {
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
                Reset password
            </h2>
            <FormProvider {...methods}>
                <form className='w-1/3 mx-auto my-0' onSubmit={handleSubmit(submitForm)}>
                    <FormFieldContainer
                        label={'New password'}
                        placeholder={'Enter new password'}
                        type='password'
                        fieldName={'newPassword'}
                    />
                    <FormFieldContainer
                        label={'Confirm new password'}
                        placeholder={'Confirm new password'}
                        type='password'
                        fieldName={'confirmNewPassword'}
                    />
                    <SubmitButton textContent='Change password'>
                        <Loader width='28' height='28' />
                    </SubmitButton>
                </form>
            </FormProvider>
        </div>
    )
}

