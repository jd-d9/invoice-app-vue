<template>
    <div class="row">
        <div class="col-6">
            <h5>Attatch File</h5>
            <div class="file-select d-flex justify-content-center align-items-center">
                <a :href="file.downloadURL" target="_blank" v-for="(file, ind) of settingAttachedFile" :key="ind">{{(ind) + 1 }}. {{ file.fileName }}</a>
            </div>
            <div class="text-center">
                <label class="choose-file-button">Choose File
                    <input type="file" class="d-none" @change="attachFile">
                </label>
            </div>
        </div>
        <div class="col-6">
            <h5>Signature</h5>
            <div class="signature-box" v-if="!editSignature">
                <VueSignaturePad
                id="signature" :class="{'signature-error': signatureError}"
                width="100%"
                height="200px"
                ref="signaturePad"
                :options="options"
                />
            </div>
            <div class="view-signature" v-else>
                <img :src="setUserSignature" class="img-fluid" alt="signature">
            </div>
            <div class="buttons text-center" v-if="!editSignature">
                <button @click="undo">Undo</button>
                <button @click="save">Save Signature</button>
                <button @click="change">Change Color</button>
                <button @click="resume">Resume Color</button>
            </div>
            <div class="buttons text-center" v-else>
                <button @click="edit">Edit Signature</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {  getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
    export default {
        emits: ['set-signature', 'save-attachments'],
        props: ['getUserSignature', 'getDuplicateUserSign', 'setAttachedFile', 'getDuplicateAttcFiles'],
        data() {
            return {
                options: {
                    penColor: "#ffb62d",
                },
                setSignature: '',
                userSign: '',
                attachedFile: [],
                editSignature: false,
                signatureError: false,
            }
        },
        computed: {
            setUserSignature() {
                return this.$props.getUserSignature ? this.$props.getUserSignature : this.setSignature;
            },
            settingAttachedFile() {
                return this.$props.setAttachedFile ? this.$props.setAttachedFile : this.attachedFile;
            }
        },
        methods: {
            undo() {
                this.$refs.signaturePad.undoSignature();
            },
            save() {
                const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
                if(isEmpty == true) {
                    this.editSignature = false;
                    this.signatureError = true;
                }
                else {
                    this.editSignature = true; 
                    this.setSignature = data;
                    this.$emit('set-signature', this.setSignature);
                    this.signatureError = false;
                }
            },
            edit() {
                this.editSignature = false;
            },
            change() {
                this.options = {
                    penColor: "black",
                };
            },
            resume() {
                this.options = {
                    penColor: "#ffb62d",
                };
            },
            attachFile(e) {
                const fileArray = e.target.files[0];
                const storage = getStorage();
                const storageRef = ref(storage, 'attachments/' + fileArray.name);
                const uploadTask = uploadBytesResumable(storageRef, fileArray);
                uploadTask.on('state_changed', 
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    let message = 'Attaching file.'
                    if(progress == 100) {
                        message = 'File Attached';
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
                        this.attachedFile.push({
                                downloadURL, 
                                fileName: fileArray.name,
                            });
                            this.$emit('save-attachments', this.attachedFile);
                        });
                    }
                );
            },
            // Image to base64 check in google.
            toggleElments() {
                if(window.location.pathname == '/dashboard' || window.location.pathname == '/create-invoice/' + this.$route.params.id) {
                    this.editSignature = true;
                }
                else {
                    this.editSignature = false;
                }
            }
        },
        watch: {
            getDuplicateAttcFiles(val) {
                if(this.$route.params.id) {
                    this.attachedFile = val;
                }
            },
            getDuplicateUserSign(val) {
                if(this.$route.params.id) {
                    this.setSignature = val;
                }
            }
        },
        mounted() {
            this.toggleElments();
        }
    }
</script>

<style scoped>
h4, h5 {
    color: #ffb62d;
}

#signature, .view-signature, .file-select {
    position: relative;
    border: double 1px black;
    background-image: linear-gradient(white, white),
        radial-gradient(circle at top left, #fff, #fff);
    background-origin: border-box;
    background-clip: content-box, border-box;
    margin: 10px 0;
    overflow: hidden;
}
.view-signature, #signature {
    height: 170px !important;
}
.file-select {
    height: 170px;
    flex-direction: column;
    overflow-y: auto;
}
#signature::after, .view-signature::after, .file-select::after {
    content: 'Add Signature';
    position: absolute;
    width: 100%;
    color:gray;
    top: 5px;
    left: 0;
    text-align: center;
}
.signature-error::after {
    content: 'Must add signature first' !important;
    color: red !important;
}
.view-signature::after {
    content: 'Your Signature';
}
.file-select::after {
    content: 'Click and choose file';
}
.file-select a {
    color: black;
    text-decoration: none;
}
.buttons button, .choose-file-button {
    cursor: pointer;
    color: white;
    border: none;
    background-color: #ffb62d;
    padding: 5px 20px;
    margin: 0 8px;
}
</style>