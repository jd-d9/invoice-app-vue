<template>
    <div class="backdrop-shadow" @click="closeDialog">
        <div class="dialog-box">
            <h2>Error</h2>
            <p class="mt-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi omnis voluptatibus ipsa, atque, veritatis ea dolores quam iure fugiat, corrupti esse ad sequi doloremque libero.</p>
            <base-button buttonTitle="Okay" @click="closeDialog"></base-button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        closeDialog() {
            console.log('hello')
        }
    }
};
</script>

<style scoped>
.dialog-box {
    position: absolute;
    overflow: hidden;
    background-color: rgb(255, 255, 255);
    border-radius: 5px;
    width: 800px;
    top: 30%;
    left: 30%;
    padding: 10px 20px 20px;
}

.dialog-box::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 60px;
    top: 0;
    left: 0;
    background-color: #ffb936;
}

.dialog-box > * {
    position: relative;
    z-index: 22;
}

.backdrop-shadow {
    display: block;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.8);
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
}
</style>