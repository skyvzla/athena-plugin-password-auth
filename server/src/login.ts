import * as Athena from "@AthenaServer/api";
import * as alt from "alt-server";
import { PasswordAuthEvents } from "../../shared/events";
import { LoginForm, iAccount } from "../../shared/interfaces";

async function login(player: alt.Player, data: LoginForm) {
    const account = await Athena.systems.account.getAccount(data.type, data.account) as iAccount | undefined

    if (!account) {
        Athena.webview.emit(player, PasswordAuthEvents.webview.login, false, 'errors.notExists')
        return;
    }

    if (account.banned) {
        player.kick(account.reason || 'You are banned from this server')
        return;
    }

    if (Athena.utility.hash.testPassword(data.password, account.password)) {
        Athena.webview.emit(player, PasswordAuthEvents.webview.login, false, 'errors.incorrectPassword')
        return;
    }

    const loggedInPlayer = Athena.getters.player.byDatabaseID(account._id.toString());
    if (typeof loggedInPlayer !== 'undefined') {
        Athena.webview.emit(player, PasswordAuthEvents.webview.login, false, 'errors.logged')
        return;
    }

    await Athena.player.set.account(player, account)
    Athena.webview.emit(player, PasswordAuthEvents.webview.login, true)
    Athena.systems.loginFlow.next(player)
}

function showPage(player: alt.Player): void {
    player.emit(PasswordAuthEvents.client.showPage)
}

export function init() {
    alt.onClient(PasswordAuthEvents.server.login, login);
    Athena.systems.loginFlow.add('authentication', 1, showPage);
}