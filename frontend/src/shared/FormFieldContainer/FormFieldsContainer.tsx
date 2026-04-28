import { useId } from 'react'
import { useFormContext } from 'react-hook-form'
import { IFormFieldsContainerProps } from '@/src/interfaces/props'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

export default function FormFieldContainer({
    label,
    fieldName,
    placeholder
}: IFormFieldsContainerProps) {
    const {
        register,
        formState: { errors }
    } = useFormContext()

    const id = useId()

    return (
        <div className='relative flex flex-col mb-8'>
            <label
                className='font-(family-name:--font-main-poppins) text-[16px] mb-0.5'
                htmlFor={id}
            >
                {label}
            </label>
            <input
                className='placeholder:font-(family-name:--font-second-inter) placeholder:font-normal placeholder:leading-6.5 placeholder:text-4 placeholder:text-[#6C7275] outline-none'
                id={id}
                type='text'
                placeholder={placeholder}
                {...register(fieldName)}
            />
            <ErrorMessage errors={errors} fieldName={fieldName} />
        </div>
    )
}

