'use client'

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IResetPasswordForm } from '@/src/interfaces/auth'
import FormFieldContainer from '@/src/shared/FormFieldContainer/FormFieldsContainer'
import Loader from '@/src/shared/Loader/Loader'
import SubmitButton from '@/src/shared/SubmitButton/SubmitButton'
import { resetPasswordSchema } from '@/src/schemas/resetPasswordFormSchema'

export default function ResetPasswordForm() {
    const defaultValues: IResetPasswordForm = {
        newPassword: '',
        confirmNewPassword: ''
    }

    const methods = useForm<IResetPasswordForm>({
        defaultValues,
        resolver: zodResolver(resetPasswordSchema)
    })

    const { handleSubmit } = methods

    const submitForm: SubmitHandler<IResetPasswordForm> = async (data) => {
        try {
            console.log(data)
        } catch (e) {
            console.log(e)
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

