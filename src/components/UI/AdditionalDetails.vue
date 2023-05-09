<template>
    <div class="row align-items-end mt-5" id="bwPrint">
        <div class="col-12 mb-5" v-if="attachedfile">
            <h5>Attached Files</h5>
            <div v-for="(file, ind) of attachedfile" :key="ind">
                <a :href="file.downloadURL" target="_blank" class="attach-file">{{Number(ind) + 1}}. {{file.fileName}}</a>
            </div>
        </div>
        <div class="col-8">
            <h5>Terms & Conditions</h5>
            <p>1. Payment to be made within 14days. All major creadit card are acceptable.</p>
            <p>2. Applied Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus, non.</p>
            <p>3. 10% discount for new customer reffered by client 107752. Discount applied to first sale only.</p>
            <p>4. Applied Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus, non.</p>
        </div>
        <div class="col-2 ms-auto">
            <img :src="setUserSignature" class="img-fluid" alt="signature" v-if="setUserSignature">
            <div class="authorised-signature text-center">
                <p class="mb-0">Authorised Signature</p>
            </div>
        </div>
        <div class="col-12 mt-5" v-if="additionalNoteContent">
            <h5>Additional Note</h5>
            <div v-html="additionalNoteContent"></div>
        </div>
    </div>
    <div class="border-details">
        <div class="d-flex justify-content-between">
            <p>Thank you for your business</p>
            <p>Email : invoiceexample@gmail.com</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['setUserSignature', 'attachedfile', 'additionalNoteContent'],
    }
</script>

<style scoped>
p{
    margin: 0;
}
.border-details {
    margin-top: 30px;
    padding: 15px 20px;
    background-color: #ffb62d;
    color: black;
    font-weight: bold;
}
.authorised-signature {
    border-top: 1px solid black;
    padding-top: 5px;
}
.attach-file {
    color: black;
    text-decoration: none;
}
</style>