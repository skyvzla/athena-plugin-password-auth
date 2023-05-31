import * as alt from "alt-client";
import * as AthenaClient from '@AthenaClient/api';
import { PasswordAuthEvents } from '../shared/events';

const PageName = 'PasswordAuth'
let Page: AthenaClient.webview.Page

async function showPage() {
    Page = new AthenaClient.webview.Page({
        name: PageName,
        callbacks: {
            onReady() { },
            onClose() { }
        },
        options: {
            disableEscapeKey: true,
            onOpen: {
                focus: true,
                showCursor: true,
                hideOverlays: true,
            },
            onClose: {
                hideCursor: true,
                unfocus: true,
                showOverlays: true,
            },
        },
    })

    AthenaClient.webview.focus();
    AthenaClient.webview.showCursor(true);
    await AthenaClient.webview.openPages([PageName], true, Page.close.bind(Page));
}

AthenaClient.webview.on(PasswordAuthEvents.client.closePage, () => {
    Page.close(true)
})
alt.onServer(PasswordAuthEvents.client.showPage, showPage)