# Athena Plugin - Password Auth

A password login service compatible with `5.0.0` of the [Athena Framework](https://athenaframework.com/).

* Email binding and verification.
* Support password reset.

## Installation

0. Add a `disable` file to the `src/core/plugins/discord-auth` plugin to disable it.
1. Open a command prompt in your main Athena Directory.
2. Navigate to the plugins folder.

```ts
cd src/core/plugins
```

3. Copy the command below.

**SSH**

```
git clone git@github.com:skyvzla/athena-plugin-password-auth.git password-auth
```

**HTTPS**
```
git clone https://github.com/skyvzla/athena-plugin-password-auth.git password-auth
```

4. `npm install element-plus nodemailer`
5. Modify the configuration file `shared/config.ts`
6. Start the server in windows or linux mode


## Related Links

 * [nodemailer](https://github.com/nodemailer/nodemailer)
 * [ElementPlus](https://github.com/element-plus/element-plus)
 * Thanks to Noel-Schmidt for the [UI Pack](https://github.com/Noel-Schmidt/gtarp-clientui)