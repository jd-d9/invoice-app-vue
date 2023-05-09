<template>
    <button class="btn" :class="mode">{{ buttonTitle }}</button>
</template>

<script>
    export default {
        props: ['buttonTitle', 'mode'],
    }
</script>

<style scoped>
    button {
        background-color: #ffa600;
        padding: 8px 50px;
        border-radius: 50px;
        color: white;
        border: 1px solid transparent;
    }
    button:hover {
        background-color: #ffb936;
    }
    .outline {
        background: transparent;
        border: 1px solid #ffa600;
        color: #ffa600;
    }
    .outline:hover {
        background: #ffa600;
        color: black;
    }
</style>