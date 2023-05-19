<template>
    <div class="form-contents p-5" id="element-to-convert">
        <div class="bill-to-details p-4" :style="backColour">
            <!-- provider details -->
            <div class="row align-items-center">
                <div class="col-3">
                    <h1 class="fw-bold">Invoice</h1>
                </div>
                <div class="col-6" v-if="allDatas">
                    <h4>{{ allDatas.providerAndClientDetails.providerName }}</h4>
                    <p>{{ allDatas.providerAndClientDetails.providerAddress }}</p>
                    <p>{{ allDatas.providerAndClientDetails.providerState }}, {{ allDatas.providerAndClientDetails.providerCountry }} - {{ allDatas.providerAndClientDetails.providerPincode }}</p>
                </div>
                <div class="col-3">
                    <div class="logo" v-if="allDatas">
                        <img :src="allDatas.providerAndClientDetails.providerLogo" class="logo-white" alt="logo">
                    </div>
                </div>
            </div>
        </div>
        <div v-if="allDatas">
            <div class="row mt-4">
                <div class="col-4">
                    <!-- invoice details -->
                    <div v-if="allDatas">
                        <p class="margin-class"><span class="heading" :style="headingColor">Invoice Details</span></p>
                        <table class="invoice-table">
                            <tr>
                                <td>Invoice No</td>
                                <td class="text-secondary">{{ allDatas.invoiceDetails.invoiceNumber }}</td>
                            </tr>
                            <tr>
                                <td>Issued Date</td>
                                <td class="text-secondary">{{ allDatas.invoiceDetails.invoiceDate }}</td>
                            </tr>
                            <tr>
                                <td>Due Date</td>
                                <td class="text-secondary">{{ allDatas.invoiceDetails.invoiceDueDate }}</td>
                            </tr>
                            <tr v-for="field in allDatas.fieldDetails" :key="field">
                                <td>{{ field.fieldName }}</td>
                                <td class="text-secondary">{{ field.fieldValue }}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="col-4">
                    <p class="margin-class"><span class="heading" :style="headingColor">Bill By</span></p>
                    <p>Phone: <span class="text-secondary">{{ allDatas.providerAndClientDetails.providerContact }}</span></p>
                    <p>Email: <span class="text-secondary">{{ allDatas.providerAndClientDetails.providerEmail }}</span></p>
                </div>
                <!-- invoice status and amount -->
                <div class="col-4">
                    <p class="margin-class"><span class="heading" :style="headingColor">Payment Record</span></p>
                    <table class="invoice-table">
                        <tr>
                            <td>Amount</td>
                            <td class="text-secondary">{{allDatas.currency.currencyName.slice(6,)}} {{ totalAmountWithCurrency }}</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td class="text-secondary">{{ allDatas.invoiceStatus }}</td>
                        </tr>
                    </table>
                </div>
                <!-- client details -->
                <div class="col-12 mt-4">
                    <p class="margin-class"><span class="heading" :style="headingColor">Billed To</span></p>
                    <h6 class="mb-0">{{ allDatas.providerAndClientDetails.clientName }}</h6>
                    <p class="text-secondary">{{ allDatas.providerAndClientDetails.clientAddress }}, {{ allDatas.providerAndClientDetails.clientState }}, {{ allDatas.providerAndClientDetails.clientCountry }} - {{ allDatas.providerAndClientDetails.clientPincode }}</p>
                    <p>Phone: <span class="text-secondary">{{ allDatas.providerAndClientDetails.clientContact }}</span></p>
                    <p>Email: <span class="text-secondary">{{ allDatas.providerAndClientDetails.clientEmail }}</span></p>
                </div>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-12">
                <!-- product table/details -->
                <table class="table table-bordered">
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
                <div class="text-end sub-amount"></div>
            </div>
        </div>
        <div class="html2pdf__page-break"></div>
        <div class="row mt-4">
            <!-- payment/bank details -->
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
                <!-- sub/total amounts -->
                <table class="table table-bordered mb-0">
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
                            <th class="total-amount">
                                Grand Total ({{allDatas.currency.currencyName.slice(0, 3)}})
                            </th>
                            <th class="text-end total-amount" :style="fontColour">
                                {{allDatas.currency.currencyName.slice(6,)}} {{ totalAmountWithCurrency }}
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="row mt-4" id="bwPrint">
            <!-- additional note contents -->
            <div class="margin-decrease2 col-12" v-if="allDatas.additionalNote">
                <h5>Additional Note</h5>
                <div v-html="allDatas.additionalNote"></div>
            </div>
            <!-- attached files -->
            <div class="margin-decrease1 col-6 mt-4">
                <h5>Attached Files</h5>
                <div v-for="(file, ind) of allDatas.attachedFile" :key="ind">
                    <a :href="file.downloadURL" target="_blank" class="attach-file">{{Number(ind) + 1}}. {{file.fileName}}</a>
                </div>
            </div>
            <!-- authorised signature -->
            <div class="ms-auto col-2">
                <img :src="allDatas.userSignature" class="img-fluid" alt="signature" v-if="allDatas.userSignature">
                <div class="authorised-signature text-center">
                    <p class="mb-0">Authorised Signature</p>
                </div>
            </div>
            <!-- terms and conditions -->
            <div class="col-12 mt-4">
                <h5>Terms & Conditions</h5>
                <p>1. Payment to be made within 14days. All major creadit card are acceptable.</p>
                <p>2. Applied Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                <p>3. 10% discount for new customer reffered by client 107752. Discount applied to first sale only.</p>
                <p>4. Applied Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            </div>
        </div>
        <!-- additional details and footer notice -->
        <div class="border-details mt-4" :style="backColour">
            <p class="text-center">Any enquiry? reach out via email at example@gmail.com, call on 98765-43210</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['allDatas', 'backColour', 'fontColour'],
        data() {
            return {
                headingBackGround: '',
            }
        },
        computed: {
            // total amount with currency value
            totalAmountWithCurrency() {
                return parseFloat(this.$props.allDatas.productTotalAmount * this.$props.allDatas.currency.currencyValue).toFixed(2);
            },
            // heading color
            headingColor() {
                return {
                    backgroundColor: this.headingBackGround,
                    borderColor: this.$props.fontColour.color
                }
            }
        },
        methods: {
            // make title background transparent color
            makeTransparent() {
                const red = parseInt(this.$props.fontColour.color.substring(1, 3), 16);
                const green = parseInt(this.$props.fontColour.color.substring(3, 5), 16);
                const blue = parseInt(this.$props.fontColour.color.substring(5, 7), 16);
                const rgb = [red, green, blue];
                this.headingBackGround = `rgba(${rgb},0.1)`;
            }
        },
        updated() {
            this.makeTransparent();
        },
    }
