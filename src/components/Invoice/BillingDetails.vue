<template>
    <form>
        <div>
            <div class="row align-items-end">
                <div class="col-5">
                    <div class="d-flex justify-content-start align-items-center gap-3">
                        <div class="profile-photo">
                            <img :src="sourceImage" alt="logo">
                            <i class="fa-solid fa-trash-can text-danger" v-if="imageUrl" title="Remove logo" @click="removeDisplayImage"></i>
                        </div>
                        <div class="d-flex gap-2">
                            <label class="upload-image text-white"> Upload Logo
                                <input type="file" accept="image/*" class="d-none" @change="profilePhoto">
                            </label>
                            <label class="text-center my-1 text-secondary">or</label>
                            <image-modal @select-image-create="setExistingImage" :setSelectedImage="sourceImage"></image-modal>
                        </div>
                    </div>
                </div>
                <div class="col-6 ms-auto">
                    <slot name="dateContentSlot"></slot>
                </div>
            </div>
        </div>
        <div class="form-contents p-4">
            <div class="row align-items-center">
                <div class="col-6">
                    <h5 class="text-black">Bill By</h5>
                    <div class="row">
                        <div class="col-10">
                            <div class="dropdown-center mb-2">
                                <button class="btn dropdown-toggle text-secondary w-100 border-dark" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <div class="d-flex justify-content-start align-items-center">
                                        <div class="logo-image">
                                            <img :src="sourceImage" alt="img">
                                        </div>
                                        <p class="mb-0 ms-2">{{ selectProviderHead }}</p>
                                    </div>
                                </button>
                                <ul class="dropdown-menu w-100">
                                    <li v-if="mergeDuplicateProvider.length == 0" class="text-center py-2">Please create atleast one provider</li>
                                    <li v-for="provider in mergeDuplicateProvider" :key="provider">
                                        <a class="dropdown-item" href="javascript:void(0)" @click="selectProvider(provider.id)">
                                            <div class="d-flex justify-content-start align-items-center">
                                                <div class="logo-image">
                                                    <img :src="provider.providerAndClientDetails.providerLogo" alt="img">
                                                </div>
                                                <p class="mb-0 ms-2">{{ provider.providerAndClientDetails.providerName }}</p>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-10 my-2" :class="{invalidInput: !nameInvalid}">
                            <input type="text" id="Name" placeholder="Your Name" v-model="providerName" @blur="nameIsValid">
                            <p class="text-danger mt-2 mb-0" v-if="!nameInvalid"><i class="fa-solid fa-circle-exclamation"></i> Please enter your name.</p>
                        </div>
                        <div class="col-md-10 my-2" :class="{invalidInput: !mailIsInvalid}">
                            <input type="email" id="emailAddress" placeholder="Email Address" v-model="providerEmail" @blur="mailIsValid">
                            <p class="text-danger text-start mt-2 mb-0" v-if="!mailIsInvalid"><i class="fa-solid fa-circle-exclamation"></i> Please enter valid email address.</p>
                        </div>
                        <div class="col-md-10 my-2" :class="{invalidInput: !contactInvalid}">
                            <input type="number" id="contactNumber" placeholder="Contact Number" v-model="providerContact" @blur="contactIsValid">
                            <p class="text-danger mt-2 mb-0" v-if="!contactInvalid"><i class="fa-solid fa-circle-exclamation"></i> Please enter valid contact number.</p>
                        </div>
                        <div class="col-md-10 my-2">
                            <input type="text" id="address" placeholder="Address" v-model="providerAddress">
                        </div>
                        <div class="col-md-5 my-2">
                            <select class="dropdown-state-country" @change="selectProviderCountry" v-model="countryName">
                                <option :value="country.name" v-for="(country, ind) in getAllCountry" :key="ind">{{ country.name }}</option>
                            </select>
                        </div>
                        <div class="col-md-5 my-2">
                            <select class="dropdown-state-country" v-model="stateName">
                                <option v-if="getProviderCountryState.length === 0" selected>No state available</option>
                                <option :value="state.name" v-for="(state, ind) in getProviderCountryState" :key="ind">{{ state.name }}</option>
                            </select>
                        </div>
                        <div class="col-md-5 my-2">
                            <input type="number" id="pinCode" placeholder="Pincode" v-model="pinCode">
                        </div>
                    </div>                    
                </div>
                <div class="col-6 text-end">
                    <h5 class="text-end text-black">Bill To</h5>
                    <div class="row">
                        <div class="col-10 ms-auto">
                            <div class="dropdown-center mb-2">
                                <button class="btn dropdown-toggle text-secondary w-100 border-dark" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <div class="d-flex justify-content-start align-items-center">
                                        <div class="logo-image">
                                            <img src="../../assets/default-image.png" alt="img">
                                        </div>
                                        <p class="mb-0 ms-2">{{ selectClientHead }}</p>
                                    </div>    
                                </button>
                                <ul class="dropdown-menu w-100">
                                    <li v-if="mergeDuplicateClient.length == 0" class="text-center py-2">Please create atleast one client</li>
                                    <li v-for="client in mergeDuplicateClient" :key="client">
                                        <a class="dropdown-item" href="javascript:void(0)" @click="selectClient(client.id)">
                                            <div class="d-flex justify-content-start align-items-center">
                                                <div class="logo-image">
                                                    <img src="../../assets/default-image.png" alt="img">
                                                </div>
                                                <p class="mb-0 ms-2">{{ client.providerAndClientDetails.clientName }}</p>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-10 ms-auto my-2" :class="{invalidInput: !clientNameInvalid}">
                            <input type="text" id="clientName" placeholder="Client Name" v-model="clientName" @blur="clientNameIsValid">
                            <p class="text-danger text-start mt-2 mb-0" v-if="!clientNameInvalid"><i class="fa-solid fa-circle-exclamation"></i> Please enter client's name.</p>
                        </div>
                        <div class="col-md-10 ms-auto my-2" :class="{invalidInput: !emailIsInvalid}">
                            <input type="email" id="clientEmail" placeholder="Email Address" v-model="clientEmail" @blur="emailIsValid">
                            <p class="text-danger text-start mt-2 mb-0" v-if="!emailIsInvalid"><i class="fa-solid fa-circle-exclamation"></i> Please enter valid email address.</p>
                        </div>
                        <div class="col-md-10 ms-auto my-2" :class="{invalidInput: !clientContactInvalid}">
                            <input type="number" id="clientNumber" placeholder="Contact Number" v-model="clientContact" @blur="clientContactIsValid">
                            <p class="text-danger text-start mt-2 mb-0" v-if="!clientContactInvalid"><i class="fa-solid fa-circle-exclamation"></i> Please enter valid contact number.</p>
                        </div>
                        <div class="col-md-10 ms-auto my-2">
                            <input type="text" id="address" placeholder="Address" v-model="clientAddress">
                        </div>
                        <div class="col-md-5 ms-auto my-2 client-country">
                            <select class="dropdown-state-country" @change="selectClientCountry" v-model="clientCountry">
                                <option :value="country.name" v-for="(country, ind) in getAllCountry" :key="ind">{{ country.name }}</option>
                            </select>
                        </div>
                        <div class="col-md-5 ms-auto my-2">
                            <select class="dropdown-state-country" v-model="clientState">
                                <option v-if="getClientCountryState.length === 0" selected>No state available</option>
                                <option :value="state.name" v-for="(state, ind) in getClientCountryState" :key="ind">{{ state.name }}</option>
                            </select>
                        </div>
                        <div class="col-md-5 ms-auto my-2">
                            <input type="number" id="pincode" placeholder="Pincode" v-model="clientPincode">
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    </form>
</template>

