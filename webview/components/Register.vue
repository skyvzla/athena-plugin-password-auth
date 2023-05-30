<template>
    <ElForm :model="form" :rules="formRules" ref="formRef" size="large" label-position="top" :disabled="submitting">
        <ElFormItem :label="t('fields.username')" prop="username">
            <ElInput v-model="form.username" :placeholder="t('fields.username')" maxlength="20" />
        </ElFormItem>
        <template v-if="config.emailVerify">
            <ElFormItem :label="t('fields.email')" prop="email">
                <ElInput v-model="form.email" :placeholder="t('fields.email')" type="email" />
            </ElFormItem>
            <ElFormItem :label="t('fields.verifyCode')" prop="verifyCode">
                <ElInput v-model="form.verifyCode" :placeholder="t('fields.verifyCode')" type="number" maxlength="6">
                    <template #append>
                        <ElButton type="primary" @click="getCode" :loading="codeSending">
                            {{ countdown.text.value }}
                        </ElButton>
                    </template>
                </ElInput>
            </ElFormItem>
        </template>
        <ElFormItem :label="t('fields.password')" prop="password">
            <ElInput v-model="form.password" :placeholder="t('fields.password')" type="password" maxlength="20" />
        </ElFormItem>
        <ElFormItem :label="t('fields.confirmPassword')" prop="confirmPassword">
            <ElInput v-model="form.confirmPassword" :placeholder="t('fields.confirmPassword')" type="password"
                maxlength="20" />
        </ElFormItem>
    </ElForm>
    <div class="auth-other">
        <ElButton type="info" @click="() => emits('changePage', 'Forget')" link v-if="config.emailVerify"
            :disabled="submitting">
            {{ t('titles.forget') }}
        </ElButton>
        <ElButton type="info" @click="() => emits('changePage', 'Login')" link :disabled="submitting">
            {{ t('titles.login') }}
        </ElButton>
    </div>
    <div class="footer">
        <ElButton type="primary" @click="doRegister" size="large" :loading="submitting">
            {{ t('buttons.register') }}
        </ElButton>
    </div>
</template>
<script lang="ts" setup>
import { FormRules, ElForm, ElFormItem, ElInput, ElButton, FormInstance, ElNotification } from 'element-plus';
import { computed, reactive, ref } from 'vue';
import config from "@AthenaPlugins/password-auth/shared/config"
import { t } from '@AthenaPlugins/password-auth/locale';
import WebViewEvents from '@utility/webViewEvents';
import { PasswordAuthEvents } from '@AthenaPlugins/password-auth/shared/events';
import { useCountdown } from '../utility/countdown'

const emits = defineEmits(['changePage']);

const countdown = useCountdown(60)
const submitting = ref(false)
const codeSending = ref(false)
const formRef = ref<FormInstance>()
const form = reactive({
    email: '',
    verifyCode: '',
    username: '',
    password: '',
    confirmPassword: ''
})
const formRules = computed<FormRules>(() => {
    let rules = {
        username: [
            { required: true, message: t('validate.username.required'), trigger: 'blur' },
            { min: 3, max: 20, message: t('validate.username.min'), trigger: 'blur' }
        ],
        password: [
            { required: true, message: t('validate.password.required'), trigger: 'blur' },
            { min: 6, max: 20, message: t('validate.password.min'), trigger: 'blur' }
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
    }
    if (config.emailVerify) {
        rules['email'] = [
            { required: true, message: t('validate.email.required'), trigger: 'blur' },
            { type: 'email', message: 'Please input correct email', trigger: 'blur' },
        ]
        rules['verifyCode'] = [
            { required: true, message: t('validate.verifyCode.required'), trigger: 'blur' },
        ]
    }
    return rules
})

function doRegister() {
    formRef.value.validate((valid) => {
        if (valid) {
            WebViewEvents.emitServer(PasswordAuthEvents.server.register, form)
            submitting.value = true
        }
    })
}

function getCode() {
    if (countdown.isStart.value) return;

    formRef.value.validateField('email', (valid) => {
        if (valid) {
            codeSending.value = true
            WebViewEvents.emitServer(PasswordAuthEvents.server.sendRegisterCode, form.email)
        }
    })
}

if (config.emailVerify) {
    WebViewEvents.on(PasswordAuthEvents.webview.sendRegisterCode, (state: boolean, error: string | undefined) => {
        if (state) {
            countdown.start()
            ElNotification.success({
                title: t('titles.register'),
                message: t('mail.message.success'),
            })
        } else {
            ElNotification.error({
                title: t('titles.register'),
                message: t(error || 'mail.message.error'),
            })
        }
        codeSending.value = false
    })
}

WebViewEvents.on(PasswordAuthEvents.webview.register, (state: boolean, error: string | undefined) => {
    if (state) {
        emits('changePage', 'Login')
        ElNotification.success({
            title: t('titles.register'),
            message: t('register.result.success'),
        })
    } else {
        ElNotification.error({
            title: t('titles.register'),
            message: t(error),
        })
    }
    submitting.value = false
})
</script>

<style scoped>
</style>
