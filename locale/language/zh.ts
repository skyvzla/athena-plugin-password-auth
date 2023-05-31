export default {
    fields: {
        email: '邮箱',
        username: '账号',
        password: '密码',
        verifyCode: '验证码',
        account: '账号 / 邮箱',
        confirmPassword: '确认密码',
    },
    titles: {
        forget: '密码找回',
        register: '玩家注册',
        login: '玩家登录',
    },
    buttons: {
        reset: '重置密码',
        forget: '忘记密码',
        register: '注册账号',
        login: '登录',
        getCode: '获取验证码',
        resendCode: '重新发送({seconds})',
    },
    validate: {
        email: {
            required: '请输入邮箱',
            format: '邮箱格式不正确',
        },
        username: {
            required: '请输入账号',
            min: '账号长度必须大于等于4',
        },
        password: {
            required: '请输入密码',
            min: '密码长度必须大于等于6',
        },
        verifyCode: {
            required: '请输入验证码',
        },
        account: {
            required: '请输入账号 / 邮箱',
            min: '账号 / 邮箱长度必须大于等于4',
        },
        confirmPassword: {
            required: '请输入确认密码',
            notMatch: '确认密码和密码不匹配',
        }
    },
    success: {
        register: '账号注册成功',
        forget: '密码重置成功',
    },
    errors: {
        notExists: '账号未注册',
        incorrectPassword: '密码错误',
        incorrectCode: '验证码错误',
        emailUsed: '邮箱已绑定账号',
        usernameExists: '账号已被注册',
        logged: '账号已经在其他设备登录',
        noEmail: '该账号未绑定邮箱，请联系服务器管理员'
    },
    login: {
        fields: {
            remember: '记住账号',
        }
    },
    mail: {
        message: {
            success: '验证码发送成功',
            error: '验证码发送失败，请稍后再试'
        },
        register: {
            subject: '注册新用户',
            text: '你的注册验证是 {code}'
        },
        forget: {
            subject: '找回密码',
            text: '你正在找回账号密码，你的验证码为 {code}<br/> 账号信息（账号: {username}, 邮箱: {email}）'
        }
    }
}