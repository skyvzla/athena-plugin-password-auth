import { computed, ref } from 'vue'
import { t } from '../../locale'

const resend = t('buttons.resendCode')
const getCode = t('buttons.getCode')

export function useCountdown(seconds: number = 60) {
    const isStart = ref(false)
    const count = ref(seconds)
    const text = computed(() => {
        if (isStart.value) {
            return resend.replace('{seconds}', count.value.toString())
        }
        return getCode
    })

    function start() {
        if (isStart.value) return;
        count.value = seconds
        isStart.value = true

        const interval = setInterval(() => {
            count.value--
            if (count.value <= 0) {
                clearInterval(interval)
                isStart.value = false
            }
        }, 1000)
    }

    return {
        start,
        text,
        isStart
    }
}