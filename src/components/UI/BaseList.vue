<template>
    <div class="row align-items-center" id="bwPrint">
        <!-- provider details -->
        <div class="col-6">
            <p>Bill By</p>
            <h4>{{ providerName }}</h4>
            <p>{{ providerContact }}</p>
            <p>{{ providerEmail }}</p>
            <p>{{ providerAddress }}</p>
            <p>{{ providerState }}, {{ providerCountry }}</p>
            <p>Pincode: {{ providerPincode }}</p>
        </div>
        <!-- client details -->
        <div class="col-6 text-end">
            <p>Bill To</p>
            <h4>{{ clientName }}</h4>
            <p>{{ clientContact }}</p>
            <p>{{ clientEmail }}</p>
            <p>{{ clientAddress }}</p>
            <p>{{ clientState }}, {{ clientCountry }}</p>
            <p>Pincode: {{ clientPincode }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['providerName', 'providerContact', 'providerEmail', 'providerAddress',
                'providerState', 'providerCountry', 'providerPincode',
                'clientName', 'clientContact', 'clientEmail', 'clientAddress',
                'clientState', 'clientCountry', 'clientPincode'
            ],
    }
</script>

<style scoped>
    *{
        color: black;
        font-weight: bold;
    }
    ul {
        list-style: none;
        padding-left: 0;
    }
    p {
        margin: 0;
    }
    h4 {
        margin: 7px 0;
    }
    @media print {
        h4 {
            font-size: 16px !important;
            margin: 3px 0;
        }
        #bwPrint {
            color: black;
        }
    }
</style>