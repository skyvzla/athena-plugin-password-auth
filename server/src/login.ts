import * as Athena from "@AthenaServer/api";
import * as alt from "alt-server";
import { PasswordAuthEvents } from "../../shared/events";
import { EmailAccount, UsernameAccount, iAccount } from "../../shared/interfaces";
import encrypt from "./encrypt";

async function usernameLogin(player: alt.Player, account: UsernameAccount) {
    const accountData = await Athena.systems.account.getAccount('username', account.username) as iAccount | undefined
    login(account.password, accountData, player)
}

async function emailLogin(player: alt.Player, account: EmailAccount) {
    const accountData = await Athena.systems.account.getAccount('email', account.email) as iAccount | undefined
    login(account.password, accountData, player)
}

async function login(password: string, account: iAccount | undefined, player: alt.Player) {
    if (!account) {
        alt.emitClient(player, PasswordAuthEvents.client.login, false, 'errors.notExists')
        return;
    }

    if (account.password !== encrypt(password)) {
        alt.emitClient(player, PasswordAuthEvents.client.login, false, 'errors.incorrectPassword')
        return;
    }

    const loggedInPlayer = Athena.getters.player.byDatabaseID(account._id.toString());
    if (typeof loggedInPlayer !== 'undefined') {
        alt.emitClient(player, PasswordAuthEvents.client.login, false, 'errors.logged')
        return;
    }

    await Athena.player.set.account(player, account)
    alt.emitClient(player, PasswordAuthEvents.client.login, true)
    Athena.systems.loginFlow.next(player)
}

function showPage(player: alt.Player): void {
    player.emit(PasswordAuthEvents.client.showPage)
}

export function init() {
    alt.onClient(PasswordAuthEvents.server.usernameLogin, usernameLogin)
    alt.onClient(PasswordAuthEvents.server.emailLogin, emailLogin)

    Athena.systems.loginFlow.add('authentication', 1, showPage);
}