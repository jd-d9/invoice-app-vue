<template>
    <div class="row align-items-end mt-5" id="bwPrint">
        <div class="margin-decrease1 col-12 mb-5" v-if="isAvailable !== 0">
            <!-- attach file -->
            <h5>Attached Files</h5>
            <div v-for="(file, ind) of attachedfile" :key="ind">
                <a :href="file.downloadURL" target="_blank" class="attach-file">{{Number(ind) + 1}}. {{file.fileName}}</a>
            </div>
        </div>
        <!-- terms and conditions -->
        <div class="decrease-width1 col-8">
            <h5>Terms & Conditions</h5>
            <p>1. Payment to be made within 14days. All major creadit card are acceptable.</p>
            <p>2. Applied Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            <p>3. 10% discount for new customer reffered by client 107752. Discount applied to first sale only.</p>
            <p>4. Applied Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <!-- set and view signature -->
        <div class="decrease-width2 col-2 ms-auto">
            <img :src="setUserSignature" class="img-fluid" alt="signature" v-if="setUserSignature">
            <div class="authorised-signature text-center">
                <p class="mb-0">Authorised Signature</p>
            </div>
        </div>
        <!-- additional nots content -->
        <div class="margin-decrease2 col-12 mt-5" v-if="additionalNoteContent">
            <h5>Additional Note</h5>
            <div v-html="additionalNoteContent"></div>
        </div>
    </div>
    <!-- additional details/footer notice -->
    <div class="border-details" :style="backColour">
        <p class="text-center">Any enquiry? reach out via email at example@gmail.com, call on 98765-43210</p>
    </div>
</template>

<script>
    export default {
        props: ['setUserSignature', 'attachedfile', 'additionalNoteContent', 'backColour'],
        data() {
            return {
                isAvailable: 1,
            }
        },
        watch: {
            attachedfile(val) {
                this.isAvailable = val.length;
            }
        }
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
@media print {
    h5 {
        font-size: 16px !important;
    }
    #bwPrint {
        margin-top: 20px !important;
    }
    .margin-decrease1 {
        margin-bottom: 20px !important;
    }
    .margin-decrease2 {
        margin-top: 20px !important;        
    }
    .border-details {
        margin-top: 5px !important;
        padding: 7px 12px;
        font-size: 12px !important;
    }
    .authorised-signature {
        padding-top: 1px !important;
    }
    .decrease-width1 {
        width: 77% !important;
    }
    .decrease-width2 {
        width: 23% !important;
    }
    .decrease-width2 .authorised-signature, .decrease-width2 .authorised-signature p {
        width: 100% !important;
        white-space: nowrap;
        font-size: 12px !important;
        text-align: center !important;
    }
}
</style>