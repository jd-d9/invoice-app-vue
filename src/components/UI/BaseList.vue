<template>
    <div class="row align-items-center" id="bwPrint">
        <!-- <div class="col-6">
            <ul>
                <p>Invoice Number</p>
                <li>{{ invoiceNumber }}</li>
                <li>Issued Date</li>
                <li>{{ issueDate }}</li>
                <li>Due Date</li>
                <li>{{ dueDate }}</li>
            </ul>
        </div> -->
        <div class="col-6">
            <p>Bill By</p>
            <h4 class="my-2">{{ providerName }}</h4>
            <p>{{ providerContact }}</p>
            <p>{{ providerEmail }}</p>
            <p>{{ providerAddress }}</p>
            <p>{{ providerState }}, {{ providerCountry }}</p>
            <p>Pincode: {{ providerPincode }}</p>
        </div>
        <div class="col-6 text-end">
            <p>Bill To</p>
            <h4 class="my-2">{{ clientName }}</h4>
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
            ],  //'invoiceNumber', 'issueDate', 'dueDate',
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
    @media print {
        #bwPrint {
            color: black;
        }
    }
</style>