import { Account } from "@AthenaShared/interfaces/iAccount"

interface LoginAccount {
    password: string
}

export interface UsernameAccount extends LoginAccount {
    username: string
}

export interface EmailAccount extends LoginAccount {
    email: string
}

export interface iAccount extends Account {
    username: string,
    password: string,
}