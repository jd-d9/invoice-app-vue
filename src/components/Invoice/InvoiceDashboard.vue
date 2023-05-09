<template>
    <div>
        <navigation-bar></navigation-bar>
        <div class="container my-5">
            <div class="invoice-form p-4">
                <div class="row align-items-center">
                    <div class="col-3">
                        <div class="invoice-wrapper text-center">
                            <div class="image-wrapper">
                                <img src="../../assets/invoice-icon.png" alt="icon" class="img-fluid">
                            </div>
                            <h6 class="text-secondary mb-0 mt-2">Total Invoices</h6>
                            <h5 class="text-warning text-center fw-bold">{{ totalInvoices }}</h5>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="invoice-wrapper text-center">
                            <div class="image-wrapper">
                                <img src="../../assets/invoice-icon2.png" alt="icon" class="img-fluid">
                            </div>
                            <h6 class="text-secondary mb-0 mt-2">Drafts</h6>
                            <h5 class="text-warning text-center fw-bold">{{ onlyDrafts }}</h5>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="invoice-wrapper text-center">
                            <div class="image-wrapper">
                                <img src="../../assets/invoice-icon3.png" alt="icon" class="img-fluid">
                            </div>
                            <h6 class="text-secondary mb-0 mt-2">Paid Invoices</h6>
                            <h5 class="text-warning text-center fw-bold">{{ onlyInvoices }}</h5>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="invoice-wrapper text-center">
                            <div class="image-wrapper">
                                <img src="../../assets/invoice-icon4.png" alt="icon" class="img-fluid">
                            </div>
                            <h6 class="text-secondary mb-0 mt-2">Deleted Invoices</h6>
                            <h5 class="text-warning text-center fw-bold">{{ deletedInvoices }}</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div class="invoice-form p-5 mt-5">
                <div class="row align-items-center">
                    <div class="col-9">
                        <h2 class="mb-0">Invoice List</h2>
                    </div>
                    <div class="col-3 text-end">
                        <router-link to="/create-invoice" class="create-button">Create Invoice</router-link>
                    </div>
                </div>
                <hr class="for-border-only">
                <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Active Invoices</button>
                        <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Deleted Invoices</button>
                    </div>
                </nav>
                <div class="tab-content mb-5" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                        <div class="table-wrapper mt-5">
                            <table class="table table-hover" id="datatable">
                                <thead>
                                    <tr>
                                        <th>Sr</th>
                                        <th>Invoice No</th>
                                        <th>Customer Name</th>
                                        <th>Issue Date</th>
                                        <th>Due Date</th>
                                        <th>Amount</th>
                                        <th>Currency</th>
                                        <th>Status</th>
                                        <th class="action text-end">Action</th>
                                    </tr>
                                </thead>
                                <tbody v-if="toggleSpinner">
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <div class="spinner">
                                                <div class="round"></div>
                                            </div>
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                                <tbody v-else-if="!toggleSpinner && activeInvoice.length !== 0">
                                    <tr v-for="(invoice, ind) in activeInvoice" :key="invoice.id" class="odd">
                                        <td>{{ ind + 1 }}</td>
                                        <td>{{ invoice.invoiceDetails.invoiceNumber }}</td>
                                        <td>{{ invoice.providerAndClientDetails.clientName }}</td>
                                        <td>{{ invoice.invoiceDetails.invoiceDate }}</td>
                                        <td>{{ invoice.invoiceDetails.invoiceDueDate }}</td>
                                        <td>{{ parseFloat(invoice.productTotalAmount * invoice.currency.currencyValue).toFixed(2)}}</td>
                                        <td>{{ invoice.currency.currencyName.slice(0, 3) }}</td>
                                        <td><span class="invoice-status text-white rounded-pill" :class="{'bg-warning': invoice.invoiceStatus === 'Invoice'}">{{ invoice.invoiceStatus }}</span></td>
                                        <td class="text-end">
                                            <div class="d-flex justify-content-end align-items-center">
                                                <div v-if="invoice.invoiceStatus === 'Invoice'" class="preview-button">
                                                    <router-link :to="{ path: '/preview/'+ invoice.id}"><i class="fa-solid fa-eye text-black"></i></router-link>
                                                </div>
                                                <div class="btn-group">
                                                    <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <i class="fa-solid fa-ellipsis-vertical text-black"></i>
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li>
                                                            <a class="dropdown-item" href="javascript:void(0)" @click="editInvoiceData(invoice.id)" >Edit <i class="fa-solid fa-marker text-success mt-1 float-end"></i></a>
                                                        </li>
                                                        <li>
                                                            <router-link class="dropdown-item" :to="{ path: '/create-invoice/'+ invoice.id}">Duplicate <i class="fa-solid fa-copy text-warning mt-1 float-end"></i></router-link>
                                                        </li>
                                                        <li><hr class="dropdown-divider"></li>
                                                        <li>
                                                            <a class="dropdown-item" href="javascript:void(0)" @click="deleteInvoice(invoice.id)">Delete <i class="fa-solid fa-trash-can text-danger mt-1 float-end"></i></a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td class="text-center">No Invoice Found.</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
                        <div class="table-wrapper mt-5">
                            <table class="table table-hover" id="datatabledeleted">
                                <thead>
                                    <tr>
                                        <th>Sr</th>
                                        <th>Invoice No</th>
                                        <th>Customer Name</th>
                                        <th>Issue Date</th>
                                        <th>Due Date</th>
                                        <th>Status</th>
                                        <th class="action text-end">Action</th>
                                    </tr>
                                </thead>
                                <tbody v-if="toggleSpinner">
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <div class="spinner">
                                                <div class="round"></div>
                                            </div>
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                                <tbody v-else-if="!toggleSpinner && deletedInvoice.length !== 0">
                                    <tr v-for="(invoice, ind) in deletedInvoice" :key="invoice.id" class="odd">
                                        <td>{{ ind + 1 }}</td>
                                        <td>{{ invoice.invoiceDetails.invoiceNumber }}</td>
                                        <td>{{ invoice.providerAndClientDetails.clientName }}</td>
                                        <td>{{ invoice.invoiceDetails.invoiceDate }}</td>
                                        <td>{{ invoice.invoiceDetails.invoiceDueDate }}</td>
                                        <td><span class="invoice-status bg-danger text-white rounded-pill">{{ invoice.invoiceType }}</span></td>
                                        <td class="text-end">
                                            <button type="button" class="btn dropdown-toggle" @click.prevent="restoreInvoice(invoice.id)"><i class="fa-solid fa-rotate-left text-black"></i></button>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td class="text-center">No Data Found</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal -->
        <teleport to='body'>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" role="dialog">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header px-4">
                            <h3 class="modal-title" id="exampleModalLabel">Edit {{ showInvoiceStatus }}</h3>
                            <button type="button" class="btn-close" aria-label="Close" @click="hideExampleModal"></button>
                        </div>
                        <div class="modal-body px-4">
                            <h5 class="mb-1">Invoice</h5>
                            <div class="row align-items-center">
                                <div class="col-3 my-2">
                                    <label for="invoiceNumber" class="mt-1">Invoice#</label>
                                    <input type="text" id="invoiceNumber" v-model="invoiceNumber">
                                </div>
                                <div class="col-3 my-2">
                                    <label for="invoiceDate" class="mt-1">Date:</label>
                                    <input type="date" id="invoiceDate" v-model="invoiceDate">
                                </div>
                                <div class="col-3 my-2">
                                    <label for="invoiceDueDate" class="mt-1">Due-date:</label>
                                    <input type="date" id="invoiceDueDate" v-model="invoiceDueDate" :min="invoiceDate">
                                </div>
                                <div class="col-3 my-2" v-for="(field, ind) in addedField" :key="ind">
                                    <div class="d-flex justify-content-between align-items-end">
                                        <input class="input-lable" placeholder="Field Title" type="text" v-model="field.fieldName">
                                        <i class="fa-solid fa-xmark text-danger delete-button" @click.prevent="deleteFeild(ind)"></i>
                                    </div>
                                    <input type="text" placeholder="Value" v-model="field.fieldValue">
                                </div>
                                <div class="col-3 my-2 text-center">
                                    <button class="add-field" @click.prevent="addNewField">Add New Field</button>
                                </div>
                            </div>
                            <div class="row">
                                <h5 class="mt-3 mb-1">Bill By</h5>
                                <div class="col-12 my-3">
                                    <div class="d-flex justify-content-start align-items-center gap-4">
                                        <div class="profile-photo">
                                            <img :src="imageUrl" alt="logo">
                                        </div>
                                        <div class="d-flex gap-2 mt-2">
                                            <label class="upload-image"> Change Logo
                                                <input type="file" accept="image/*" class="d-none" @change="profilePhoto">
                                            </label>
                                            <label class="text-center my-1 text-secondary">or</label>
                                            <image-modal @select-image-create="setExistingImage" :setSelectedImage="imageUrl"></image-modal>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 my-3">
                                    <label for="Name" class="me-2">Your Name</label>
                                    <input type="text" id="Name" v-model="providerName">
                                </div>
                                <div class="col-md-6 my-3">
                                    <label for="contactNumber" class="me-2">Contact Number</label>
                                    <input type="number" id="contactNumber" v-model="providerContact">
                                </div>
                                <div class="col-md-9 my-3">
                                    <label for="address" class="me-2">Address</label>
                                    <input type="text" id="address" v-model="providerAddress">
                                </div>
                                <div class="col-md-3 my-3">
                                    <label for="pinCode" class="me-2">Pincode</label>
                                    <input type="number" id="pinCode" v-model="pinCode">
                                </div>
                                <div class="col-md-3 my-3">
                                    <label for="country" class="me-2">Country</label>
                                    <input type="text" id="country" v-model="countryName">
                                </div>
                                <div class="col-md-3 my-3">
                                    <label for="state" class="me-2">State</label>
                                    <input type="text" id="state" v-model="stateName">
                                </div>
                            </div>
                            <div class="row">
                                <h5 class="mt-3 mb-1">Bill To</h5>
                                <div class="col-md-6 my-3">
                                    <label for="clientName" class="me-2">Client Name</label>
                                    <input type="text" id="clientName" v-model="clientName">
                                </div>
                                <div class="col-md-6 my-3">
                                    <label for="clientNumber" class="me-2">Contact Number</label>
                                    <input type="number" id="clientNumber" v-model="clientContact">
                                </div>
                                <div class="col-md-12 my-3">
                                    <label for="clientEmail" class="me-2">Email Address</label>
                                    <input type="email" id="clientEmail" v-model="clientEmail">
                                </div>
                                <div class="col-md-9 my-3">
                                    <label for="address" class="me-2">Address</label>
                                    <input type="text" id="address" v-model="clientAddress">
                                </div>
                                <div class="col-md-3 my-3">
                                    <label for="pincode" class="me-2">Pincode</label>
                                    <input type="number" id="pincode" v-model="clientPincode">
                                </div>
                                <div class="col-md-3 my-3">
                                    <label for="country" class="me-2">Country</label>
                                    <input type="text" id="country" v-model="clientCountry">
                                </div>
                                <div class="col-md-3 my-3">
                                    <label for="state" class="me-2">State</label>
                                    <input type="text" id="state" v-model="clientState">
                                </div>
                            </div>
                            <div class="row" v-if="accountNumber">
                                <h5 class="mt-3 mb-1">Bank Details</h5>
                                <div class="col-md-6 my-3">
                                    <label for="accountNumber" class="me-2">Account Number</label>
                                    <input type="text" id="accountNumber" v-model="accountNumber">
                                </div>
                                <div class="col-md-6 my-3">
                                    <label for="accountHolder" class="me-2">Account Holder Name</label>
                                    <input type="text" id="accountHolder" v-model="accountHolderName">
                                </div>
                                <div class="col-md-4 my-3">
                                    <label for="ifscCode" class="me-2">IFSC Code</label>
                                    <input type="text" id="ifscCode" maxlength="7" v-model="ifscCode">
                                </div>
                                <div class="col-md-4 my-3 position-relative">
                                    <label for="bankName" class="me-2">Bank Name</label>
                                    <input type="text" id="bankName" v-model="bankName">
                                </div>
                                <div class="col-md-4 my-3 position-relative">
                                    <label for="mobileNumber" class="me-2">Mobile Number</label>
                                    <input type="text" id="mobileNumber" v-model="mobileNumber">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-4">
                                    <h5>Products</h5>
                                </div>
                                <div class="col-8">
                                    <div class="text-end">
                                        <span class="text-secondary">Select currency: </span> 
                                        <select class="currency-dropdown" @change="getCurrency">
                                            <option v-for="currency of currencylist" :key="currency" :value="currency" :selected="currency === selectedValue">{{currency}}</option>
                                        </select>
                                    </div>
                                </div>
                                <table class="table">
                                    <thead class="table-head">
                                        <tr>
                                            <th scope="col">Product</th>
                                            <th scope="col" class="text-end">Quantity</th>
                                            <th scope="col" class="text-end">Rate</th>
                                            <th scope="col" class="text-end">Amount</th>
                                            <th scope="col" class="text-end"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(product, index) in productInfo" :key="index">
                                            <td>
                                                <input type="text" placeholder="Product Name" class="for-width-only" v-model="product.productName" name="productName">
                                            </td>
                                            <td>
                                                <input type="number" class="text-end" placeholder="Quantity" v-model="product.quantity" name="quantity" @change="addProductDetails(index)">
                                            </td>
                                            <td>
                                                <input type="number" class="text-end" placeholder="Rate" v-model="product.rate" name="rate" 
                                                @change="addProductDetails(index)">
                                            </td>
                                            <td class="text-end">
                                                <h6 class="mb-0 for-width-only">{{ product.amount }}</h6>
                                            </td>
                                            <td class="text-end">
                                                <button class="delete-button" @click="deleteProduct(index)">
                                                    <i class="fa-solid fa-xmark text-danger"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="row mb-4">
                                    <div class="col-md-12 text-end">
                                        <button class="add-product" @click="addMoreProduct">Add More Product</button>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <signature-pad :getUserSignature="userSignature" @set-signature="setNewSignature" :setAttachedFile="setFile" @save-attachments="updateAttachments"></signature-pad>
                            </div>
                            <div class="row" v-if="noteContent">
                                <div class="col-12 mt-4">
                                    <h5>Add Note</h5>
                                    <jodit-editor v-model="noteContent"/>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer justify-content-center px-4">
                            <base-button buttonTitle="Save Changes" @click="saveChanges"></base-button>
                        </div>
                    </div>
                </div>
            </div>
        </teleport>
    </div>
