import { ReactNode } from 'react'
import { FieldErrors } from 'react-hook-form'

export interface IReduxProvider {
    children: ReactNode
}

export interface IFormFieldsContainerProps {
    label: string
    fieldName: string
    type: string
    placeholder: string
}

export interface ICheckboxProps {
    label: ReactNode
}

export interface ISubmitButtonProps {
    textContent: string
    children: ReactNode
}

export interface ILoaderProps {
    width: string
    height: string
}

export interface IErrorMessageProps {
    errors: FieldErrors
    fieldName: string
}

