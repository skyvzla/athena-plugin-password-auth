import * as Athena from "@AthenaServer/api";
import * as Forget from "./src/forget";
import * as Login from "./src/login";
import * as Register from "./src/register";

const PLUGIN_NAME = 'Password Authentication';

Athena.systems.plugins.registerPlugin(PLUGIN_NAME, () => {
    Login.init()
    Register.init()
    Forget.init()
})