</template>

<script>
    import { collection, query, getDocs, deleteDoc, getDoc, where, doc, updateDoc } from 'firebase/firestore';
    import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
    import { db } from '../../firebase/index.js';
    import moment from 'moment';
    import SignaturePad from '../Invoice/SignaturePad.vue';
    import 'jodit/build/jodit.min.css';
    import { JoditEditor } from 'jodit-vue';
    import 'datatables.net-dt/js/dataTables.dataTables';
    import 'datatables.net-dt/css/jquery.dataTables.min.css';
    import Swal from 'sweetalert2';
    export default {
        name: 'app',
        emits: ['update-document'],
        components: {
            SignaturePad,
            JoditEditor,
        },
        data() {
            return {
                currencylist: [
                    'INR - ₹','EUR - €','USD - $','JPY - ¥','BGN - BGN','CZK - Kč','DKK - Dkr','GBP - £','HUF - Ft','PLN - zł','RON - RON',
                    'SEK - Skr','CHF - CHF','ISK - Ikr','NOK - Nkr','HRK - kn','RUB - RUB','TRY - TL','AUD - AU$','BRL - R$','CAD - CA$','CNY - CN¥',
                    'HKD - HK$','IDR - Rp','ILS - ₪','KRW - ₩','MXN - MX$','MYR - RM','NZD - NZ$','PHP - ₱','SGD - S$','THB - ฿','ZAR - R'
                ],
                invoiceData: '',
                currentUser: '',
                invoiceNumber: '',
                invoiceDate: moment(this.invoiceDate).format('YYYY-MM-DD'),
                invoiceDueDate: '',
                imageUrl: '',
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
                accountNumber: '',
                accountHolderName: '',
                ifscCode: '',
                bankName: '',
                mobileNumber: '',
                selectedValue: 'INR - ₹',
                currencyValue: 1,
                productInfo: [ {productName: '', quantity: 1, rate: 1, amount: 1} ],
                totalProductAmount: '',
                userSignature: '',
                setFile: [],
                addedField: [],
                noteContent: '',
                allInvoices: [],
                activeInvoice: [],
                deletedInvoice: [],
                showInvoiceStatus: '',
                isInvoiceDeleted: '',
                toggleSpinner: false,
            }
        },
        computed: {
            totalInvoices() {
                return this.activeInvoice.length < 10 ? '0' + this.activeInvoice.length : this.activeInvoice.length;
            },
            onlyDrafts() {
                const showDrafts =  this.activeInvoice.filter((val) => {
                    return val.invoiceStatus === 'Draft';
                });
                return showDrafts.length < 10 ? '0' + showDrafts.length : showDrafts.length;
            },
            onlyInvoices() {
                const showDrafts =  this.activeInvoice.filter((val) => {
                    return val.invoiceStatus === 'Invoice';
                });
                return showDrafts.length < 10 ? '0' + showDrafts.length : showDrafts.length;
            },
            deletedInvoices() {
                return this.deletedInvoice.length < 10 ? '0' + this.deletedInvoice.length : this.deletedInvoice.length;
            },
        },
        methods: {
            // open and close modal
            showExampleModal() {
                window.$('#exampleModal').modal('show');
            },
            hideExampleModal() {
                window.$('#exampleModal').modal('hide');
                this.noteContent = '';
            },
            // for get and show all invoices
            async getAllInvoices() {
                this.toggleSpinner = true;
                this.allInvoices = [];
                const q = query(collection(db, 'invoice-details'), where('logInId', '==', localStorage.getItem('userId')));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    this.allInvoices.push({...doc.data(), id: doc.id});
                    setTimeout(() => {
                        window.$('#datatable').DataTable();
                        window.$('#datatabledeleted').DataTable();
                    }, 1100)
                });
                console.log(this.allInvoices, 'this.allInvoices');
                setTimeout(() => {
                    this.toggleSpinner = false;
                }, 1000)
                this.activeInvoice = this.allInvoices.filter((val) => {
                    return val.invoiceType === 'Active';
                });
                this.deletedInvoice = this.allInvoices.filter((val) => {
                    return val.invoiceType === 'Deleted';
                });
            },
            // product table functionality
            addMoreProduct() {
                const emptyRow = {
                    productName: '',
                    quantity: 1,
                    rate: 1,
                    amount: 1,
                }
                this.productInfo.push(emptyRow);
            },
            deleteProduct(ind) {
                this.productInfo.splice(ind, 1);
            },
            addProductDetails(ind) {
                this.productInfo[ind].amount = this.productInfo[ind].rate * this.productInfo[ind].quantity;
            },
            // get selected invoice details
            async editInvoiceData(id) {
                this.showExampleModal();
                const docRef = doc(db, 'invoice-details', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    this.invoiceData = {...docSnap.data(), id};
                } else {
                    console.log('No data found!');
                }
                this.showInvoiceStatus = this.invoiceData.invoiceStatus;
                this.isInvoiceDeleted = this.invoiceData.invoiceType;
                this.invoiceNumber = this.invoiceData.invoiceDetails.invoiceNumber;
                this.invoiceDate = this.invoiceData.invoiceDetails.invoiceDate;
                this.invoiceDueDate = this.invoiceData.invoiceDetails.invoiceDueDate;

                this.imageUrl = this.invoiceData.providerAndClientDetails.providerLogo;
                this.providerName = this.invoiceData.providerAndClientDetails.providerName;
                this.providerContact = this.invoiceData.providerAndClientDetails.providerContact;
                this.providerEmail = this.invoiceData.providerAndClientDetails.providerEmail;
                this.providerAddress = this.invoiceData.providerAndClientDetails.providerAddress;
                this.pinCode = this.invoiceData.providerAndClientDetails.providerPincode;
                this.stateName = this.invoiceData.providerAndClientDetails.providerState;
                this.countryName = this.invoiceData.providerAndClientDetails.providerCountry;

                this.clientName = this.invoiceData.providerAndClientDetails.clientName;
                this.clientContact = this.invoiceData.providerAndClientDetails.clientContact;
                this.clientEmail = this.invoiceData.providerAndClientDetails.clientEmail;
                this.clientAddress = this.invoiceData.providerAndClientDetails.clientAddress;
                this.clientPincode = this.invoiceData.providerAndClientDetails.clientPincode;
                this.clientState = this.invoiceData.providerAndClientDetails.clientState;
                this.clientCountry = this.invoiceData.providerAndClientDetails.clientCountry;

                this.selectedValue = this.invoiceData.currency.currencyName;
                this.currencyValue = this.invoiceData.currency.currencyValue;
                this.productInfo = this.invoiceData.productDetails;
                this.userSignature = this.invoiceData.userSignature;
                this.noteContent = this.invoiceData.additionalNote;
                this.setFile = this.invoiceData.attachedFile;
                this.addedField = this.invoiceData.fieldDetails;

                if(this.invoiceData.bankDetails) {
                    this.accountNumber = this.invoiceData.bankDetails.accountNumber;
                    this.accountHolderName = this.invoiceData.bankDetails.accountHolderName;
                    this.ifscCode = this.invoiceData.bankDetails.ifscCode;
                    this.bankName = this.invoiceData.bankDetails.bankName;
                    this.mobileNumber = this.invoiceData.bankDetails.mobileNumber;
                }
            },
            // delete selected invoice
            deleteInvoice(id) {
                Swal.fire({
                    title: 'Delete Invoice',
                    text: 'Are you sure you want to delete it?',
                    icon: 'warning',
                    showDenyButton: true,
                    denyButtonColor: '#ffb936',
                    denyButtonText: 'Temporary Delete!',
                    showCloseButton: true,
                    confirmButtonColor: 'red',
                    confirmButtonText: 'Permanent Delete!',
                    width: '450px'
                    }).then(async(result) => {
                        if (result.isConfirmed) {
                            await deleteDoc(doc(db, 'invoice-details', id));
                            this.$toast.open({
                                message: 'Invoice Deleted Successfully',
                                position: 'top-right',
                                duration: '5000',
                                type: 'success'
                            });
                            this.getAllInvoices();
                        }
                        else if (result.isDenied) {
                            const temporaryDelete = doc(db, 'invoice-details', id);
                            await updateDoc(temporaryDelete, {
                                invoiceType: 'Deleted',
                            });
                            this.$toast.open({
                                message: 'Temporarily Deleted',
                                position: 'top-right',
                                duration: '5000',
                                type: 'success'
                            });
                            this.getAllInvoices();
                        }
                })
            },
            // restore temporary deleted invoice
            async restoreInvoice(id) {
                const temporaryDeleted = doc(db, 'invoice-details', id);
                await updateDoc(temporaryDeleted, {
                    invoiceType: 'Active',
                });
                this.$toast.open({
                    message: 'Invoice Restored Successfully',
                    position: 'top-right',
                    duration: '5000',
                    type: 'success'
                });
                this.getAllInvoices();
            },
            // for additional fields
            deleteFeild(ind) {
                this.addedField.splice(ind, 1);
            },
            addNewField() {
                const emptyField = {
                    fieldName: '',
                    fieldValue: ''
                }
                this.addedField.push(emptyField);
            },
            // set and update logo
            profilePhoto(event) {
                const imageObject = event.target.files[0];
                const storage = getStorage();
                const storageRef = ref(storage, 'images/' + imageObject.name);
                const uploadTask = uploadBytesResumable(storageRef, imageObject);
                uploadTask.on('state_changed', 
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Uploading image, ' + progress + '% done.');
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
                console.log(this.imageUrl, 'existing-url');
            },
            // update signature
            setNewSignature(data) {
                this.userSignature = data;
            },
            // update attachments
            updateAttachments(data) {
                data.forEach((val) => {
                    const valueExist = this.setFile.findIndex((downloadURL) => {
                        return downloadURL.downloadURL == val.downloadURL
                    })
                    if(valueExist === -1) {
                        this.setFile = [...this.setFile, val];
                    }
                })
            },
            // get currency value
            async getCurrency(e) {
                this.selectedValue = e.target.value;
                const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=ak9K98VbQDumCwq1xyLj5fCG1p2pBdjLOPhSVWin&currencies=${this.selectedValue.slice(0,3)}&base_currency=INR`);
                const crValue = await response.json();
                this.currencyValue = crValue.data[this.selectedValue.slice(0,3)];
                console.log(this.currencyValue, 'currency-value');
            },
            // save all changes
            async saveChanges() {
                const bankDetails = {
                    accountHolderName: this.accountHolderName,
                    accountNumber: this.accountNumber,
                    ifscCode: this.ifscCode,
                    bankName: this.bankName,
                    mobileNumber: this.mobileNumber,
                }
                const providerAndClientDetails = {
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
                const invoiceDetails = {
                    invoiceNumber: this.invoiceNumber,
                    invoiceDate: this.invoiceDate,
                    invoiceDueDate: this.invoiceDueDate,
                }

                const saveChangeRef = doc(db, 'invoice-details', this.invoiceData.id);
                // do total of amount
                if(this.productInfo.length > 1) {
                    this.totalProductAmount = this.productInfo.reduce((valOne, valTwo) => {
                        return (valOne.amount ? valOne.amount : valOne) + valTwo.amount;
                    })
                }else {
                    this.totalProductAmount = this.productInfo[0].amount;
                }
                // get and updating currency value
                const currency = {
                    currencyName: this.selectedValue,
                    currencyValue: this.currencyValue
                }
                await updateDoc(saveChangeRef, {
                    bankDetails: bankDetails,
                    providerAndClientDetails: providerAndClientDetails,
                    invoiceDetails: invoiceDetails,
                    currency: currency,
                    productDetails: this.productInfo,
                    productTotalAmount: this.totalProductAmount,
                    userSignature: this.userSignature,
                    attachedFile: this.setFile,
                    additionalNote: this.noteContent,
                    fieldDetails: this.addedField,
                    invoiceStatus: 'Invoice'
                });
                this.$toast.open({
                    message: 'All changes saved successfully',
                    position: 'top-right',
                    duration: '5000',
                    type: 'success'
                });
                this.hideExampleModal();
                this.getAllInvoices();
                if(this.showInvoiceStatus === 'Draft') {
                    this.$router.push('/payment/' + this.invoiceData.id);
                }
            },
        },
        mounted() {
            this.getAllInvoices();
        },
    }
</script>

<style scoped>
    .invoice-form {
        box-shadow: 0 0 6px rgb(183, 183, 183);
        border-radius: 5px;
    }
    .create-button {
        text-decoration: none;
        background-color: #ffa600;
        padding: 10px 45px;
        border-radius: 50px;
        color: white;
        border: 1px solid transparent;
    }
    .create-button:hover {
        background-color: #ffb936;
        color: white;
    }
    .dropdown-toggle {
        transform: translateY(-5px);
    }
    .dropdown-toggle::after {
        display: none;
    }
    .dropdown-toggle:active, .dropdown-toggle:focus {
        border-color: transparent !important;
        outline: none !important;
    }
    input {
        width: 100%;
        background: transparent;
        border: none;
        border-bottom: 1px solid black;
    }
    .input-lable {
        width: 80%;
        color: gray;
        background: transparent;
        border: none;
        border-bottom: 1px dashed rgba(128, 128, 128, 0.3);
    }
    .add-field {
        background-color: transparent;
        border: 1px dashed #ffb62d;
        padding: 4px 20px;
    }
    .delete-button {
        cursor: pointer !important;
    }
    label {
        color: rgba(0, 0, 0, 0.7);
    }
    input:focus {
        outline: none;
    }
    h5 {
        color: #ffa600;
    }
    .btn-close {
        opacity: 1;
    }
    input[type="date"]::-webkit-calendar-picker-indicator {
        filter: invert(1);
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    .modal-content input:-webkit-autofill,
    .modal-content input:-webkit-autofill:hover, 
    .modal-content input:-webkit-autofill:focus, 
    .modal-content input:-webkit-autofill:active  {
        transition: background-color 5000s !important;
    }
    .modal-footer {
        border: none;
    }
    .table input {
        border: none;
    }
    .add-product {
        color: white;
        border: none;
        background-color: #ffb62d;
        padding: 5px 10px;
    }
    .delete-button {
        background-color: transparent;
        border: none;
    }
    .action-button button, .action-button button:hover{
        background: #ffb62d;
    }
    .profile-photo {
        display: flex;
        justify-content: center;
        align-items: start;
        width: 300px;
        height: auto;
        overflow: hidden;
    }
    .profile-photo img {
        width: 100%;
        height: auto;
    }
    .upload-image {
        width: 150px;
        text-align: center;
        padding: 4px 5px;
        background: #ffb62d;
        color: white;
        cursor: pointer;
    }
    .image-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 110px;
        height: 110px;
        border-radius: 50%;
        border: 10px solid rgba(0, 0, 0, 0.1);
        margin: 5px auto;
    }
    .image-wrapper img {
        width: 60px;
        height: 60px;
    }

    .for-border-only {
        border-top: 1px solid rgba(0, 0, 0, 0.5);
        margin: 40px 0;
    }
    @media print {
        #nonPrintable {
            display: none;
        }
    }

    thead {
        background-color: black;
        color: white;
    }
    table.dataTable {
        transform: translateY(20px);
        margin: 40px 0 !important;
    }
    table.dataTable.no-footer {
        border-bottom: 1px solid rgba(0, 0, 0, 0.15) !important;
    }
    table.dataTable {
        border-collapse: unset !important;
    }
    table.dataTable tr:last-child {
        border-bottom: transparent !important;
    }
    table.dataTable tbody th, table.dataTable tbody td {
        padding: 19px 10px 3px !important
    }
    .table-hover>tbody>tr:hover>* {
        --bs-table-accent-bg: rgba(237, 237, 237, 0.6) !important;
    }
    .dataTables_wrapper .dataTables_filter input {
        width: 400px !important;
    }
    table.dataTable thead>tr>th.sorting:before, table.dataTable thead>tr>th.sorting:after, table.dataTable thead>tr>th.sorting_asc:before, table.dataTable thead>tr>th.sorting_asc:after, table.dataTable thead>tr>th.sorting_desc:before, table.dataTable thead>tr>th.sorting_desc:after, table.dataTable thead>tr>th.sorting_asc_disabled:before, table.dataTable thead>tr>th.sorting_asc_disabled:after, table.dataTable thead>tr>th.sorting_desc_disabled:before, table.dataTable thead>tr>th.sorting_desc_disabled:after, table.dataTable thead>tr>td.sorting:before, table.dataTable thead>tr>td.sorting:after, table.dataTable thead>tr>td.sorting_asc:before, table.dataTable thead>tr>td.sorting_asc:after, table.dataTable thead>tr>td.sorting_desc:before, table.dataTable thead>tr>td.sorting_desc:after, table.dataTable thead>tr>td.sorting_asc_disabled:before, table.dataTable thead>tr>td.sorting_asc_disabled:after, table.dataTable thead>tr>td.sorting_desc_disabled:before, table.dataTable thead>tr>td.sorting_desc_disabled:after {
        opacity: .4;
        right: 10px;
        line-height: 10px;
    }
    .invoice-status {
        font-size: 14px;
        padding: 3px 8px;
        background-color: rgb(128, 128, 128, 0.6);
    }
    .nav-tabs .nav-link{
        border: none;
        color: gray;
        border-bottom: 3px solid transparent;
    }
    .nav-tabs .nav-link:hover{
        border-color: transparent;
    }
    .nav-tabs .nav-link.active {
        border: none;
        color: #ffa600;
        border-bottom: 3px solid #ffa600;
    }
    .action {
        padding-right: 20px !important;
    }
    .action::after, .action::before {
        display: none !important;
    }
    .preview-button {
        margin-right: 5px;
        transform: translateY(-5px);
    }
    .spinner {
        display: flex;
        justify-content: start;
        align-items: center;
        position: relative;
        top: 0;
        left: 0;
    }
    .round {
        width: 50px;
        height: 50px;
        border: 4px solid orange;
        border-bottom: 4px solid transparent;
        border-radius: 50%;
        animation: rotate 0.8s linear infinite;
    }
    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>