<script>
    import { collection, query, getDocs, where } from 'firebase/firestore';
    import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
    import { db } from '../../firebase/index.js';
    export default {
        emits: ['provider-and-client-details', 'duplicate-invoice-data'],
        data() {
            return {
                providerName: '',
                providerContact: '',
                providerEmail: '',
                providerAddress: '',
                pinCode: '',
                stateName: 'Gujarat',
                countryName: 'India',
                clientName: '',
                clientContact: '',
                clientEmail: '',
                clientAddress: '',
                clientPincode: '',
                clientState: 'Karnataka',
                clientCountry: 'India',
                imageUrl: '',
                getAllCountry: [],
                getProviderCountryState: [],
                getClientCountryState: [],
                emailIsInvalid: true,
                mailIsInvalid: true,
                nameInvalid: true,
                contactInvalid: true,
                clientNameInvalid: true,
                clientContactInvalid: true,
                allInvoices: [],
                selectedProvider: [],
                selectedClient: [],
                mergeDuplicateProvider: [],
                mergeDuplicateClient: [],
                emptyProviderState: '',
                emptyClientState: '',
            }
        },
        computed: {
            // to set default image if not any seleceted image
            sourceImage() {
                return this.imageUrl ? this.imageUrl : 'https://www.tnagrisnet.tn.gov.in/KaviaDP/includes/images/no_im.png';
            },
            // dynamically add dropdown heading
            selectProviderHead() {
                return this.providerName ? this.providerName : 'Select a Provider';
            },
            selectClientHead() {
                return this.clientName ? this.clientName : 'Select a Client';
            }
        },  
        methods: {
            // validations
            nameIsValid() {
                const regName = /^[a-zA-Z ]+$/;
                this.nameInvalid = true;
                if(!this.providerName || !this.providerName.match(regName)) {
                    this.nameInvalid = false;
                }
                else {
                    this.nameInvalid = true;
                }
            },
            contactIsValid() {
                this.contactInvalid = true;
                if(!this.providerContact || this.providerContact.toString().length !== 10) {
                    this.contactInvalid = false;
                }
                else {
                    this.contactInvalid = true;
                }
            },
            clientNameIsValid() {
                const regName = /^[a-zA-Z ]+$/;
                this.clientNameInvalid = true;
                if(!this.clientName || !this.clientName.match(regName)) {
                    this.clientNameInvalid = false;
                }
                else {
                    this.clientNameInvalid = true;
                }
            },
            clientContactIsValid() {
                this.clientContactInvalid = true;
                if(!this.clientContact || this.clientContact.toString().length !== 10) {
                    this.clientContactInvalid = false;
                }
                else {
                    this.clientContactInvalid = true;
                }
            },
            emailIsValid() {
                this.emailIsInvalid = true;
                const mailFormat = /^[^@]+@\w+(\.\w+)+\w$/;
                if(!this.clientEmail.match(mailFormat)) {
                    this.emailIsInvalid = false;
                }
                else {
                    this.emailIsInvalid = true;
                }
            },
            mailIsValid() {
                this.mailIsInvalid = true;
                const mailFormat = /^[^@]+@\w+(\.\w+)+\w$/;
                if(!this.providerEmail.match(mailFormat)) {
                    this.mailIsInvalid = false;
                }
                else {
                    this.mailIsInvalid = true;
                }
            },
            // upload and get image url from firebase storage
            profilePhoto(event) {
                const imageObject = event.target.files[0];
                const storage = getStorage();
                const storageRef = ref(storage, 'images/' + imageObject.name);
                const uploadTask = uploadBytesResumable(storageRef, imageObject);
                uploadTask.on('state_changed', 
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    let message = 'Uploading image, ' + progress + '% done.'
                    if(progress == 100) {
                        message = 'Image Uploaded';
                    }
                    this.$toast.open({
                        message: message,
                        position: 'top-right',
                        duration: '5000',
                        type: 'success'
                    });
                }, 
                (error) => {
                    console.log(error)
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        this.imageUrl = downloadURL;
                    });
                });
            },
            setExistingImage(data) {
                this.imageUrl = data;
            },
            // remove image from ui
            removeDisplayImage() {
                this.imageUrl = '';
            },
            // save data to database
            setClientAndproviderDetails() {
                this.nameIsValid();
                this.contactIsValid();
                this.mailIsValid();
                this.emailIsValid();
                this.clientNameIsValid();
                this.clientContactIsValid();
                if(!this.nameInvalid || !this.contactInvalid || !this.clientNameInvalid || !this.clientContactInvalid || !this.emailIsInvalid || !this.mailIsInvalid) {
                    return false;
                }
                const clientAndProvider = {
                    providerLogo: this.imageUrl,
                    providerName: this.providerName,
                    providerContact: this.providerContact,
                    providerEmail: this.providerEmail,
                    providerAddress: this.providerAddress,
                    providerPincode: this.pinCode,
                    providerState: this.stateName,
                    providerCountry: this.countryName,
                    clientName: this.clientName,
                    clientContact: this.clientContact,
                    clientEmail: this.clientEmail,
                    clientAddress: this.clientAddress,
                    clientPincode: this.clientPincode,
                    clientState: this.clientState,
                    clientCountry: this.clientCountry,
                }
                this.$emit('provider-and-client-details', clientAndProvider);
            },
            // for get and store all invoices data
            async getAllInvoices() {
                const q = query(collection(db, 'invoice-details'), where('logInId', '==', localStorage.getItem('userId')));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    this.allInvoices.push({...doc.data(), id: doc.id});
                });
                this.removeDuplicateProvider();
                this.removeDuplicateClient();
            },
            // remove duplicates from existing provider dropdowns
            removeDuplicateProvider() {
                this.mergeDuplicateProvider = [];
                const unique = this.allInvoices.filter((element) => {
                    if(this.mergeDuplicateProvider.length === 0) {
                        this.mergeDuplicateProvider.push(element);
                    }
                    else{
                        let isDuplicate = this.mergeDuplicateProvider.findIndex((val) => {
                            return val.providerAndClientDetails.providerName.toUpperCase().includes(element.providerAndClientDetails.providerName.toUpperCase());
                        })
                        if (isDuplicate === -1) {
                            this.mergeDuplicateProvider.push(element);
                            return true;
                        }
                    }
                    return false;
                });
                return unique;
            },
            // remove duplicates from existing client dropdowns
            removeDuplicateClient() {
                this.mergeDuplicateClient = [];
                const unique = this.allInvoices.filter((element) => {
                    if(this.mergeDuplicateClient.length === 0) {
                        this.mergeDuplicateClient.push(element);
                    }
                    else{
                        var isDuplicate = this.mergeDuplicateClient.findIndex((val) => {
                            return val.providerAndClientDetails.clientName.toUpperCase().includes(element.providerAndClientDetails.clientName.toUpperCase());
                        })
                        if (isDuplicate === -1) {
                            this.mergeDuplicateClient.push(element);
                            return true;
                        }
                    }
                    return false;
                });
                return unique;
            },
            selectProvider(id) {
                this.selectedProvider = this.allInvoices.filter((val) => {
                    return val.id === id
                });
                this.imageUrl = this.selectedProvider[0].providerAndClientDetails.providerLogo;
                this.providerName = this.selectedProvider[0].providerAndClientDetails.providerName;
                this.providerContact = this.selectedProvider[0].providerAndClientDetails.providerContact;
                this.providerEmail = this.selectedProvider[0].providerAndClientDetails.providerEmail;
                this.providerAddress = this.selectedProvider[0].providerAndClientDetails.providerAddress;
                this.pinCode = this.selectedProvider[0].providerAndClientDetails.providerPincode;
                this.countryName = this.selectedProvider[0].providerAndClientDetails.providerCountry;
                this.stateName = this.selectedProvider[0].providerAndClientDetails.providerState;
                this.emptyProviderState = this.selectedProvider[0].providerAndClientDetails.providerState;
                this.selectProviderCountry();
            },
            selectClient(id) {
                this.selectedClient = this.allInvoices.filter((val) => {
                    return val.id === id
                });
                this.clientName = this.selectedClient[0].providerAndClientDetails.clientName;
                this.clientContact = this.selectedClient[0].providerAndClientDetails.clientContact;
                this.clientEmail = this.selectedClient[0].providerAndClientDetails.clientEmail;
                this.clientAddress = this.selectedClient[0].providerAndClientDetails.clientAddress;
                this.clientPincode = this.selectedClient[0].providerAndClientDetails.clientPincode;
                this.clientCountry = this.selectedClient[0].providerAndClientDetails.clientCountry;
                this.clientState = this.selectedClient[0].providerAndClientDetails.clientState;
                this.emptyClientState = this.selectedClient[0].providerAndClientDetails.clientState;
                this.selectClientCountry();
            },
            duplicatInvoiceData() {
                const invoiceId = this.$route.params.id;
                setTimeout(() => {
                    this.selectProvider(invoiceId);
                    this.selectClient(invoiceId);
                    this.$emit('duplicate-invoice-data', this.allInvoices);
                }, 2000);
            },
            // get country and their states
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
            selectProviderCountry() {
                this.getProviderCountryState = [];
                const selectedState = this.getAllCountry.filter((val) => {
                    return val.name === this.countryName;
                })
                selectedState[0].states.forEach((val) => {
                    this.getProviderCountryState.push(val);
                })
                if(this.emptyProviderState) {
                    this.stateName = this.selectedProvider[0].providerAndClientDetails.providerState;
                    this.emptyProviderState = '';
                }
                else if(this.getProviderCountryState.length !== 0) {
                    this.stateName = this.getProviderCountryState[0].name;
                }
                else{
                    this.stateName = 'No state available';
                }
            },
            selectClientCountry() {
                this.getClientCountryState = [];
                const selectedState = this.getAllCountry.filter((val) => {
                    return val.name === this.clientCountry;
                })
                selectedState[0].states.forEach((val) => {
                    this.getClientCountryState.push(val);
                })
                if(this.emptyClientState) {
                    this.clientState = this.selectedClient[0].providerAndClientDetails.clientState;
                    this.emptyClientState = '';
                }
                else if(this.getClientCountryState.length !== 0) {
                    this.clientState = this.getClientCountryState[0].name;
                }
                else{
                    this.clientState = 'No state available';
                }
            }
        },
        mounted() {
            this.getAllInvoices();
            this.getAllCountries();
            if(this.$route.params.id) {
                this.duplicatInvoiceData();
            }else {
                setTimeout(() => {
                    this.selectProviderCountry();
                    this.selectClientCountry();
                }, 1100)
            }
        },
        unmounted() {
            this.setClientAndproviderDetails();
        }
    }
</script>

<style scoped>

.form-contents {
    margin: 30px 0;
    border-radius: 10px;
    background-color: rgba(255, 166, 0, 0.9);
}

.profile-photo {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border: 1px solid black;
    width: 140px;
    height: 140px;
}
.profile-photo img {
    width: 100%;
    height: auto;
}
.profile-photo i {
    position: absolute;
    cursor: pointer;
    right: -15px;
    bottom: -15px;
}
.profile-photo:hover i {
    right: 10px;
    bottom: 10px;
    transition: all 0.4s ease;
}
.upload-image {
    width: 150px;
    text-align: center;
    padding: 4px 5px;
    background: #ffb62d;
    box-shadow: 0 0 4px rgb(172, 172, 172);
    border: none;
    cursor: pointer;
}
.logo-image img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
.dropdown-toggle::after {
    position: absolute;
    top: 48% !important;
    right: 3% !important;
}
input {
    width: 100%;
    border: none;
    border-bottom: 1px solid black;
    background: transparent;
}
h5 {
    color: #ffb62d;
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
.client-country {
    transform: translateX(49px);
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