<template>
    <div class="page">
        <div class="carousel">
            <ElCarousel indicator-position="none" arrow="never" height="100vh" :interval="10000">
                <ElCarouselItem v-for="index in 3">
                    <img class="bg-img" :src="`/plugins/images/bg${index}.jpg`" />
                </ElCarouselItem>
            </ElCarousel>
        </div>
        <div class="container">
            <div class="panel">
                <div class="panel-title">{{ pageTitle }}</div>
                <component :is="page" @change-page="(name) => (pageName = name)" />
            </div>
            <div class="left-bottom-corner"></div>
            <div class="right-top-corner"></div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ElCarousel, ElCarouselItem } from "element-plus";
import { computed, ref } from "vue";
import Forget from "./components/Forget.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import { t } from "../locale"

const pageName = ref<string>('Login')
const page = computed(() => {
    switch (pageName.value) {
        case 'Login':
            return Login
        case 'Forget':
            return Forget
        case 'Register':
            return Register
    }
    return null
})
const pageTitle = computed(() => {
    return t(`titles.${pageName.value.toLowerCase()}`)
})

</script>

<style>
@import "element-plus/dist/index.css";

.container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    padding: 8vh 8vw;
    min-width: 500px;
    max-width: 700px;
    width: 40%;
    min-height: 500px;
}

.panel {
    min-width: 390px;
    max-width: 500px;
    width: 50%;
}

.carousel {
    position: absolute;
    width: 100vw;
    z-index: -1;
}

.bg-img {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
}

.panel-title {
    text-align: center;
    padding-bottom: 20px;
    font-size: 50px;
    font-weight: bold;
    color: var(--el-color-primary);
}

.right-top-corner,
.left-bottom-corner {
    width: 0;
    height: 0;
    position: absolute;
    --border-1: 100px solid var(--el-color-primary);
    --border-2: 190px solid transparent;
}

.right-top-corner {
    border-top: var(--border-1);
    border-left: var(--border-2);
    top: 0;
    right: 0;
    position: absolute;
}

.left-bottom-corner {
    border-bottom: var(--border-1);
    border-right: var(--border-2);
    bottom: 0;
    left: 0;
}

.auth-other {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.footer {
    margin-top: 30px;
    display: flex;
    justify-content: center;
}

.footer>button {
    width: 95%;
}
</style>