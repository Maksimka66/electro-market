import { ReactNode } from 'react'
import { FieldErrors } from 'react-hook-form'

export interface IFormFieldsContainerProps {
    label: string
    fieldName: string
    placeholder: string
}

export interface ICheckboxProps {
    label: ReactNode
}

export interface IErrorMessageProps {
    errors: FieldErrors
    fieldName: string
}

