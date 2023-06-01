export default {
    // System and UI language
    language: 'en',
    // If value it is true, please fill in the relevant information of maiService
    emailVerify: false,
    // Email service, see https://nodemailer.com/
    mailService: {
        host: '',
        port: 587,
        from: { // sender
            name: '',
            address: ''
        },
        user: '', // login account
        password: ''
    }
}