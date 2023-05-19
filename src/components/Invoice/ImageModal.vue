<template>
    <button type="button" class="upload-image" data-bs-toggle="modal" data-bs-target="#imageModal" @click="getExistingImages">Select Existing</button>
    <!-- Modal -->
    <teleport to='body'>
        <div class="modal fade" id="imageModal" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header px-4">
                        <h3 class="modal-title" id="imageModalLabel">Select From Existing Images</h3>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" v-if="toggleElement"></button>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" data-bs-toggle="modal" data-bs-target="#exampleModal" v-else></button>
                    </div>
                    <div class="modal-body px-4">
                        <div class="position-relative p-5" v-if="toggleSpinner">
                            <div class="loading"></div>
                        </div>
                        <div class="position-relative py-2" v-if="!toggleSpinner && imagesUrls.length === 0">
                            <p class="mb-0 text-center">No images found</p>
                        </div>
                        <div class="row">
                            <div class="col-4" v-for="image of imagesUrls" :key="image">
                                <a href="javascript:void(0)" class="image mx-auto" :class="{selectedImage: image === setSelectedImage}">
                                    <img :src="image" class="img-fluid" alt="img" @click="selectImage">
                                    <p class="text-warning" v-if="image === setSelectedImage">Selected</p>
                                    <i class="fa-solid fa-trash-can text-danger" title="Remove logo" @click="deleteImage"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer justify-content-center px-4">
                        <base-button buttonTitle="Select Image" data-bs-dismiss="modal" :disabled="imagesUrls.length === 0" @click.prevent=saveSelectedImage v-if="toggleElement"></base-button>
                        <base-button buttonTitle="Select Image" data-bs-dismiss="modal" :disabled="imagesUrls.length === 0" data-bs-toggle="modal" data-bs-target="#exampleModal" @click.prevent=saveSelectedImage v-else></base-button>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script>
    import { getStorage, ref, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
    export default {
        emits: ['select-image-create'],
        props: ['setSelectedImage'],
        data() {
            return {
                imagesUrls: [],
                selectedImage: '',
                toggleElement: false,
                toggleSpinner: false,
            }
        },
        methods: {            
            // get images from firebase storage
            getExistingImages() {
                this.toggleSpinner = true;
                this.imagesUrls = [];
                const storage = getStorage();
                const listRef = ref(storage, 'images');
                listAll(listRef)
                .then((res) => {
                    if(res.items.length !== 0) {
                        res.items.forEach((itemRef) => {
                            getDownloadURL(ref(storage, itemRef.toString()))
                            .then((url) => {
                                this.imagesUrls.push(url);
                                this.toggleSpinner = false;
                            })
                            .catch((error) => {
                                console.log(error, 'error')
                            });
                        });
                    }
                    else {
                        this.toggleSpinner = false;
                    }
                }).catch((error) => {
                    console.log(error, 'errror');
                    this.toggleSpinner = false;
                });
            },
            // delete image from ui and firebase storage as well
            deleteImage(e) {
                const seltedUrl = e.target.previousElementSibling.src;

                const storage = getStorage();
                const desertRef = ref(storage, seltedUrl);
                deleteObject(desertRef)
                .then((value) => {
                    console.log(value);
                }).catch((error) => {
                    console.log(error);
                });
                this.getExistingImages();
            },
            // select and set image
            selectImage(e) {
                this.selectedImage = e.target.src;
                console.log(this.selectedImage, 'url');
            },
            saveSelectedImage() {
                this.$emit('select-image-create', this.selectedImage);
            },
            // hide/show element
            toggleButton() {
                if(window.location.pathname == '/create-invoice') {
                    this.toggleElement = true;
                }
                else {
                    this.toggleElement = false;
                }
            }
        },
        mounted() {
            this.toggleButton();
        },
    }
</script>

<style scoped>
    .upload-image {
        width: 150px;
        text-align: center;
        padding: 4px 5px;
        background: #ffb62d;
        box-shadow: 0 0 4px rgb(172, 172, 172);
        color: white;
        border: none;
        cursor: pointer;
    }
    .image {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid white;
        background: rgb(173, 173, 173);
        margin: 12px 0;
        height: 250px;
        overflow: hidden;
    }
    .image::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: rgba(0, 0, 0, 0.7);
        transform: translate(-50%, -50%);
    }
    .image:focus::before {
        width: 100%;
        height: 100%;
        transform: translate(-50%, -50%);
        transition: all 0.4s ease;
    }
    .image i {
        position: absolute;
        bottom: -15px;
        right: -15px;
    }
    .image:hover i {
        bottom: 15px;
        right: 15px;
        transition: all 0.4s ease;
    }
    .image p {
        width: 100%;
        text-align: center;
        position: absolute;
        z-index: 1000;
        top: 45%;
        left: 0;
    }
    .selectedImage::before {
        width: 100%;
        height: 100%;
        transform: translate(-50%, -50%);
    }
    .image img{
        width: 100%;
    }
    .btn-close {
        opacity: 1;
    }
    .loading {
        position: absolute;
        top: 15%;
        left: 46%;
        transform: translate(-50%, -50%);
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 4px solid #ffb62d;
        border-bottom: 4px solid transparent;
        animation: spin 0.8s infinite;
    }
    @keyframes spin {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>