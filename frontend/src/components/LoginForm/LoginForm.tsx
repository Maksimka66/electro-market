import { SubmitHandler, useForm } from 'react-hook-form'
import { ILoginForm } from '@/src/interfaces/auth'
import FormFieldContainer from '@/src/shared/FormFieldContainer/FormFieldsContainer'

export default function LoginForm() {
    const defaultValues = {
        email: '',
        password: ''
    }

    const { register, handleSubmit } = useForm<ILoginForm>({ defaultValues })

    const submitForm: SubmitHandler<ILoginForm> = (data) => {}

    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <FormFieldContainer
                label={'Password'}
                placeholder={'Enter your password'}
                fieldName={'password'}
                register={register}
            />
            <FormFieldContainer
                label={'Confirm password'}
                placeholder={'Confirm your password'}
                fieldName={'confirmPassword'}
                register={register}
            />
        </form>
    )
}

