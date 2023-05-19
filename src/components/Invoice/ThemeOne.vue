<template>
    <div class="form-contents p-5" id="element-to-convert">
        <div class="bill-to-details p-4" :style="backColour">
            <div class="row">
                <div class="col-6">
                    <div class="logo" v-if="allDatas">
                        <img :src="allDatas.providerAndClientDetails.providerLogo" class="logo-white" alt="logo">
                    </div>
                </div>
                <div class="col-6">
                    <h1 class="mb-5 text-end fw-bold">Invoice</h1>
                </div>
            </div>
            <!-- provider/client and invoice details -->
            <div v-if="allDatas">
                <div class="row mt-4">
                    <div class="col-7">
                        <h4>{{ allDatas.providerAndClientDetails.providerName }}</h4>
                        <p>{{ allDatas.providerAndClientDetails.providerAddress }}</p>
                        <p>{{ allDatas.providerAndClientDetails.providerState }}, {{ allDatas.providerAndClientDetails.providerCountry }} - {{ allDatas.providerAndClientDetails.providerPincode }}</p>
                        <p class="mt-1">Phone: {{ allDatas.providerAndClientDetails.providerContact }}</p>
                        <p>Email: {{ allDatas.providerAndClientDetails.providerEmail }}</p>
                    </div>
                    <div class="col-5">
                        <p class="mb-2">Billed To</p>
                        <h6 class="mb-0">{{ allDatas.providerAndClientDetails.clientName }}</h6>
                        <p>{{ allDatas.providerAndClientDetails.clientAddress }}</p>
                        <p>{{ allDatas.providerAndClientDetails.clientState }}, {{ allDatas.providerAndClientDetails.clientCountry }} - {{ allDatas.providerAndClientDetails.clientPincode }}</p>
                        <p class="mt-1">Phone: {{ allDatas.providerAndClientDetails.clientContact }}</p>
                        <p>Email: {{ allDatas.providerAndClientDetails.clientEmail }}</p>
                    </div>
                </div>
                <div class="row align-items-end">
                    <div class="col-12">
                        <div class="invoice-details" v-if="allDatas">
                            <div class="d-flex justify-content-start align-items-center gap-5">
                                <div>
                                    <p>Invoice No</p>
                                    <h6>{{ allDatas.invoiceDetails.invoiceNumber }}</h6>
                                </div>
                                <div>
                                    <p>Issued Date</p>
                                    <h6>{{ allDatas.invoiceDetails.invoiceDate }}</h6>
                                </div>
                                <div>
                                    <p>Due Date</p>
                                    <h6>{{ allDatas.invoiceDetails.invoiceDueDate }}</h6>
                                </div>
                                <div v-for="field in allDatas.fieldDetails" :key="field">
                                    <p>{{ field.fieldName }}</p>
                                    <h6>{{ field.fieldValue }}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- product details -->
        <div class="row mt-3">
            <div class="col-12 mt-4">
                <h5>Product Details</h5>
                <div class="table-radius">
                    <table class="table mb-0">
                        <thead class="table-head" :style="backColour">
                            <tr>
                                <th scope="col" class="for-width-only">Sr.</th>
                                <th scope="col">Product Name</th>
                                <th scope="col" class="text-end">Quantity</th>
                                <th scope="col" class="text-end">Rate</th>
                                <th scope="col" class="text-end">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(invoice, ind) in allDatas.productDetails" :key="ind">
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
                            <tr>
                                <td colspan="5" class="text-end">
                                    Rs. {{ allDatas.productTotalAmount }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="html2pdf__page-break"></div>
        <!-- payment/bank details -->
        <div class="row mt-4">
            <h5>Payment Details</h5>
            <div class="col-6" v-if="allDatas.bankDetails">
                <p class="my-1">Bank Details</p>
                <p>Account Number: {{ allDatas.bankDetails.accountNumber }}</p>
                <p>Account Holder Name: {{ allDatas.bankDetails.accountHolderName }}</p>
                <p>Bank Name: {{ allDatas.bankDetails.bankName }}</p>
                <p>IFSC Code: {{ allDatas.bankDetails.ifscCode }}</p>
                <p>Mobile Number: {{ allDatas.bankDetails.mobileNumber }}</p>
            </div>
            <div class="col-3 ms-auto" id="collumnWidth" v-if="allDatas.currency">
                <table class="table mb-0">
                    <thead>
                        <tr>
                            <td scope="col">Sub Total ({{allDatas.currency.currencyName.slice(0, 3)}})</td>
                            <td scope="col" class="text-end">{{allDatas.currency.currencyName.slice(6,)}} {{ totalAmountWithCurrency }}</td>
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
                            <th class="total-amount" :style="backColour">
                                Grand Total ({{allDatas.currency.currencyName.slice(0, 3)}})
                            </th>
                            <th class="text-end total-amount" :style="backColour">
                                {{allDatas.currency.currencyName.slice(6,)}} {{ totalAmountWithCurrency }}
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="row mt-4" id="bwPrint">
            <!-- terms and conditions -->
            <div class="decrease-width1 col-12">
                <h5>Terms & Conditions</h5>
                <p>1. Payment to be made within 14days. All major creadit card are acceptable.</p>
                <p>2. Applied Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                <p>3. 10% discount for new customer reffered by client 107752. Discount applied to first sale only.</p>
                <p>4. Applied Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <div class="row align-items-end mt-4">
                <!-- authorised signature -->
                <div class="decrease-width2 col-2">
                    <img :src="allDatas.userSignature" class="img-fluid" alt="signature" v-if="allDatas.userSignature">
                    <div class="authorised-signature text-center">
                        <p class="mb-0">Authorised Signature</p>
                    </div>
                </div>
                <!-- attached file -->
                <div class="margin-decrease1 text-end ms-auto col-6">
                    <h5>Attached Files</h5>
                    <div v-for="(file, ind) of allDatas.attachedFile" :key="ind">
                        <a :href="file.downloadURL" target="_blank" class="attach-file">{{Number(ind) + 1}}. {{file.fileName}}</a>
                    </div>
                </div>
            </div>
            <!-- additional note contents -->
            <div class="margin-decrease2 col-12 mt-4" v-if="allDatas.additionalNote">
                <h5>Additional Note</h5>
                <div v-html="allDatas.additionalNote"></div>
            </div>
        </div>
        <!-- additional details/footer notice -->
        <div class="border-details mt-4" :style="backColour">
            <p class="text-center">Any enquiry? reach out via email at example@gmail.com, call on 98765-43210</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['allDatas', 'backColour'],
        computed: {
            // total amount with currency value
            totalAmountWithCurrency() {
                return parseFloat(this.$props.allDatas.productTotalAmount * this.$props.allDatas.currency.currencyValue).toFixed(2);
            }
        }
    }
