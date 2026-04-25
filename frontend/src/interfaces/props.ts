import { FieldValues, UseFormRegister } from 'react-hook-form'

export interface IFormFieldsContainerProps {
    label: string
    fieldName: string
    placeholder: string
    register: UseFormRegister<FieldValues>
}

