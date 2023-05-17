<template>
    <div class="bg-dark navbar-class sticky-top">
        <div class="container">
            <div class="row align-items-center py-3" id="nonPrintable">
                <div class="col-7">
                    <div class="logo">
                        <img src="../../assets/logo.png" class="img-fluid" alt="logo">
                    </div>
                </div>
                <div class="col-3 ms-auto text-end">
                    <div class="btn-group">
                        <button type="button" class="btn user-name">{{ currentUser }}</button>
                        <button type="button" class="btn btn-warning dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                        </button>
                        <ul class="dropdown-menu">
                            <li>
                                <a class="dropdown-item me-0" href="javascript:void(0)" @click="signOutUser">Sign Out <i class="fa-solid fa-right-from-bracket text-danger mt-1 float-end"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-2 ms-auto text-end" v-if="ToogleElement">
                    <div class="btn-group action-button">
                        <button type="button" class="btn user-name">Actions</button>
                        <button type="button" class="btn btn-warning dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                        </button>
                        <ul class="dropdown-menu">
                            <li>
                                <a class="dropdown-item" href="javascript:void(0)" v-if="!ToogleTabs" @click="printPage">Print <i class="fa-solid fa-print text-warning mt-1 float-end"></i></a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="javascript:void(0)" v-if="!ToogleTabs" @click="downloadFile">Download <i class="fa-solid fa-download text-warning mt-1 float-end"></i></a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="javascript:void(0)" @click="CreateInvoice">Create New <i class="fa-solid fa-square-plus text-warning mt-1 float-end"></i></a>
                            </li>
                            <li>
                                <hr class="dropdown-divider" v-if="!ToogleTabs">
                            </li>
                            <li>
                                <router-link class="dropdown-item" to="/dashboard">All Invoices <i class="fa-solid fa-file-lines text-warning mt-1 float-end"></i></router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { getAuth, onAuthStateChanged } from 'firebase/auth';
    import html2pdf from 'html2pdf.js';
    export default {
        name: 'app',
        data() {
            return {
                ToogleElement: false,
                ToogleTabs: false,
                currentUser: '',
            }
        },
        methods: {
            displayUserName() {
                const auth = getAuth();
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        this.currentUser = user.displayName;
                    } else {
                        this.currentUser = 'Guest';
                    }
                });
            },
            printPage() {
                window.print();
            },
            downloadFile() {
                html2pdf(document.getElementById('element-to-convert'), {
                    image:        { type: 'jpeg', quality: 0.98 },
                    html2canvas:  { scale: 2 },
                    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
                    filename: 'Download.pdf',
                });
            },
            CreateInvoice() {
                this.$router.push('/create-invoice');
            },
            signOutUser() {
                localStorage.removeItem('userId');
                this.$router.push('/signin');
                this.$toast.open({
                    message: 'Logged out',
                    position: 'top-right',
                    duration: '5000',
                    type: 'info'
                });
            },
            showToogleElement() {
                if(window.location.pathname == '/preview/' + this.$route.params.id) {
                    this.ToogleElement = true;
                }
            },
            showToogleTabs() {
                if(window.location.pathname == '/payment/' + this.$route.params.id) {
                    this.ToogleElement = true;
                    this.ToogleTabs = true;
                }
            },
        },
        mounted() {
            this.displayUserName();
            this.showToogleElement();
            this.showToogleTabs();
        }
    }
</script>

<style scoped>
.navbar-class{
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.btn-warning {
    border: 1px solid #ffa600;
    background-color: transparent;
    padding: 5px 15px;
    border-radius: 50px;
    color: white;
}
.logo {
    width: 200px;
}
.dropdown-menu {
    width: 100%;
    transform: translate(0%, 50px) !important;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.381);
}
.dropdown-item:hover {
    background: transparent;
    color: #ffa600 !important;
}
.user-name, .user-name:hover {
    background-color: transparent;
    cursor: default;
    padding: 8px 25px;
    border-radius: 50px;
    color: white;
    border: 1px solid #ffa600;
}
.action-button button, .action-button button:hover{
    background: #ffb62d;
}

@media print {
    #nonPrintable {
        display: none;
    }
}
</style>