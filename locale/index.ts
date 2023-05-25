import locales from "./language"
import config from "../shared/config"

export function t(keyPath: string): string {
    let keys = keyPath.split('.')
    let value = locales[config.language]

    for (let i = 0; i < keys.length; i++) {
        let key = keys[i]
        if (value[key]) {
            value = value[key]
        } else {
            return keyPath
        }
    }

    return value as unknown as string
}