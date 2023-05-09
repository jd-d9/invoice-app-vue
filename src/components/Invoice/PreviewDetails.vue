<template>
    <div>
        <navigation-bar id="nonPrintable"></navigation-bar>
        <div class="container pb-5">
            <div class="form-contents p-5" id="element-to-convert">
                <h1 class="mb-5 text-center fw-bold">Invoice</h1>
                <div class="row align-items-end">
                    <div class="col-6">
                        <div class="logo" v-if="invoiceData">
                            <img :src="invoiceData.providerAndClientDetails.providerLogo" class="logo-white" alt="logo">
                        </div>
                    </div>
                    <div class="col-6 text-end">
                        <div v-if="invoiceData">
                            <table class="ms-auto" cellpadding="3">
                                <tr>
                                    <td>Invoice No :</td>
                                    <td>{{ invoiceData.invoiceDetails.invoiceNumber }}</td>
                                </tr>
                                <tr>
                                    <td>Issued Date :</td>
                                    <td>{{ invoiceData.invoiceDetails.invoiceDate }}</td>
                                </tr>
                                <tr>
                                    <td>Due Date :</td>
                                    <td>{{ invoiceData.invoiceDetails.invoiceDueDate }}</td>
                                </tr>
                                <tr v-for="field in invoiceData.fieldDetails" :key="field">
                                    <td>{{ field.fieldName }} :</td>
                                    <td>{{ field.fieldValue }}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="bill-to-details p-4">
                    <div v-if="invoiceData">
                        <base-list
                        :providerName="invoiceData.providerAndClientDetails.providerName"
                        :providerContact="invoiceData.providerAndClientDetails.providerContact"
                        :providerEmail="invoiceData.providerAndClientDetails.providerEmail"
                        :providerAddress="invoiceData.providerAndClientDetails.providerAddress"
                        :providerState="invoiceData.providerAndClientDetails.providerState"
                        :providerCountry="invoiceData.providerAndClientDetails.providerCountry"
                        :providerPincode="invoiceData.providerAndClientDetails.providerPincode"
                        :clientName="invoiceData.providerAndClientDetails.clientName"
                        :clientContact="invoiceData.providerAndClientDetails.clientContact"
                        :clientEmail="invoiceData.providerAndClientDetails.clientEmail"
                        :clientAddress="invoiceData.providerAndClientDetails.clientAddress"
                        :clientState="invoiceData.providerAndClientDetails.clientState"
                        :clientCountry="invoiceData.providerAndClientDetails.clientCountry"
                        :clientPincode="invoiceData.providerAndClientDetails.clientPincode"
                        >
                        </base-list>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-12">
                        <h5>Product Details</h5>
                        <table class="table mb-0">
                            <thead class="table-head">
                                <tr>
                                    <th scope="col" class="for-width-only">Sr.</th>
                                    <th scope="col">Product Name</th>
                                    <th scope="col" class="text-end">Quantity</th>
                                    <th scope="col" class="text-end">Rate</th>
                                    <th scope="col" class="text-end">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(invoice, ind) in invoiceData.productDetails" :key="ind">
                                    <td>
                                        {{ ind + 1 }}
                                    </td>
                                    <td>
                                        {{ invoice.productName }}
                                    </td>
                                    <td class="text-end">
                                        {{ invoice.quantity }}
                                    </td>
                                    <td class="text-end">
                                        {{ invoice.rate }}
                                    </td>
                                    <td class="text-end">
                                        {{ invoice.rate * invoice.quantity }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="text-end sub-amount">Rs. {{ totalAmount }}</div>
                    </div>
                </div>
                <div class="row mt-4">
                    <h5>Payment Details</h5>
                    <div class="col-6" v-if="invoiceData">
                        <p class=" my-2">Bank Details</p>
                        <p>Account Number: {{ invoiceData.bankDetails.accountNumber }}</p>
                        <p>Account Holder Name: {{ invoiceData.bankDetails.accountHolderName }}</p>
                        <p>Bank Name: {{ invoiceData.bankDetails.bankName }}</p>
                        <p>IFSC Code: {{ invoiceData.bankDetails.ifscCode }}</p>
                        <p>Mobile Number: {{ invoiceData.bankDetails.mobileNumber }}</p>
                    </div>
                    <div class="col-3 ms-auto" id="collumnWidth">
                        <table class="table mb-0">
                            <thead>
                                <tr>
                                    <td scope="col">Sub Total ({{currencyName.slice(0, 3)}})</td>
                                    <td scope="col" class="text-end">{{currencyName.slice(6,)}} {{ totalAmountWithCurrency }}</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <p>Total Tax</p>
                                    </td>
                                    <td class="text-end">
                                        0%
                                    </td>
                                </tr>
                                <tr class="sub-amount">
                                    <th>
                                        Grand Total ({{currencyName.slice(0, 3)}})
                                    </th>
                                    <th class="text-end total-amount">
                                        {{currencyName.slice(6,)}} {{ totalAmountWithCurrency }}
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <additional-details 
                :setUserSignature="invoiceData.userSignature" 
                :attachedfile="invoiceData.attachedFile"
                :additionalNoteContent="invoiceData.additionalNote"
                ></additional-details>
            </div>
        </div>
        <teleport to='body'>
            <spin-loader v-if="!invoiceData"></spin-loader>
        </teleport>
    </div>
</template>

<script>
    import { doc, getDoc } from 'firebase/firestore';
    import { db } from '../../firebase/index.js';
    import BaseList from '../UI/BaseList.vue';
    import SpinLoader from '../UI/SpinLoader.vue';
    import AdditionalDetails from '../UI/AdditionalDetails.vue';
    export default {
        components: {
            BaseList,
            SpinLoader,
            AdditionalDetails,
        },
        data() {
            return {
                invoiceData: '',
                totalAmount: 0,
                currencyName: 'INR',
                currencyValue: 1,
            }
        },
        computed: {
            // Total amount value in selected currency
            totalAmountWithCurrency() {
                return parseFloat(this.totalAmount * this.currencyValue).toFixed(2);
            }
        },
        methods: {
            // for get and preview firebase data
            async getInvoiceData() {
                console.log(this.$route.params.id);
                const docRef = doc(db, 'invoice-details', this.$route.params.id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    this.invoiceData = docSnap.data();
                    console.log(this.invoiceData)
                } else {
                    console.log('No data found!');
                }
                this.currencyName = this.invoiceData.currency.currencyName;
                this.currencyValue = this.invoiceData.currency.currencyValue;
                this.totalAmount = this.invoiceData.productTotalAmount;
            },
        },
        mounted() {
            this.getInvoiceData();
        }
    }
</script>

<style scoped>
.form-contents {
    box-shadow: 0 0 6px rgb(183, 183, 183);
    border-radius: 5px;
    margin-top: 40px;
}
p {
    margin-bottom: 0;
}
.logo {
    width: 250px;
}
.logo img {
    width: 100%;
}
h2, .total-amount {
    color: #ffb62d;
}
.bill-to-details {
    margin: 25px 0 40px;
    border-radius: 10px;
    background-color: #ffb62d;
    /* background-image: linear-gradient(45deg, rgba(255, 166, 0, 0.9),rgba(255, 166, 0, 0.9)), url(../../assets/back-design.avif); */
    /* background-position: bottom; */
}
tbody, td, tfoot, th, thead, tr {
    border-style: unset !important;
}
.table-head {
    border-bottom: 1px solid !important;
}
.sub-amount {
    border-top: 1px solid !important;
    padding: 8px 8px 0;
}
th.for-width-only {
    width: 50px;
}
ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
}

@media print {
    #nonPrintable {
        display: none;
    }
    .form-contents {
        box-shadow: none;
        margin-top: 0px;
        padding: 5px !important;
    }
    .bg-dark {
        background: white !important;
    }
    .container {
        max-width: 98% !important;
    }
    tbody, td, tfoot, th, thead, tr, .sub-amount, p {
        color: black;
    }
    .table-head {
        background-color: #ffb62d;
    }
    h2, .total-amount {
        color: #e99700;
    }
    #collumnWidth {
        width: 280px !important;
        margin: 0 0 0 auto !important;
    }
    .mt-3, .mt-4 {
        margin-top: 10px !important;
    }
    .logo {
        width: 200px;
        margin-bottom: 17px;
    }
    a, button {
        color: black !important;
    }
}
</style>