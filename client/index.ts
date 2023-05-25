import * as alt from "alt-client";
import * as AthenaClient from '@AthenaClient/api';
import { PasswordAuthEvents } from '../shared/events';

const PageName = 'PasswordAuth'
let Page: AthenaClient.webview.Page

async function showPage() {
    Page = new AthenaClient.webview.Page({
        name: PageName,
        callbacks: {
            onReady: async () => {
                alt.log('Password Auth Page Ready')
            },
            onClose: async () => {
                alt.log('Password Auth Page Closed')
            }
        },
        options: {
            onOpen: {
                focus: true,
                hideHud: true,
                hideOverlays: true,
                setIsMenuOpenToTrue: true,
                showCursor: true,
                disableControls: 'all',
                disablePauseMenu: true,
            },
            onClose: {
                hideCursor: true,
                showHud: true,
                showOverlays: true,
                unfocus: true,
                setIsMenuOpenToFalse: true,
                enableControls: true,
                enablePauseMenu: true,
            },
        },
    })

    Page.open()
}

alt.onServer(PasswordAuthEvents.client.showPage, showPage)
alt.onServer(PasswordAuthEvents.client.login, (state: boolean, error: string) => {
    if (state) {
        Page.close(true)
    } else {
        AthenaClient.webview.emit(PasswordAuthEvents.webview.login, error)
    }
})

alt.onServer(PasswordAuthEvents.client.register, (state: boolean, error: string) => {
    AthenaClient.webview.emit(PasswordAuthEvents.webview.register, state, error)
})