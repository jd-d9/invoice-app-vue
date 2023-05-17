<template>
    <div>
        <div class="table-contents">
            <div class="row">
                <div class="col-4">
                    <h5>Products Details</h5>
                </div>
                <div class="col-8">
                    <div class="text-end">
                        <span class="text-secondary">Select currency: </span> 
                        <select class="currency-dropdown" @change="getCurrency">
                            <option v-for="currency of currencylist" :key="currency" :value="currency" :selected="currency === selectedValue">{{currency}}</option>
                        </select>
                    </div>
                </div>
            </div>
            <table class="table">
                <thead class="table-head text-white">
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
                            <input type="text" placeholder="Product Name" class="for-width-only" v-model="product.productName" name="productName" @keyup="buttonDisable">
                        </td>
                        <td>
                            <input type="number" class="text-end" placeholder="Quantity" v-model="product.quantity" name="quantity" @change="addProductDetails(index)">
                        </td>
                        <td>
                            <input type="number" class="text-end" placeholder="Rate" v-model="product.rate" name="rate" 
                            @change="addProductDetails(index)">
                        </td>
                        <td class="text-end">
                            <h6 class="mb-0">{{ product.amount }}</h6>
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
                    <button class="add-product" @click="addMoreProduct" :disabled="isButtonDisable">Add More Product</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        emits: ['save-product-details'],
        props: ['duplicateProductDetailsVal', 'duplicateCurrencyVal'],
        data() {
            return {
                currencylist: [
                    'INR - ₹','EUR - €','USD - $','JPY - ¥','BGN - BGN','CZK - Kč','DKK - Dkr','GBP - £','HUF - Ft','PLN - zł','RON - RON',
                    'SEK - Skr','CHF - CHF','ISK - Ikr','NOK - Nkr','HRK - kn','RUB - RUB','TRY - TL','AUD - AU$','BRL - R$','CAD - CA$','CNY - CN¥',
                    'HKD - HK$','IDR - Rp','ILS - ₪','KRW - ₩','MXN - MX$','MYR - RM','NZD - NZ$','PHP - ₱','SGD - S$','THB - ฿','ZAR - R'
                ],
                currencyValue: 1,
                selectedValue: 'INR - ₹',
                productInfo: [ {productName: '', quantity: 1, rate: 1, amount: 1} ],
                isButtonDisable: true,
                isProductEmpty: [],
            }
        },
        methods: {
            buttonDisable(e) {
                if(e.target.value) {
                    this.isButtonDisable = false;
                }
                else{
                    this.isButtonDisable = true;
                }
            },
            // get currency value
            async getCurrency(e) {
                this.selectedValue = e.target.value;
                const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=ak9K98VbQDumCwq1xyLj5fCG1p2pBdjLOPhSVWin&currencies=${this.selectedValue.slice(0,3)}&base_currency=INR`);
                const crValue = await response.json();
                this.currencyValue = crValue.data[this.selectedValue.slice(0,3)];
                console.log(this.currencyValue, 'currency-value');
            },
            // to add empty row in table
            addMoreProduct() {
                this.isButtonDisable = true;
                const emptyRow = {
                    productName: '',
                    quantity: 1,
                    rate: 1,
                    amount: 1,
                }
                this.productInfo.push(emptyRow);
            },
            // delete row
            deleteProduct(ind) {
                this.productInfo.splice(ind, 1);
                if(this.productInfo[this.productInfo.length - 1].productName) {
                    this.isButtonDisable = false;
                }
            },
            // made calculation of product amount
            addProductDetails(ind) {
                this.productInfo[ind].amount = this.productInfo[ind].rate * this.productInfo[ind].quantity;
            },
            // add product details to database
            productDetails() {
                this.isProductEmpty = this.productInfo.filter((val) => {
                    return val.productName === '';
                })
                const currency = {
                    currencyName: this.selectedValue,
                    currencyValue: this.currencyValue
                }
                this.$emit('save-product-details', this.productInfo, currency, this.isProductEmpty);
            },
        },
        watch: {
            duplicateProductDetailsVal(val) {
                if(this.$route.params.id) {
                    this.productInfo = val;
                    this.isButtonDisable = false;
                }
            },
            duplicateCurrencyVal(val) {
                if(this.$route.params.id) {
                    this.selectedValue = val.currencyName;
                    this.currencyValue = val.currencyValue;
                }
            }
        },
        updated() {
            this.productDetails();
        },
        unmounted() {
            this.productDetails();
        },
    }
</script>

<style scoped>
input {
    border: none;
    border-bottom: 1px solid black;
    background: transparent;
    width: 180px;
}
h5 {
    color: #ffb62d;
}
input.for-width-only {
    width: 600px;
}

.form-contents input{
    width: 100%;
}
.table-contents input {
    border: none;
    width: 100%;
    padding: 0;
}
.table-contents {
    margin-top: 40px;
}
input:focus, textarea:focus {
    outline: none;
}
.table-head {
    background-color: #ffb62d !important;
}
.add-product {
    color: white;
    border: none;
    background-color: #ffb62d;
    padding: 5px 20px;
}
.add-product:disabled {
    opacity: 0.6;
}
.delete-button {
    background-color: transparent;
    border: none;
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
.currency-dropdown {
    outline: none;
    width: 100px;
    padding: 2px 5px;
    font-size: 14px;
    border: 1px solid gray;
    background-color: transparent;
    border-radius: 0;
    margin-bottom: 10px;
}
.currency-dropdown option {
   color: black !important;
}
</style>