</script>

<style scoped>
.form-contents {
    box-shadow: 0 0 6px rgb(183, 183, 183);
    border-radius: 5px;
    margin-top: 40px;
}
.bill-to-details {
    border-radius: 5px;
    color: white;
    background-color: #097dc4;
}
.logo {
    width: 200px;
}
.logo img{
    width: 100%;
}
.invoice-details {
    margin-top: 30px;
    padding: 15px 5px;
    border-top: 1px solid rgba(255, 255, 255, 0.4);
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
}
p{
    margin-bottom: 0;
}
.table-radius {
    border-radius: 5px !important;
    overflow: hidden;
}
.table-head {
    color: white;
    background-color: rgb(9 125 196);
}
.total-amount {
    color: white;
    background-color: rgb(9 125 196);
}
.total-amount:nth-child(1) {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}
.total-amount:nth-child(2) {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}
.border-details {
    border-radius: 5px;
    padding: 15px 20px;
    font-weight: bold;
    color: white;
    background-color: rgb(9 125 196);
}
.authorised-signature {
    border-top: 1px solid black;
    padding-top: 5px;
}
.attach-file {
    color: black;
    text-decoration: none;
}
tbody tr:last-child {
    border-bottom: 1px solid transparent;
}
@media print {
    *{
        font-size: 12px !important;
    }
    h1 {
        font-size: 20px !important;
        margin-bottom: 20px !important;
    }
    h4 {
        font-size: 18px !important;
    }
    h5 {
        font-size: 16px !important;
    }
    .bill-to-details {
        padding: 15px 15px !important;
        margin: 15px 0 20px;
    }
    .form-contents {
        box-shadow: none;
        margin-top: 0px;
        padding: 5px !important;
    }
    .container {
        max-width: 98% !important;
    }
    #collumnWidth {
        width: 260px !important;
        margin: 0 0 0 auto !important;
    }
    .mt-3, .mt-4 {
        margin-top: 10px !important;
    }
    .logo {
        width: 150px;
    }
    a, button {
        color: black !important;
    }
    h5 {
        font-size: 16px !important;
    }
    #bwPrint {
        margin-top: 20px !important;
    }
    .margin-decrease1 {
        margin-bottom: 0 !important;
        margin-top: 10px !important;
    }
    .margin-decrease2 {
        margin-top: 20px !important;        
    }
    .border-details {
        margin-top: 5px !important;
        padding: 7px 12px;
        font-size: 12px !important;
    }
    .authorised-signature {
        padding-top: 1px !important;
    }
    .decrease-width2 .authorised-signature, .decrease-width2 .authorised-signature p {
        width: 100% !important;
        white-space: nowrap;
        font-size: 12px !important;
        text-align: center !important;
    }
}
</style>