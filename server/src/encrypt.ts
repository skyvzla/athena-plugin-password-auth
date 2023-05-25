import crypto from "crypto"
import config from "../../shared/config";

/**
 * 密码md5加密
 * @param password 密码
 */
export default function (password: string) {
    return crypto.createHash('md5')
        .update(password + config.encryptSalt)
        .digest('hex')
        .toLocaleLowerCase()
}