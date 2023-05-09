<template>
    <div class="container py-5 text-white">
        <div class="row" id="nonPrintable">
            <div class="col-md-12">
                <div class="d-flex justify-content-around text-center">
                    <div class="steper" :class="{completedTab: isInvoiceComplet, currentTab: isInvoice}">
                        <div class="mx-auto circle text-center">1</div>
                        <div class="mt-2">
                            <p class="text-dark mb-0" :class="{'text-success': isInvoiceComplet}">{{isInvoiceComplet ? 'Completed' : 'Step-1'}}</p>
                            <p class="text-secondary">Invoice Details</p>
                        </div>
                    </div>
                    <div class="line" :class="{greenLine: isInvoiceComplet}"></div>
                    <div class="steper" :class="{completedTab: isPaymentComplet, currentTab: isPayment}">
                        <div class="mx-auto circle text-center">2</div>
                        <div class="mt-2">
                            <p class="text-dark mb-0" :class="{'text-success': isPaymentComplet}">{{isPaymentComplet ? 'Completed' : 'Step-2'}}</p>
                            <p class="text-secondary">Payment Details</p>
                        </div>
                    </div>
                    <div class="line" :class="{greenLine: isPaymentComplet}"></div>
                    <div class="steper" :class="{completedTab: isPreviewComplet, currentTab: isPreview}">
                        <div class="mx-auto circle text-center">3</div>
                        <div class="mt-2">
                            <p class="text-dark mb-0">Step-3</p>
                            <p class="text-secondary">Preview Details</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isInvoiceComplet: false,
                isInvoice: true,
                isPaymentComplet: false,
                isPayment: false,
                isPreviewComplet: false,
                isPreview: false
            }
        },
        methods: {
            isTabCompleted() {
                if(window.location.pathname == '/dasboard') {
                    this.isInvoice = false;
                }
                if(window.location.pathname == '/payment') {
                    this.isInvoice = false;
                    this.isPayment = true;
                    this.isInvoiceComplet = true;
                }
                if(window.location.pathname == '/preview') {
                    this.isInvoice = false;
                    this.isPayment = false;
                    this.isPreview = true;
                    this.isInvoiceComplet = true;
                    this.isPaymentComplet = true;
                }
            }
        },
        mounted() {
            this.isTabCompleted();
        }
    }
</script>

<style scoped>
    .circle {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.636);
        font-size: 20px;
        line-height: 2.2;
        color: black;
    }

    .line {
        width: 300px;
        margin-top: 30px;
        height: 2px;
        background-color: rgba(0, 0, 0, 0.123);
    }

    button {
        background-color: transparent;
        color: green;
        border-radius: 5px;
        padding: 5px 15px;
        border: 1px solid;
    }

    .currentTab .circle {
        background-color: orange;
        color: white !important;
    }

    .completedTab .circle{
        background-color: green;
        color: white !important;
    }

    .currentTab p{
        color: #ffb62d !important;
    }

    .currentTab p:nth-child(2){
        font-weight: 600;
    }

    .completedTab p{
        color: green !important;
    }

    .greenLine {
        background-color: rgba(0, 128, 0, 0.6);
    }
    @media print {
        #nonPrintable {
            display: none;
        }
    }
</style>