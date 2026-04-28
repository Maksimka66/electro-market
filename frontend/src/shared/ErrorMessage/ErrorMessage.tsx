import { IErrorMessageProps } from '@/src/interfaces/props'

export default function ErrorMessage({ errors, fieldName }: IErrorMessageProps) {
    return (
        errors[fieldName] && (
            <span className='absolute -bottom-6 font-(family-name:--font-second-inter) font-normal text-3 text-[#e91212]'>
                {errors[fieldName].message}
            </span>
        )
    )
}

