export interface IRegisterForm {
    username: string
    email: string
    password: string
    confirmPassword: string
    policy: boolean
}

export interface ILoginForm {
    email: string
    password: string
}

export interface IForgotPasswordForm {
    email: string
}

export interface IResetPasswordForm {
    newPassword: string
    confirmNewPassword: string
}