</script>

<style scoped>
    .form-contents {
        box-shadow: 0 0 6px rgb(183, 183, 183);
        border-radius: 5px;
        margin-top: 40px;
    }
    .bill-to-details {
        color: white;
        background-color: #27ae60;
        padding: 50px 25px !important;
    }
    .logo {
        width: 200px;
    }
    .logo img{
        width: 100%;
    }
    .margin-class {
        margin: 10px 0;
    }
    p{
        margin-bottom: 0;
    }
    .invoice-table tr td:nth-child(1){
        width: 170px !important;
    }
    .heading {
        border-left: 4px solid #27ae60;
        padding: 2px 10px;
        background-color: #e5fdef;
    }
    .table-radius {
        border-radius: 5px !important;
        overflow: hidden;
    }
    .table-head {
        color: white;
        background-color: #27ae60;
    }
    .border-details {
        padding: 15px 20px;
        font-weight: bold;
        color: white;
        background-color: #27ae60;
    }
    .authorised-signature {
        border-top: 1px solid black;
        padding-top: 5px;
    }
    .attach-file {
        color: black;
        text-decoration: none;
    }
    @media print {
        *{
            font-size: 12px !important;
        }
        h1 {
            font-size: 25px !important;
            margin-bottom: 20px !important;
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
        .invoice-table tr td:nth-child(1){
            width: 100px !important;
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
            margin-bottom: 10px !important;
        }
        .margin-decrease2 {
            margin-top: 10px !important;        
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