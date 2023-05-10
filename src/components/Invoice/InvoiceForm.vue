<template>
    <div>
        <navigation-bar></navigation-bar>
        <div class="container pb-5">
            <page-stepper></page-stepper>
            <div class="invoice-form text-black p-5">
                <button class="back-button" @click.prevent="backToDashboard">
                    <i class="fa-solid fa-arrow-left text-white"></i>
                </button>
                <h1 class="text-center mb-5">Create Invoice</h1>
                <billing-details @provider-and-client-details="submitDetails" @duplicate-invoice-data="duplicateInvoiceData">
                    <template v-slot:dateContentSlot>
                        <div class="row">
                            <div class="col-7 ms-auto">
                                <h5 class="mb-0 text-end">Invoice</h5>
                                <div class="date-contents mt-3">
                                    <table cellpadding="5" class="ms-auto">
                                        <tr>
                                            <td>
                                                <label for="invoiceNumber">Invoice No:</label>
                                            </td>
                                            <td>
                                                <input type="text" class="text-end" id="invoiceNumber" placeholder="Invoice Number" v-model="invoiceNumber">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="invoiceDate">Issue Date:</label>
                                            </td>
                                            <td>
                                                <input type="date" class="text-end" id="invoiceDate" v-model="invoiceDate">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="invoiceDueDate">Due date:</label>
                                            </td>
                                            <td>
                                                <input type="date" class="text-end" id="invoiceDueDate" v-model="invoiceDueDate" :min="invoiceDate">
                                            </td>
                                        </tr>
                                        <tr v-for="(field, ind) in newFieldData" :key="ind">
                                            <td>
                                                <i class="fa-solid fa-xmark text-danger delete-button" @click.prevent="deleteFeild(ind)"></i>
                                                <input type="text" placeholder="Field Name" v-model="field.fieldName" @blur="isFieldBlur" @focus="isFieldFocus">
                                            </td>
                                            <td>
                                                <input type="text" class="text-end" placeholder="Value" v-model="field.fieldValue">
                                            </td>
                                        </tr>
                                    </table>
                                    <div class="text-end">
                                        <button class="add-field mt-2" @click.prevent="addNewField">Add Field</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </billing-details>
                <product-table @save-product-details="submitProductDetails" :duplicateProductDetailsVal="duplicateProduct" :duplicateCurrencyVal="duplicateCurrency"></product-table>
                <signature-pad @set-signature="setSignature" :getDuplicateUserSign="userSignature" @save-attachments="setAttachmentFile" :getDuplicateAttcFiles="attachedFiles"></signature-pad>
                <div class="row" v-if="toggleElements">
                    <div class="col-12 my-5">
                        <h2>Add Note</h2>
                        <jodit-editor v-model="noteContent"/>
                    </div>
                </div>
                <div class="text-center">
                    <base-button value="Draft" class="me-4" buttonTitle="Save as Draft" mode="outline" @click="submitAllDetails" v-if="toggleElement"></base-button>
                    <base-button value="Invoice" buttonTitle="Continue" @click="submitAllDetails"></base-button>
                </div>
            </div>
        </div>
        <teleport to='body'>
            <spin-loader v-if="!toggleElements"></spin-loader>
        </teleport>
    </div>
</template>

