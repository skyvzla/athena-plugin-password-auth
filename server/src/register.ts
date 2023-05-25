import * as Athena from "@AthenaServer/api";
import * as alt from "alt-server";
import config from "../../shared/config";
import { PasswordAuthEvents } from "../../shared/events";
import encrypt from "./encrypt";
import MailService from "./email"
import { t } from "../../locale";

interface RegisterForm {
    email?: string,
    verifyCode?: string,
    username: string,
    password: string,
    confirmPassword: string,
}

const subject = t('mail.register.subject')
const text = t('mail.register.text')
const RegisterVerify: Map<number, { email: string, code: string, attempts: number }> = new Map()

async function register(player: alt.Player, account: RegisterForm) {
    const accountData = {
        username: account.username,
        password: encrypt(account.password),
    }
    if (config.emailVerify) {
        const token = RegisterVerify[player.id]
        if (!token || token.email !== account.email || token.code !== account.verifyCode) {
            token.attempts++;
            alt.emitClient(player, PasswordAuthEvents.client.register, false, 'errors.incorrectCode')
            if (token.attempts >= 3) {
                delete RegisterVerify[player.id]
            }
            return;
        }
        delete RegisterVerify[player.id]

        if (await Athena.systems.account.getAccount('email', account.email)) {
            alt.emitClient(player, PasswordAuthEvents.client.register, false, 'errors.emailUsed')
            return;
        }
        accountData['emial'] = account.email;
    }

    if (await Athena.systems.account.getAccount('username', account.username)) {
        alt.emitClient(player, PasswordAuthEvents.client.register, false, 'errors.usernameExists')
        return;
    }

    await Athena.systems.account.create(player, accountData)
    alt.emitClient(player, PasswordAuthEvents.client.register, true)
}

async function sendRegisterCode(player: alt.Player, email: string) {
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    RegisterVerify[player.id] = { email, code, attempts: 0 }
    const result = await MailService.send(email, subject, text.replace('{code}', code))
    alt.emitClient(player, PasswordAuthEvents.client.sendRegisterCode, result)
}

export function init() {
    alt.onClient(PasswordAuthEvents.server.register, register)

    if (config.emailVerify) {
        alt.onClient(PasswordAuthEvents.server.sendRegisterCode, sendRegisterCode)
    }
}