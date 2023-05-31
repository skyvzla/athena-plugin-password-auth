<template>
    <ElForm :model="form" :rules="formRules" ref="formRef" size="large" :disabled="submitting" label-position="top">
        <ElFormItem :label="t('fields.account')" prop="account">
            <ElInput v-model="form.account" :placeholder="t('fields.account')" />
        </ElFormItem>
        <ElFormItem :label="t('fields.password')" prop="password">
            <ElInput v-model="form.password" :placeholder="t('fields.password')" type="password" @keyup.enter="doLogin" />
        </ElFormItem>
    </ElForm>
    <div class="auth-other">
        <div>
            <ElCheckbox :label="t('login.fields.remember')" v-model="remember" :disabled="submitting" />
        </div>
        <div>
            <ElButton v-if="config.emailVerify" type="info" link @click="emits('changePage', 'Forget')"
                :disabled="submitting">
                {{ t('buttons.forget') }}
            </ElButton>
            <ElButton type="info" link @click="emits('changePage', 'Register')" :disabled="submitting">
                {{ t('buttons.register') }}
            </ElButton>
        </div>
    </div>
    <div class="footer">
        <ElButton type="primary" @click="doLogin" size="large" :loading="submitting">
            {{ t('buttons.login') }}
        </ElButton>
    </div>
</template>
<script lang="ts" setup>
import { t } from "@AthenaPlugins/password-auth/locale";
import config from "@AthenaPlugins/password-auth/shared/config";
import { PasswordAuthEvents } from '@AthenaPlugins/password-auth/shared/events';
import { LoginForm } from "@AthenaPlugins/password-auth/shared/interfaces";
import WebViewEvents from '@utility/webViewEvents';
import type { FormInstance, FormRules } from "element-plus";
import { ElButton, ElCheckbox, ElForm, ElFormItem, ElInput, ElNotification } from 'element-plus';
import { reactive, ref } from 'vue';

const submitting = ref(false)
const formRef = ref<FormInstance>()
const remember = ref(localStorage.getItem('remember') === '1')
const form = reactive<LoginForm>({
    account: localStorage.getItem('account') || '',
    password: localStorage.getItem('password') || '',
    type: 'username'
})
const formRules = reactive<FormRules>({
    account: [
        { required: true, message: t('validate.account.required'), trigger: 'blur' },
        { min: 4, message: t('validate.account.min'), trigger: 'blur' },
    ],
    password: [
        { required: true, message: t('validate.password.required'), trigger: 'blur' },
        { min: 6, message: t('validate.password.min'), trigger: 'blur' },
    ],
})

const emits = defineEmits(['changePage'])

function storage() {
    localStorage.setItem('remember', remember.value ? '1' : '0')
    if (remember.value) {
        localStorage.setItem('account', form.account)
        localStorage.setItem('password', form.password)
    } else {
        localStorage.removeItem('account')
        localStorage.removeItem('password')
    }
}

function doLogin() {
    formRef.value.validate((valid) => {
        if (valid) {
            storage();

            form.type = form.account.match(/.+@.+\..+/) ? 'email' : 'username'
            WebViewEvents.emitServer(PasswordAuthEvents.server.login, form)
            submitting.value = true
        }
    })
}

WebViewEvents.on(PasswordAuthEvents.webview.login, (state: boolean, error: string | undefined) => {
    submitting.value = false
    if (state) {
        ElNotification.closeAll()
        WebViewEvents.emitClient(PasswordAuthEvents.client.closePage)
    } else {
        ElNotification.error({
            title: t('titles.login'),
            message: t(error)
        })
    }
})
</script>

<style scoped>
.auth-other {
    justify-content: space-between;
}
</style>