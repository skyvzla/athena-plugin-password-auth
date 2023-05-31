<template>
    <ElForm :model="form" :rules="formRules" ref="formRef" size="large" label-position="top" :disabled="submitting">
        <ElFormItem :label="t('fields.account')" prop="account">
            <ElInput v-model="form.account" :placeholder="t('fields.account')" />
        </ElFormItem>
        <ElFormItem :label="t('fields.verifyCode')" prop="verifyCode">
            <ElInput v-model="form.verifyCode" :placeholder="t('fields.verifyCode')" type="number" maxlength="6">
                <template #append>
                    <ElButton type="primary" @click="getCode" :loading="codeSending">{{ countdown.text.value }}</ElButton>
                </template>
            </ElInput>
        </ElFormItem>
        <ElFormItem :label="t('fields.password')" prop="password">
            <ElInput v-model="form.password" :placeholder="t('fields.password')" type="password" maxlength="20" />
        </ElFormItem>
        <ElFormItem :label="t('fields.confirmPassword')" prop="confirmPassword">
            <ElInput v-model="form.confirmPassword" :placeholder="t('fields.confirmPassword')" type="password"
                maxlength="20" />
        </ElFormItem>
    </ElForm>
    <div class="auth-other">
        <ElButton type="info" link @click="emits('changePage', 'Register')" :disabled="submitting">
            {{ t('buttons.register') }}
        </ElButton>
        <ElButton type="info" @click="() => emits('changePage', 'Login')" link :disabled="submitting">
            {{ t('buttons.login') }}
        </ElButton>
    </div>
    <div class="footer">
        <ElButton type="primary" @click="doForget" size="large" :loading="submitting">
            {{ t('buttons.reset') }}
        </ElButton>
    </div>
</template>
<script lang="ts" setup>
import { t } from "@AthenaPlugins/password-auth/locale";
import { PasswordAuthEvents } from '@AthenaPlugins/password-auth/shared/events';
import WebViewEvents from '@utility/webViewEvents';
import type { FormInstance, FormRules } from "element-plus";
import { ElButton, ElForm, ElFormItem, ElInput, ElNotification } from 'element-plus';
import { reactive, ref } from 'vue';
import { ForgetForm } from "../../shared/interfaces";
import { useCountdown } from "../utility/countdown";

const emits = defineEmits(['changePage']);

const countdown = useCountdown(60)
const codeSending = ref(false)
const submitting = ref(false)
const formRef = ref<FormInstance>()
const form = reactive<ForgetForm>({
    account: '',
    verifyCode: '',
    password: '',
    confirmPassword: '',
    type: 'username'
})
const formRules = reactive<FormRules>({
    account: [
        { required: true, message: t('validate.account.required'), trigger: 'blur' },
        { min: 4, message: t('validate.account.min'), trigger: 'blur' },
    ],
    verifyCode: [
        { required: true, message: t('validate.verifyCode.required'), trigger: 'blur' },
        { min: 6, message: t('validate.verifyCode.min'), trigger: 'blur' },
    ],
    password: [
        { required: true, message: t('validate.password.required'), trigger: 'blur' },
        { min: 6, message: t('validate.password.min'), trigger: 'blur' },
    ],
    confirmPassword: [
        { required: true, message: t('validate.confirmPassword.required'), trigger: 'blur' },
        {
            validator: (rule, value, callback) => {
                if (value !== form.password) {
                    callback(new Error(t('validate.confirmPassword.notMatch')))
                } else {
                    callback()
                }
            },
            trigger: 'blur'
        }
    ],
})

function getCode() {
    if (countdown.isStart.value) return;

    formRef.value.validateField('account', (valid) => {
        if (valid) {
            codeSending.value = true
            const type = form.account.match(/.+@.+\..+/) ? 'email' : 'username';
            WebViewEvents.emitServer(PasswordAuthEvents.server.sendForgetCode, type, form.account)
        }
    })
}

function doForget() {
    formRef.value.validate((valid) => {
        if (valid) {
            form.type = form.account.match(/.+@.+\..+/) ? 'email' : 'username';
            WebViewEvents.emitServer(PasswordAuthEvents.server.forget, form)
            submitting.value = true
        }
    })
}

WebViewEvents.on(PasswordAuthEvents.webview.sendForgetCode, (state: boolean, error: string | undefined) => {
    if (state) {
        countdown.start()
        ElNotification.success({
            title: t('titles.forget'),
            message: t('mail.message.success'),
        })
    } else {
        ElNotification.error({
            title: t('titles.forget'),
            message: t(error || 'mail.message.error'),
        })
    }
    codeSending.value = false
})

WebViewEvents.on(PasswordAuthEvents.webview.forget, (state: boolean, error: string | undefined) => {
    if (state) {
        emits('changePage', 'Login')
        ElNotification.success({
            title: t('titles.forget'),
            message: t('forget.result.success'),
        })
        localStorage.removeItem('password')
    } else {
        ElNotification.error({
            title: t('titles.forget'),
            message: t(error),
        })
    }
    submitting.value = false
})

</script>

<style scoped></style>