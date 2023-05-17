<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="not-found">
                    <div class="detailing">
                        <h1>404</h1>
                        <div>
                            <h5>Page Not Found.</h5>
                            <p class="mb-0">May you looking for <router-link to="/" class="text-warning">This</router-link> Page?</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .not-found {
        width: 100%;
        height: 100vh;
        display: grid;
        place-items: center;
    }
    .detailing {
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0 4px rgb(183, 183, 183);
        gap: 20px;
        border-radius: 5px;
        padding: 30px 40px;
    }
    h1 {
        font-size: 70px;
        margin-bottom: 0;
        transform: translateY(-10px);
    }
</style>