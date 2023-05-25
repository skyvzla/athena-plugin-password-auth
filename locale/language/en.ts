export default {
    fields: {
        email: 'Email',
        username: 'Username',
        password: 'Password',
    },
    titles: {
        forget: 'Forget Password',
        register: 'Register',
        login: 'Login',
    },
    buttons: {
        forget: 'Forget Password',
        register: 'Register',
        login: 'Login',
    },
    validate: {
        email: {
            required: 'Please input email',
            format: 'Please input correct email',
        },
        username: {
            required: 'Please input username',
            min: 'Username length must be greater than or equal to 4',
        },
        password: {
            required: 'Please input password',
            min: 'Password length must be greater than or equal to 6',
        },
    },
    errors: {
        notExists: 'Account not exists',
        incorrectPassword: 'Incorrect password',
        incorrectCode: 'Incorrect code',
        emailUsed: 'Email has been used',
        usernameExists: 'Username has been used',
        logged: 'Account has been logged in',
    },
    login: {
        fields: {
            remember: 'Remember Me',
            account: 'Username / Email',
        },
        validate: {
            account: {
                required: 'Please input username / email',
                min: 'Account length must be greater than or equal to 4',
            }
        }
    },
    register: {
        fields: {
            confirmPassword: 'Confirm Password',
        },
        validate: {
            confirmPassword: {
                required: 'Please input confirm password',
                notMatch: 'Confirm password and password do not match',
            }
        }
    },
    mail: {
        register: {
            subject: 'Register Code',
            text: 'Your register code is {code}'
        },
        forget: {
            subject: 'Forget Password Code',
            text: 'Your forget password code is {code}'
        }
    }
}