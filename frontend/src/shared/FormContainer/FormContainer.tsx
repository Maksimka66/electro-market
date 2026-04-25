import { FormState, useForm } from 'react-hook-form'

export default function FormContainer() {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<FormState>({})

    const onSubmit = (data) => {}

    return <form onSubmit={handleSubmit(onSubmit)}></form>
}

