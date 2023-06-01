import * as Athena from "@AthenaServer/api";
import Database from '@stuyk/ezmongodb';
import * as alt from "alt-server";
import { t } from "../../locale";
import config from "../../shared/config";
import { PasswordAuthEvents } from "../../shared/events";
import { AccountType, ForgetForm } from "../../shared/interfaces";
import MailService from "./email";

interface iForgetVerify {
    account: string | number,
    code: string,
    attempts: number
}

const subject = t('mail.forget.subject')
const text = t('mail.forget.text')
const ForgetVerify: Map<number, iForgetVerify> = new Map()

async function forget(player: alt.Player, data: ForgetForm) {
    const accountData = await Athena.systems.account.getAccount(data.type, data.account)
    if (!accountData) {
        Athena.webview.emit(player, PasswordAuthEvents.webview.forget, false, 'errors.notExists')
        return;
    }

    const token = ForgetVerify.get(player.id)

    if (!token) {
        Athena.webview.emit(player, PasswordAuthEvents.webview.forget, false, 'errors.incorrectCode')
        return;
    }

    if (token.account != accountData._id || token.code !== data.verifyCode) {
        token.attempts++;
        Athena.webview.emit(player, PasswordAuthEvents.webview.forget, false, 'errors.incorrectCode')
        if (token.attempts >= 3) {
            ForgetVerify.delete(player.id)
        }
        return;
    }

    ForgetVerify.delete(player.id)

    await Database.updatePartialData(
        accountData._id,
        { password: Athena.utility.hash.hashPassword(data.password) },
        Athena.database.collections.Accounts
    )
    Athena.webview.emit(player, PasswordAuthEvents.webview.forget, true)
}

async function sendCode(player: alt.Player, type: AccountType, account: string) {
    const accountData = await Athena.systems.account.getAccount(type, account)
    if (!accountData) {
        Athena.webview.emit(player, PasswordAuthEvents.webview.sendForgetCode, false, 'errors.notExists')
        return;
    }

    if (!accountData.email) {
        Athena.webview.emit(player, PasswordAuthEvents.webview.sendForgetCode, false, 'errors.noEmail')
        return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString()
    ForgetVerify.set(player.id, {
        account: accountData._id,
        code,
        attempts: 0
    })

    const result = await MailService.send(accountData.email, subject, text.replace('{code}', code))
    Athena.webview.emit(player, PasswordAuthEvents.webview.sendForgetCode, result)
}

export function init() {
    if (config.emailVerify) {
        alt.onClient(PasswordAuthEvents.server.sendForgetCode, sendCode);
        alt.onClient(PasswordAuthEvents.server.forget, forget);
    }
}