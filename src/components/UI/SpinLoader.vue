<template>
    <div class="spinner">
        <div class="round"></div>
    </div>
</template>

<style scoped>
.spinner {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.7);
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
}
.round {
    width: 100px;
    height: 100px;
    border: 4px solid orange;
    border-bottom: 4px solid transparent;
    border-radius: 50%;
    animation: rotate 0.8s linear infinite;
}
@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>