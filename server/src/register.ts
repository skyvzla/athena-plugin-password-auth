import * as Athena from "@AthenaServer/api";
import * as alt from "alt-server";
import config from "../../shared/config";
import { PasswordAuthEvents } from "../../shared/events";
import encrypt from "./encrypt";
import MailService from "./email"
import { t } from "../../locale";
import { RegisterForm } from "../../shared/interfaces"

interface iRegisterVerify {
    email: string,
    code: string,
    attempts: number
}

const subject = t('mail.register.subject')
const text = t('mail.register.text')
const RegisterVerify: Map<number, iRegisterVerify> = new Map()

async function register(player: alt.Player, account: RegisterForm) {
    const accountData = {
        username: account.username,
        password: encrypt(account.password),
    }
    if (config.emailVerify) {
        const token = RegisterVerify.get(player.id)
        if (!token) {
            Athena.webview.emit(player, PasswordAuthEvents.webview.register, false, 'errors.incorrectCode')
            return;
        }
        if (token.email !== account.email || token.code !== account.verifyCode) {
            token.attempts++;
            Athena.webview.emit(player, PasswordAuthEvents.webview.register, false, 'errors.incorrectCode')
            if (token.attempts >= 3) {
                RegisterVerify.delete(player.id)
            }
            return;
        }

        RegisterVerify.delete(player.id)
        accountData['emial'] = account.email;
    }

    if (await Athena.systems.account.getAccount('username', account.username)) {
        Athena.webview.emit(player, PasswordAuthEvents.webview.register, false, 'errors.usernameExists')
        return;
    }

    await Athena.systems.account.create(player, accountData)
    Athena.webview.emit(player, PasswordAuthEvents.webview.register, true)
}

async function sendRegisterCode(player: alt.Player, email: string) {
    if (await Athena.systems.account.getAccount('email', email)) {
        Athena.webview.emit(player, PasswordAuthEvents.webview.sendRegisterCode, false, 'errors.emailUsed')
        return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString()
    RegisterVerify.set(player.id, { email, code, attempts: 0 })

    const result = await MailService.send(email, subject, text.replace('{code}', code))
    Athena.webview.emit(player, PasswordAuthEvents.webview.sendRegisterCode, result)
}

export function init() {
    alt.onClient(PasswordAuthEvents.server.register, register)

    if (config.emailVerify) {
        alt.onClient(PasswordAuthEvents.server.sendRegisterCode, sendRegisterCode)
    }
}