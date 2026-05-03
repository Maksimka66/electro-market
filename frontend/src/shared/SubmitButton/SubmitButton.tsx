import { useFormContext } from 'react-hook-form'
import { ISubmitButtonProps } from '@/src/interfaces/props'

export default function SubmitButton({ textContent, children }: ISubmitButtonProps) {
    const {
        formState: { isSubmitting }
    } = useFormContext()

    return (
        <button
            className='flex justify-center items-center gap-2 w-full py-2.5 rounded-lg bg-[#141718] font-(family-name:--font-second-inter) font-medium leading-7 tracking-[-0.4px] text-4 text-[#ffffff] cursor-pointer disabled:bg-[#6e6c6c] disabled:text-[#000000]'
            disabled={isSubmitting}
        >
            {textContent}
            {isSubmitting && children}
        </button>
    )
}

