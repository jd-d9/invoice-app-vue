<template>
    <div class="container">
        <div class="row">
            <div class="col-5 mx-auto">
                <div class="not-found">
                    <div class="detailing">
                        <h1>404</h1>
                        <h5>OOPS! PAGE NOT FOUND</h5>
                        <p class="mb-5">Sorry, the page you're looking for dosen't exist. It might have been removed or renamed.</p>
                        <router-link to="/" class="dashboard-button">Go to Dashboard</router-link>
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
        text-align: center;
        box-shadow: 0 0 4px rgb(183, 183, 183);
        gap: 20px;
        border-radius: 5px;
        padding: 20px 40px 50px;
    }
    h1 {
        font-size: 120px;
        font-weight: bolder;
        margin-bottom: 0;
        transform: translateY(-10px);
    }
    .dashboard-button {
        text-decoration: none;
        background-color: #ffa600;
        padding: 8px 50px;
        border-radius: 50px;
        color: white;
        border: 1px solid transparent;
    }
</style>