export const PasswordAuthEvents = {
    client: {
        showPage: 'passwordAuth:client:showPage',
        closePage: 'passwordAuth:client:closePage',
    },
    server: {
        login: 'passwordAuth:server:login',
        register: 'passwordAuth:server:register',
        forget: 'passwordAuth:server:forget',
        sendRegisterCode: 'passwordAuth:server:sendRegisterCode',
        sendForgetCode: 'passwordAuth:server:sendForgetCode',
    },
    webview: {
        login: 'passwordAuth:webview:loginResult',
        register: 'passwordAuth:webview:registerResult',
        forget: 'passwordAuth:webview:forgetResult',
        sendRegisterCode: 'passwordAuth:webview:sendRegisterCodeResult',
        sendForgetCode: 'passwordAuth:webview:sendForgetCodeResult',
    }
}