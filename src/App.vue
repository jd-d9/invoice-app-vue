<template>
    <router-view v-slot="transitionProps">
        <transition name="router" mode="out-in">
            <component :is="transitionProps.Component"></component>
        </transition>
    </router-view>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        }
    }
</script>

<style>
body {
    font-family: 'Raleway', sans-serif !important;
    letter-spacing: 1px !important;
}

.router-enter-to,
.router-leave-from {
    transform: translateY(0px);
    opacity: 1;
}

.router-enter-active,
.router-leave-active {
    transition: all 0.4s ease-out;
}

.router-enter-from,
.router-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}
</style>