import { useId } from 'react'
import { IFormFieldsContainerProps } from '@/src/interfaces/props'

export default function FormFieldContainer({
    label,
    fieldName,
    placeholder,
    register
}: IFormFieldsContainerProps) {
    const id = useId()

    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input id={id} type='text' placeholder={placeholder} {...register(fieldName)} />
        </div>
    )
}

