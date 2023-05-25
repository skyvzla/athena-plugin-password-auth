export const PasswordAuthEvents = {
    client: {
        showPage: 'passwordAuth:client:showPage',
        login: 'passwordAuth:client:loginResult',
        register: 'passwordAuth:client:registerResult',
        sendRegisterCode: 'passwordAuth:client:sendRegisterCodeResult',
    },
    server: {
        usernameLogin: 'passwordAuth:server:usernameLogin',
        emailLogin: 'passwordAuth:server:emailLogin',
        register: 'passwordAuth:server:register',
        sendRegisterCode: 'passwordAuth:server:sendRegisterCode'
    },
    webview: {
        login: 'passwordAuth:webview:loginError',
        register: 'passwordAuth:webview:register'
    }
}