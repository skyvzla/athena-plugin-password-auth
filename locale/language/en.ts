export default {
    fields: {
        email: 'Email',
        username: 'Username',
        password: 'Password',
        verifyCode: 'Verify Code',
        account: 'Username / Email',
        confirmPassword: 'Confirm Password',
    },
    titles: {
        forget: 'Reset Password',
        register: 'Player Register',
        login: 'Player Login',
    },
    buttons: {
        reset: 'Reset Password',
        forget: 'Forget Password?',
        register: 'Register',
        login: 'Login',
        getCode: 'Get Code',
        resendCode: 'Resend Code({seconds})',
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
        verifyCode: {
            required: 'Please input verify code',
        },
        account: {
            required: 'Please input username / email',
            min: 'Account length must be greater than or equal to 4',
        },
        confirmPassword: {
            required: 'Please input confirm password',
            notMatch: 'Confirm password and password do not match',
        }
    },
    success: {
        register: 'Register successfully',
        forget: 'Reset password successfully',
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
        }
    },
    mail: {
        message: {
            success: 'Get the verification code successfully',
            error: 'Failed to get verification code, please try again'
        },
        register: {
            subject: 'Register Code',
            text: 'Your register code is {code}'
        },
        forget: {
            subject: 'Forget Password Code',
            text: 'You are resetting your account password, your verification code is {code}<br/> username: {username}, email: {email}'
        }
    }
}