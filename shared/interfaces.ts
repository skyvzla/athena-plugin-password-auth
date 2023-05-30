import { Account } from "@AthenaShared/interfaces/iAccount"

export type AccountType = 'username' | 'email'

export interface LoginForm {
    account: string,
    password: string
    type: AccountType,
}

export interface RegisterForm {
    email?: string,
    verifyCode?: string,
    username: string,
    password: string,
    confirmPassword: string,
}

export interface ForgetForm {
    account: string,
    verifyCode: string,
    password: string,
    confirmPassword: string,
    type: AccountType,
}

export interface iAccount extends Account {
    username: string,
    password: string,
}