<script>
    import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
    import { db } from '../../firebase/index.js';
    import moment from 'moment';
    import ProductTable from './ProductTable.vue';
    import BillingDetails from './BillingDetails.vue';
    import SignaturePad from './SignaturePad.vue';
    import SpinLoader from '../UI/SpinLoader.vue';
    import { JoditEditor } from 'jodit-vue';
    import 'jodit/build/jodit.min.css';

    export default {
        components: {
            ProductTable,
            BillingDetails,
            SignaturePad,
            JoditEditor,
            SpinLoader
        },
        data() {
            return {
                invoiceNumber: Math.random().toString().slice(2,8),
                invoiceDate: moment(new Date()).format('YYYY-MM-DD'),
                invoiceDueDate: '',
                documentId: '',
                userSignature: '',
                attachedFiles: [],
                noteContent: '',
                newFieldData: [],
                isFocused: true,
                duplicateInvoiceArray: [],
                duplicateProduct: [],
                duplicateCurrency: {},
                toggleElement: true,
                totalProductAmount: '',
                toastMessage: '',
            }
        },
        computed: {
            toggleElements() {
                return !this.$route.params.id ? true : this.noteContent && this.noteContent;
            }
        },
        methods: {
            // add and delete field
            addNewField() {
                const emptyField = {
                    fieldName: '',
                    fieldValue: ''
                }
                this.newFieldData.push(emptyField);
            },
            deleteFeild(ind) {
                this.newFieldData.splice(ind, 1);
            },
            // for adding behaviour on input field
            isFieldFocus(e) {
                const input = e.target;
                window.$(input).css({'border-bottom':'1px solid black'});
            },
            isFieldBlur(e) {
                const input = e.target;
                window.$(input).css({'border-bottom':'1px dashed gray'});
            },
            backToDashboard() {
                this.$router.push('/dashboard');
            },
            // submit invoice details
            async submitAllDetails(e) {
                if(!this.invoiceDueDate) {
                    this.$toast.open({
                        message: 'Please fill above details first.',
                        position: 'top-right',
                        duration: '5000',
                        type: 'error'
                    });
                    return false;
                }
                const response = await addDoc(collection(db, 'invoice-details'), {
                    logInId: localStorage.getItem('userId'),
                    invoiceStatus: e.target.value,
                    invoiceType: 'Active',
                    userSignature: this.userSignature,
                    attachedFile: this.attachedFiles,
                    additionalNote: this.noteContent,
                    invoiceDetails: {
                        invoiceNumber: this.invoiceNumber,
                        invoiceDate: this.invoiceDate,
                        invoiceDueDate: this.invoiceDueDate
                    },
                    fieldDetails: this.newFieldData,
                });
                this.documentId = response._key.path.segments[1];
                if(e.target.value === 'Draft') {
                    this.toastMessage = 'Details saved as draft.';
                }else {
                    this.toastMessage = 'Detailed added, Now please fill payment details.';
                }
                this.$toast.open({
                    message: this.toastMessage,
                    position: 'top-right',
                    duration: '5000',
                    type: 'success'
                });
                if(e.target.value === 'Invoice'){
                    localStorage.setItem('duplicateInvoiceId', this.$route.params.id);
                    this.$router.push('/payment/' + this.documentId);
                }else{
                    this.$router.push('/dashboard');
                }
            },
            // for provider and client details
            async submitDetails(data) {
                if(this.documentId) {
                    const userDataRef = doc(db, 'invoice-details', this.documentId);
                    await updateDoc(userDataRef, {
                        providerAndClientDetails: data
                    });
                }
            },
            // for product details
            async submitProductDetails(productData, currencyData) {
                if(this.documentId) {
                    // do total of amount
                    if(productData.length > 1) {
                        this.totalProductAmount = productData.reduce((valOne, valTwo) => {
                            return (valOne.amount ? valOne.amount : valOne) + valTwo.amount;
                        })
                    }else {
                        this.totalProductAmount = productData[0].amount;
                    }
                    const productRef = doc(db, 'invoice-details', this.documentId);
                    await updateDoc(productRef, {
                        productDetails: productData,
                        currency: currencyData,
                        productTotalAmount: this.totalProductAmount,
                    });
                }
            },
            // for product details
            setSignature(data) {
                this.userSignature = data;
            },
            setAttachmentFile(data) {
                this.attachedFiles = data;
            },
            duplicateInvoiceData(data) {
                this.duplicateInvoiceArray = data.filter((val) => {
                    return val.id === this.$route.params.id;
                })
                this.duplicateProduct = this.duplicateInvoiceArray[0].productDetails;
                this.invoiceDueDate = this.duplicateInvoiceArray[0].invoiceDetails.invoiceDueDate;
                this.userSignature = this.duplicateInvoiceArray[0].userSignature;
                this.attachedFiles = this.duplicateInvoiceArray[0].attachedFile;
                this.newFieldData = this.duplicateInvoiceArray[0].fieldDetails;
                this.duplicateCurrency = this.duplicateInvoiceArray[0].currency;
                this.noteContent = this.duplicateInvoiceArray[0].additionalNote;
            }
        },
        mounted() {
            if(window.location.pathname == '/create-invoice/' + this.$route.params.id) {
                this.toggleElement = false;
            }
        }
    }
</script>

<style scoped>
.invoice-form {
    position: relative;
    box-shadow: 0 0 6px rgb(183, 183, 183);
    border-radius: 5px;
}
.back-button {
    position: absolute;
    background-color: #ffb62d;
    top: 50px;
    left: 50px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    box-shadow: 0 0 4px rgb(172, 172, 172);
}
h2 {
    color: #ffb62d;
}
.date-contents input {
    transform: translateY(-5px);
    border: none;
    border-bottom: 1px solid black;
    background: transparent;
    width: 140px;
}
.date-contents label {
    width: 140px;
}
input[type="date"]::-webkit-calendar-picker-indicator {
    filter: opacity(0.7);
}
input:focus, textarea:focus {
    outline: none;
}
.add-field {
    width: 150px;
    text-align: center;
    padding: 4px 5px;
    background: #ffb62d;
    color: white;
    box-shadow: 0 0 4px rgb(172, 172, 172);
    border: none;
    cursor: pointer;
}
.delete-button {
    cursor: pointer;
    margin: 0 8px 0 -22px;
}
</style>