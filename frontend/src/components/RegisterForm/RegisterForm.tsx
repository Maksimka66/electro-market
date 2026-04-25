import { SubmitHandler, useForm } from 'react-hook-form'
import { IRegisterForm } from '@/src/interfaces/auth'
import FormFieldContainer from '@/src/shared/FormFieldContainer/FormFieldsContainer'

export default function RegisterForm() {
    const defaultValues = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        policy: false
    }

    const { register, handleSubmit } = useForm<IRegisterForm>({ defaultValues })

    const submitForm: SubmitHandler<IRegisterForm> = (data) => {}

    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <FormFieldContainer
                label={'Username'}
                placeholder={'Enter your username'}
                fieldName={'username'}
                register={register}
            />
            <FormFieldContainer
                label={'Email'}
                placeholder={'Enter your email'}
                fieldName={'email'}
                register={register}
            />
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

