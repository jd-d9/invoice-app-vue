<template>
    <div>
        <navigation-bar id="nonPrintable"></navigation-bar>
        <router-view></router-view>
        <div class="container pb-5">
            <!-- show invoice summary -->
            <div class="form-contents px-4 py-2" id="nonPrintable">
                <div class="accordion accordion-flush" id="accordionFlushExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="flush-headingOne">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                Invoice Summary
                            </button>
                        </h2>
                        <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body mt-2" v-if="invoiceData">
                                <div class="row">
                                    <div class="col-3">
                                        <p class="text-secondary mb-0">Invoice Number</p>
                                        <h6>{{ invoiceData.invoiceDetails.invoiceNumber }}</h6>
                                    </div>
                                    <div class="col-3">
                                        <p class="text-secondary mb-0">Issued Date</p>
                                        <h6>{{ invoiceData.invoiceDetails.invoiceDate }}</h6>
                                    </div>
                                    <div class="col-3">
                                        <p class="text-secondary mb-0">Due Date</p>
                                        <h6>{{ invoiceData.invoiceDetails.invoiceDueDate }}</h6>
                                    </div>
                                    <div class="col-3">
                                        <p class="text-secondary mb-0">Invoice Status</p>
                                        <h6 :class="{ 'text-success': invoiceData.invoiceStatus === 'Paid',  'text-warning': invoiceData.invoiceStatus === 'Unpaid'}">{{ invoiceData.invoiceStatus }}</h6>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-6">
                                        <p class="text-secondary mb-0">Bill By</p>
                                        <h6 class="mb-1">{{ invoiceData.providerAndClientDetails.providerName }}</h6>
                                        <span class="text-secondary">
                                            {{ invoiceData.providerAndClientDetails.providerAddress }},
                                            {{ invoiceData.providerAndClientDetails.providerState }} <br>
                                            {{ invoiceData.providerAndClientDetails.providerCountry }}
                                        </span>
                                    </div>
                                    <div class="col-6">
                                        <p class="text-secondary mb-0">Bill To</p>
                                        <h6 class="mb-1">{{ invoiceData.providerAndClientDetails.clientName }}</h6>
                                        <span class="text-secondary">
                                            {{ invoiceData.providerAndClientDetails.clientAddress }},
                                            {{ invoiceData.providerAndClientDetails.clientState }} <br>
                                            {{ invoiceData.providerAndClientDetails.clientCountry }}
                                        </span>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-3">
                                        <p class="text-secondary mb-0">Total Amount</p>
                                        <h6>{{currencyName.slice(6,)}} {{ totalAmountWithCurrency }}</h6>
                                    </div>
                                    <div class="col-3">
                                        <p class="text-secondary mb-0">Payment Option</p>
                                        <h6>Account Transfer</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- update provider profile -->
            <div class="form-contents px-4 py-2" id="nonPrintable">
                <div class="accordion accordion-flush" id="accordionExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Update Profile
                            </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <div class="row">            
                                    <div class="col-md-4 my-2">
                                        <p class="text-secondary mb-0">Your Name</p>
                                        <input type="text" id="Name" v-model="name">
                                    </div>
                                    <div class="col-md-4 my-2">
                                        <p class="text-secondary mb-0">Email Address</p>
                                        <input type="email" id="emailAddress" v-model="eMail">
                                    </div>
                                    <div class="col-md-4 my-2">
                                        <p class="text-secondary mb-0">Contact Number</p>
                                        <input type="number" id="contactNumber" v-model="contactNo">
                                    </div>
                                    <div class="col-md-12 my-2">
                                        <p class="text-secondary mb-0">Address</p>
                                        <input type="text" id="address" v-model="address">
                                    </div>
                                    <div class="col-md-4 my-2">
                                        <p class="text-secondary mb-0">Country</p>
                                        <select class="dropdown-state-country" @change="selectProviderCountry" v-model="countryName">
                                            <option :value="country.name" v-for="(country, ind) in getAllCountry" :key="ind">{{ country.name }}</option>
                                        </select>
                                    </div>
                                    <div class="col-md-4 my-2">
                                        <p class="text-secondary mb-0">State</p>
                                        <select class="dropdown-state-country" v-model="stateName">
                                            <option v-if="getProviderCountryState.length === 0" selected>No state available</option>
                                            <option :value="state.name" v-for="(state, ind) in getProviderCountryState" :key="ind">{{ state.name }}</option>
                                        </select>
                                    </div>
                                    <div class="col-md-4 my-2">
                                        <p class="text-secondary mb-0">Pincode</p>
                                        <input type="number" id="pinCode" v-model="pinCode">
                                    </div>
                                    <div class="col-md-12 text-center mt-3">
                                        <base-button buttonTitle="Update Details" @click="updateDetails"></base-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- default invoice template -->
            <div class="form-contents p-5" id="element-to-convert" v-if="selectedTemplate === 'Temp-1'" :style="changedFonts">
                <h1 class="mb-5 text-center fw-bold">Invoice</h1>
                <div class="row align-items-end">
                    <div class="col-6">
                        <div class="logo" v-if="invoiceData">
                            <img :src="invoiceData.providerAndClientDetails.providerLogo" class="logo-white" alt="logo">
                        </div>
                    </div>
                    <!-- invoice details -->
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
                <!-- provider and client details -->
                <div class="bill-to-details p-4" :style="backColor">
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
                    <!-- product details -->
                    <div class="col-12">
                        <h5>Product Details</h5>
                        <table class="table mb-0">
                            <thead class="table-head" :style="backColor">
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
                                <tr>
                                    <td colspan="5" class="text-end sub-amount">Rs. {{ totalAmount }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="html2pdf__page-break"></div>
                <div class="row mt-4">
                    <!-- bank/payment details -->
                    <h5>Payment Details</h5>
                    <div class="col-6" v-if="invoiceData.bankDetails">
                        <p class=" my-2">Bank Details</p>
                        <p>Account Number: {{ invoiceData.bankDetails.accountNumber }}</p>
                        <p>Account Holder Name: {{ invoiceData.bankDetails.accountHolderName }}</p>
                        <p>Bank Name: {{ invoiceData.bankDetails.bankName }}</p>
                        <p>IFSC Code: {{ invoiceData.bankDetails.ifscCode }}</p>
                        <p>Mobile Number: {{ invoiceData.bankDetails.mobileNumber }}</p>
                    </div>
                    <div class="col-3 ms-auto" id="collumnWidth">
                        <!-- total amount with currency value -->
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
                                    <th class="text-end total-amount" :style="fontColor">
                                        {{currencyName.slice(6,)}} {{ totalAmountWithCurrency }}
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <additional-details :backColour="backColor"
                :setUserSignature="invoiceData.userSignature" 
                :attachedfile="invoiceData.attachedFile"
                :additionalNoteContent="invoiceData.additionalNote"
                ></additional-details>
            </div>
            <!-- invoice templates -->
            <theme-one :allDatas="invoiceData" v-if="selectedTemplate === 'Temp-2'" :backColour="backColor" :style="changedFonts"></theme-one>
            <theme-two :allDatas="invoiceData" v-if="selectedTemplate === 'Temp-3'" :backColour="backColor" :fontColour="fontColor" :style="changedFonts"></theme-two>
            <!-- select invoice templates -->
            <div class="form-contents px-4 py-2" id="nonPrintable">
                <div class="accordion accordion-flush" id="accordionExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingTwo">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Select Invoice Template
                            </button>
                        </h2>
                        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <div class="row">
                                    <div class="col-md-4" :class="{active: selectedTemplate === 'Temp-1'}">
                                        <div class="template-image" @click.prevent="selectTemplate('Temp-1')">
                                            <img src="../../assets/template-1.png" alt="img" class="img-fluid">
                                        </div>
                                    </div>
                                    <div class="col-md-4" :class="{active: selectedTemplate === 'Temp-2'}">
                                        <div class="template-image" @click.prevent="selectTemplate('Temp-2')">
                                            <img src="../../assets/template-2.png" alt="img" class="img-fluid">
                                        </div>
                                    </div>
                                    <div class="col-md-4" :class="{active: selectedTemplate === 'Temp-3'}">
                                        <div class="template-image" @click.prevent="selectTemplate('Temp-3')">
                                            <img src="../../assets/template-3.png" alt="img" class="img-fluid">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- change color and fonts of template -->
            <div class="form-contents px-4 py-2" id="nonPrintable">
                <div class="accordion accordion-flush" id="accordionFlushExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="flush-headingThree">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                Change Color & Fonts
                            </button>
                        </h2>
                        <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">
                                <div class="row">
                                    <div class="col-md-4">
                                        <p class="text-secondary mb-0">Select Color</p>
                                        <button class="color-button" :value="color" v-for="color in colorValue" :key="color" :style="{'background-color': color}" @click.prevent="selectThemeColor"></button>
                                        <input type="color" class="input-color" v-model="selectColor">
                                        <!-- <label class="or-word">or</label> -->
                                    </div>
                                    <div class="col-md-4">
                                        <p class="text-secondary mb-1">Enter Hexacode</p>
                                        <input type="text" placeholder="#ffb62d" v-model="selectColor">
                                    </div>
                                    <div class="col-md-4">
                                        <p class="text-secondary mb-0">Select Font</p>
                                        <select class="dropdown-state-country" v-model="selectedFonts">
                                            <option value="'Raleway', sans-serif" selected>Raleway</option>
                                            <option value="'Courier New', Courier, monospace">Courier New</option>
                                            <option value="'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif">Gill Sans, Gill Sans MT</option>
                                            <option value="'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif">Franklin Gothic Medium</option>
                                            <option value="'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif">Lucida Sans, Lucida Sans Regular</option>
                                            <option value="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">Segoe UI</option>
                                            <option value="'Times New Roman', Times, serif">Times New Roman</option>
                                            <option value="'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif">Trebuchet MS, Lucida Sans Unicode</option>
                                            <option value="Arial, Helvetica, sans-serif">Arial, Helvetica</option>
                                            <option value="Cambria, Cochin, Georgia, Times, 'Times New Roman', serif">Cambria, Times New Roman</option>
                                            <option value="Georgia, 'Times New Roman', Times, serif">Georgia, Times New Roman</option>
                                            <option value="Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif">Impact, Haettenschweiler</option>
                                            <option value="Verdana, Geneva, Tahoma, sans-serif">Verdana, Geneva</option>
                                            <option value="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif">System-ui, BlinkMacSystemFont</option>
                                            <option value="cursive">Cursive</option>
                                            <option value="fantasy">Fantasy</option>
                                            <option value="monospace">Monospace</option>
                                            <option value="sans-serif">Sans-serif</option>
                                            <option value="serif">Serif</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <teleport to='body'>
            <spin-loader v-if="!invoiceData"></spin-loader>
        </teleport>
    </div>
</template>

<script>
    import { doc, getDoc, updateDoc } from 'firebase/firestore';
    import { db } from '../../firebase/index.js';
    import BaseList from '../UI/BaseList.vue';
    import SpinLoader from '../UI/SpinLoader.vue';
    import AdditionalDetails from '../UI/AdditionalDetails.vue';
    import ThemeOne from './ThemeOne.vue';
    import ThemeTwo from './ThemeTwo.vue';
    export default {
        components: {
            BaseList,
            SpinLoader,
            AdditionalDetails,
            ThemeOne,
            ThemeTwo
        },
        data() {
            return {
                invoiceData: '',
                totalAmount: 0,
                currencyName: 'INR',
                currencyValue: 1,
                getAllCountry: [],
                getProviderCountryState: [],
                imageUrl: '',
                name: '',
                eMail: '',
                contactNo: '',
                address: '',
                countryName: '',
                stateName: '',
                pinCode: '',
                clientName: '',
                clientContact: '',
                clientEmail: '',
                clientAddress: '',
                clientState: '',
                clientCountry: '',
                clientPincode: '',
                emptyProviderState: 'Default',
                selectColor: '#ffb62d',
                colorValue: ['#ffb62d', '#27ae60', '#097dc4', '#ffa3c2', '#deb887', '#7818bd'],
                selectedFonts: "'Raleway', sans-serif",
                ToggleComp: true,
                selectedTemplate: 'Temp-1'
            }
        },
        computed: {
            // Total amount value in selected currency
            totalAmountWithCurrency() {
                return parseFloat(this.totalAmount * this.currencyValue).toFixed(2);
            },
            // for change template color and fonts
            backColor() {
                return {backgroundColor: this.selectColor};
            },
            fontColor() {
                return {color: this.selectColor};
            },
            // for change template fonts
            changedFonts() {
                return {fontFamily: this.selectedFonts}
            },
        },
        methods: {
            // for get and preview invoice data
            async getInvoiceData() {
                const docRef = doc(db, 'invoice-details', this.$route.params.id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    this.invoiceData = docSnap.data();
                } else {
                    console.log('No data found!');
                }
                this.currencyName = this.invoiceData.currency.currencyName;
                this.currencyValue = this.invoiceData.currency.currencyValue;
                this.totalAmount = this.invoiceData.productTotalAmount;
    
                this.imageUrl = this.invoiceData.providerAndClientDetails.providerLogo;
                this.name = this.invoiceData.providerAndClientDetails.providerName;
                this.contactNo = this.invoiceData.providerAndClientDetails.providerContact;
                this.eMail = this.invoiceData.providerAndClientDetails.providerEmail;
                this.address = this.invoiceData.providerAndClientDetails.providerAddress;
                this.stateName = this.invoiceData.providerAndClientDetails.providerState;
                this.countryName = this.invoiceData.providerAndClientDetails.providerCountry;
                this.pinCode = this.invoiceData.providerAndClientDetails.providerPincode;
                this.clientName = this.invoiceData.providerAndClientDetails.clientName;
                this.clientContact = this.invoiceData.providerAndClientDetails.clientContact;
                this.clientEmail = this.invoiceData.providerAndClientDetails.clientEmail;
                this.clientAddress = this.invoiceData.providerAndClientDetails.clientAddress;
                this.clientState = this.invoiceData.providerAndClientDetails.clientState;
                this.clientCountry = this.invoiceData.providerAndClientDetails.clientCountry;
                this.clientPincode = this.invoiceData.providerAndClientDetails.clientPincode;
            },
            // get country list
            getAllCountries() {
                fetch('https://countriesnow.space/api/v0.1/countries/states')
                .then(async (response) => {
                    return await response.json();
                })
                .then((result) => {
                    this.getAllCountry = [];
                    result.data.forEach((country) => {
                        this.getAllCountry.push(country);
                    });
                })
                .catch((error) => {
                    console.log(error);
                })
            },
            // select provider country
            selectProviderCountry() {
                this.getProviderCountryState = [];
                const selectedState = this.getAllCountry.filter((val) => {
                    return val.name === this.countryName;
                })
                selectedState[0].states.forEach((val) => {
                    this.getProviderCountryState.push(val);
                })
                if(this.emptyProviderState === 'Default') {
                    this.stateName = this.invoiceData.providerAndClientDetails.providerState;
                    this.emptyProviderState = this.stateName;
                }
                else if(this.getProviderCountryState.length !== 0) {
                    this.stateName = this.getProviderCountryState[0].name;
                }
                else{
                    this.stateName = 'No state available';
                }
            },
            // update provider data/profile
            async updateDetails() {
                const documentId = this.$route.params.id;
                const paymentRef = doc(db, 'invoice-details', documentId);
                await updateDoc(paymentRef, {
                    providerAndClientDetails: {
                        providerLogo: this.imageUrl,
                        providerName: this.name,
                        providerContact: this.contactNo,
                        providerEmail: this.eMail,
                        providerAddress: this.address,
                        providerState: this.stateName,
                        providerCountry: this.countryName,
                        providerPincode: this.pinCode,
                        clientName: this.clientName,
                        clientContact: this.clientContact,
                        clientEmail: this.clientEmail,
                        clientAddress: this.clientAddress,
                        clientState: this.clientState,
                        clientCountry: this.clientCountry,
                        clientPincode: this.clientPincode,
                    }
                });
                this.$toast.open({
                    message: 'Profile updated',
                    position: 'top-right',
                    duration: '5000',
                    type: 'success'
                });
                this.getInvoiceData();
                this.getAllCountries();
            },
            // change invoice template
            selectTemplate(value) {
                this.selectedTemplate = value
                if(this.selectedTemplate === 'Temp-2') {
                    this.selectColor = '#097dc4';
                }
                else if(this.selectedTemplate === 'Temp-3') {
                    this.selectColor = '#27ae60';
                }
                else{
                    this.selectColor = '#ffb62d';
                }
            },
            // change theme color
            selectThemeColor(e) {
                this.selectColor = e.target.value;
            }
        },
        mounted() {
            this.getInvoiceData();
            this.getAllCountries();
            setTimeout(() => {
                this.selectProviderCountry();
            }, 2500)
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
}
tbody, td, tfoot, th, thead, tr {
    border-style: unset !important;
}
.table-head {
    border-bottom: 1px solid !important;
    background-color: #ffb62d;
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
.accordion-button {
    font-size: 20px;
    font-weight: bold;
    border-bottom: 1px solid transparent !important;
}
.accordion-button:not(.collapsed) {
    color: #ffb62d !important;
    background-color: transparent !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
    transition: all 0.3s ease;
}
.accordion-button:focus {
    box-shadow: none !important;
}
input {
    width: 100%;
    border: none;
    border-bottom: 1px solid black;
    background: transparent;
}
input:focus, textarea:focus {
    outline: none;
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
.dropdown-state-country {
    padding: 4px 0px;
    width: 100%;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid black;
}
.dropdown-state-country:focus-visible {
    outline: none;
}
@font-face {
    font-family: font_awesome;
    src: url(../../assets/fa-solid-900.ttf);
}
/* .or-word {
    transform: translateX(5px);
} */
.input-color, .color-button {
    transform: translateY(5px);
    margin-bottom: 10px;
    position: relative;
    text-align: center;
    width: 45px;
    height: 30px;
    padding: 5px 10px;
    margin: 0 10px 10px 0;
    border: none;
    cursor: pointer;
    border: 1px solid gray;
    border-radius: 5px;
}
.input-color::before {
    content: '\f53f';
    position: absolute;
    font-family: font_awesome;
    font-size: 20px;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 5px;
}
.input-color2 {
    width: 150px;
}
.template-image {
    overflow: hidden;
    border: 3px solid #ffe9c2;
    padding: 10px;
    width: 100%;
    height: 400px;
}
.template-image:hover, .active .template-image {
    cursor: pointer;
    border: 3px solid #ffb62d;
    transition: border 0.4s ease;
}
.template-image img{
    width: 100%;
}

@media print {
    *{
        font-size: 12px !important;
    }
    h1 {
        font-size: 20px !important;
        margin-bottom: 20px !important;
    }
    h5 {
        font-size: 16px !important;
    }
    .bill-to-details {
        padding: 15px 15px !important;
        margin: 15px 0 20px;
    }
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
}
</style>