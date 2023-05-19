<template>
    <div>
        <navigation-bar></navigation-bar>
        <div class="container pb-5" style="height: 100vh;">
            <page-stepper></page-stepper>
            <div class="form-contents p-5">
                <h5 class="text-end">Bank Details</h5>
                <div class="row mt-4">
                    <div class="col-md-6 my-2" :class="{invalidInput: accountNumberInvalid}">
                        <input type="text" id="accountNumber" placeholder="Account Number" v-model="accountNumber" @blur="setAccountNumber">
                        <p class="text-danger mt-2 mb-0" v-if="accountNumberInvalid"><i class="fa-solid fa-circle-exclamation"></i> Please enter valid account number.</p>
                    </div>

                    <div class="col-md-6 my-2" :class="{invalidInput: confirmAccountInvalid}">
                        <input type="text" id="confirmAccNumber" placeholder="Confirm Account Number" v-model="confirmAccountNumber" @blur="setConfirmAccNumber">
                        <p class="text-danger mt-2 mb-0" v-if="confirmAccountInvalid"><i class="fa-solid fa-circle-exclamation"></i> Please re-enter account number.</p>
                    </div>
                    
                    <div class="col-md-12 my-2" :class="{invalidInput: holderNameInvalid}">
                        <input type="text" id="accountHolder" placeholder="Account Holder Name" v-model="accountHolderName" @blur="setAccountHolderName">
                        <p class="text-danger mt-2 mb-0" v-if="holderNameInvalid"><i class="fa-solid fa-circle-exclamation"></i> Please enter account holder name.</p>
                    </div>

                    <div class="col-md-4 my-2" :class="{invalidInput: bankNameInvalid}">
                        <input type="text" id="accountNumber" placeholder="Bank Name" v-model="bankName" @blur="setBankName">
                        <p class="text-danger mt-2 mb-0" v-if="bankNameInvalid"><i class="fa-solid fa-circle-exclamation"></i> Please enter bank name.</p>
                    </div>

                    <div class="col-md-4 my-2" :class="{invalidInput: ifscCodeInvalid}">
                        <input type="text" id="ifscCode" placeholder="IFSC Code" v-model="ifscCode" @blur="setIfscCode">
                        <p class="text-danger mt-2 mb-0" v-if="ifscCodeInvalid"><i class="fa-solid fa-circle-exclamation"></i> Please enter valid IFSC code.</p>
                    </div>

                    <div class="col-md-4 my-2" :class="{invalidInput: mobileInvalid}">
                        <input type="number" id="mobileNumber" placeholder="Mobile Number" v-model="mobileNumber" @blur="setmobileNumber">
                        <p class="text-danger mt-2 mb-0" v-if="mobileInvalid"><i class="fa-solid fa-circle-exclamation"></i> Please enter valid mobile number.</p>
                    </div>
                    <div class="col-12 mt-4 text-end">
                        <base-button buttonTitle="Skip" class="me-4" mode="outline" @click="skipBankDetails"></base-button>
                        <base-button buttonTitle="Add" @click="saveBankDetails"></base-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { doc, getDoc, updateDoc } from 'firebase/firestore';
    import { db } from '../../firebase/index.js';
    export default {
        data() {
            return {
                accountNumber: '',
                confirmAccountNumber: '',
                bankName: '',
                accountHolderName: '',
                ifscCode: '',
                mobileNumber: '',
                accountNumberInvalid: false,
                confirmAccountInvalid: false,
                bankNameInvalid: false,
                holderNameInvalid: false,
                ifscCodeInvalid: false,
                mobileInvalid: false,
            }
        },
        methods: {
            // account number validations
            setAccountNumber() {
                this.accountNumberInvalid = false;
                const validateAccount = /^[0-9]*$/;
                if(!this.accountNumber || !this.accountNumber.match(validateAccount)) {
                    this.accountNumberInvalid = true;
                }
                else {
                    this.accountNumberInvalid = false;
                }
            },
            setConfirmAccNumber() {
                this.confirmAccountInvalid = false;
                if(!this.confirmAccountNumber || !this.confirmAccountNumber.match(this.accountNumber)) {
                    this.confirmAccountInvalid = true;
                }
                else {
                    this.confirmAccountInvalid = false;
                }
            },
            // holder name validation
            setAccountHolderName() {
                this.holderNameInvalid = false;
                if(!this.accountHolderName) {
                    this.holderNameInvalid = true;
                }
                else {
                    this.holderNameInvalid = false;
                }
            },
            // bank name validation
            setBankName() {
                const bankName = /^[a-zA-Z ]+$/;
                this.bankNameInvalid = false;
                if(!this.bankName || !this.bankName.match(bankName)) {
                    this.bankNameInvalid = true;
                }
                else {
                    this.bankNameInvalid = false;
                }
            },
            // ifsc validation
            setIfscCode() {
                this.ifscCodeInvalid = false;
                if(!this.ifscCode) {
                    this.ifscCodeInvalid = true;
                }
                else{
                    this.ifscCodeInvalid = false;
                }
            },
            // mobile number validation
            setmobileNumber() {
                this.mobileInvalid = false;
                if(!this.mobileNumber || this.mobileNumber.toString().length !== 10) {
                    this.mobileInvalid = true;
                }
                else {
                    this.mobileInvalid = false;
                }
            },
            // submit bank details
            async saveBankDetails() {
                this.setAccountNumber();
                this.setConfirmAccNumber();
                this.setAccountHolderName();
                this.setBankName();
                this.setIfscCode();
                this.setmobileNumber();
                if(this.accountNumberInvalid || this.confirmAccountInvalid || this.holderNameInvalid || this.bankNameInvalid || this.ifscCodeInvalid || this.mobileInvalid) {
                    return false;
                }
                else {
                    const documentId = this.$route.params.id;
                    const paymentRef = doc(db, 'invoice-details', documentId);
                    await updateDoc(paymentRef, {
                        bankDetails: {
                            accountNumber: this.accountNumber,
                            accountHolderName: this.accountHolderName,
                            bankName: this.bankName,
                            ifscCode: this.ifscCode,
                            mobileNumber: this.mobileNumber
                        }
                    });
                    this.$router.push('/preview/' + documentId);
                    this.$toast.open({
                        message: 'Payment details successfully saved',
                        position: 'top-right',
                        duration: '5000',
                        type: 'success'
                    });
                    localStorage.removeItem('duplicateInvoiceId');
                }
            },
            // skip bank details
            async skipBankDetails() {
                const documentId = this.$route.params.id;
                const paymentRef = doc(db, 'invoice-details', documentId);
                await updateDoc(paymentRef, {
                    bankDetails: {
                        accountNumber: '',
                        accountHolderName: '',
                        bankName: '',
                        ifscCode: '',
                        mobileNumber: ''
                    }
                });
                this.$router.push('/preview/' + documentId);
                localStorage.removeItem('duplicateInvoiceId');
            },
            // duplicate payment details
            async duplicatePaymentDetails() {
                const invoiceId = localStorage.getItem('duplicateInvoiceId');
                const docRef = doc(db, 'invoice-details', invoiceId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const duplicatePaymentDetails = docSnap.data().bankDetails;
                    this.accountNumber = duplicatePaymentDetails.accountNumber;
                    this.confirmAccountNumber = duplicatePaymentDetails.accountNumber;
                    this.bankName = duplicatePaymentDetails.bankName;
                    this.accountHolderName = duplicatePaymentDetails.accountHolderName;
                    this.ifscCode = duplicatePaymentDetails.ifscCode;
                    this.mobileNumber = duplicatePaymentDetails.mobileNumber;
                } else {
                    console.log('No data found!');
                }
            }
        },
        mounted() {
            this.duplicatePaymentDetails();
        },
    }
</script>

<style scoped>
.form-contents {
    box-shadow: 0 0 6px rgb(183, 183, 183);
    border-radius: 5px;
    margin-top: 40px;
    background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(../../assets/world-map.png);
    background-size: contain;
    background-position: calc(100px);
}
label {
    margin-bottom: 5px;
}
input {
    border: none;
    border-bottom: 1px solid black;
    padding: 8px 5px;
    background: transparent;
}
h5 {
    color: #ffa600;
}

.form-contents input{
    width: 100%;
}
input:focus, textarea:focus {
    outline: none;
}
.invalidInput input {
    border-color: red;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active  {
    transition: background-color 5000s;
}
</style>