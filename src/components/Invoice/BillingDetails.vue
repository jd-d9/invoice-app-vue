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
                                    <li v-if="allInvoices.length == 0" class="text-center py-2">Please create atleast one provider</li>
                                    <li v-for="provider in allInvoices" :key="provider">
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
                            <input type="text" id="country" placeholder="Country" v-model="countryName">
                        </div>
                        <div class="col-md-5 my-2">
                            <input type="text" id="state" placeholder="State" v-model="stateName">
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
                                            <img src="../../assets/img1.jpg" alt="img">
                                        </div>
                                        <p class="mb-0 ms-2">{{ selectClientHead }}</p>
                                    </div>    
                                </button>
                                <ul class="dropdown-menu w-100">
                                    <li v-if="allInvoices.length == 0" class="text-center py-2">Please create atleast one client</li>
                                    <li v-for="client in allInvoices" :key="client">
                                        <a class="dropdown-item" href="javascript:void(0)" @click="selectClient(client.id)">
                                            <div class="d-flex justify-content-start align-items-center">
                                                <div class="logo-image">
                                                    <img :src="client.providerAndClientDetails.providerLogo" alt="img">
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
                        <div class="col-md-5 ms-auto my-2">
                            <input type="text" id="country" placeholder="Country" v-model="clientCountry">
                        </div>
                        <div class="col-md-5 my-2">
                            <input type="text" id="state" placeholder="State" v-model="clientState">
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
                stateName: '',
                countryName: '',
                clientName: '',
                clientContact: '',
                clientEmail: '',
                clientAddress: '',
                clientPincode: '',
                clientState: '',
                clientCountry: '',
                imageUrl: '',
                emailIsInvalid: true,
                mailIsInvalid: true,
                nameInvalid: true,
                contactInvalid: true,
                clientNameInvalid: true,
                clientContactInvalid: true,
                allInvoices: [],
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
                    }
                );
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
            // for get and show all invoices
            async getAllInvoices() {
                const q = query(collection(db, 'invoice-details'), where('logInId', '==', localStorage.getItem('userId')));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    this.allInvoices.push({...doc.data(), id: doc.id});
                });
            },
            selectProvider(id) {
                const selectedProvider = this.allInvoices.filter((val) => {
                    return val.id == id
                });
                this.imageUrl = selectedProvider[0].providerAndClientDetails.providerLogo;
                this.providerName = selectedProvider[0].providerAndClientDetails.providerName;
                this.providerContact = selectedProvider[0].providerAndClientDetails.providerContact;
                this.providerEmail = selectedProvider[0].providerAndClientDetails.providerEmail;
                this.providerAddress = selectedProvider[0].providerAndClientDetails.providerAddress;
                this.pinCode = selectedProvider[0].providerAndClientDetails.providerPincode;
                this.stateName = selectedProvider[0].providerAndClientDetails.providerState;
                this.countryName = selectedProvider[0].providerAndClientDetails.providerCountry;
            },
            selectClient(id) {
                const selectedClient = this.allInvoices.filter((val) => {
                    return val.id == id
                });
                // this.imageUrl = selectedClient[0].providerAndClientDetails.providerLogo;
                this.clientName = selectedClient[0].providerAndClientDetails.clientName;
                this.clientContact = selectedClient[0].providerAndClientDetails.clientContact;
                this.clientAddress = selectedClient[0].providerAndClientDetails.clientAddress;
                this.clientPincode = selectedClient[0].providerAndClientDetails.clientPincode;
                this.clientState = selectedClient[0].providerAndClientDetails.clientState;
                this.clientCountry = selectedClient[0].providerAndClientDetails.clientCountry;
                this.clientEmail = selectedClient[0].providerAndClientDetails.clientEmail;
            },
            duplicatInvoiceData() {
                const invoiceId = this.$route.params.id;
                setTimeout(() => {
                    this.$emit('duplicate-invoice-data', this.allInvoices);
                    this.selectProvider(invoiceId);
                    this.selectClient(invoiceId);
                }, 2000);
            }
        },
        mounted() {
            this.getAllInvoices();
            if(this.$route.params.id) {
                this.duplicatInvoiceData();
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