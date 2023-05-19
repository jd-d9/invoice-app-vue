<template>
    <div class="signupform-back">
        <div class="container">
            <div class="row align-items-center" style="height: 100vh">
                <div class="col-md-6">
                    <form class="signup-form my-auto" @submit.prevent="submitAndSignup">
                        <h6>START FOR FREE</h6>
                        <h1>Create New Account</h1>
                        <p>Already A Member? <router-link to="/signin">Sign In</router-link></p>
                        <div class="userNames d-flex justify-content-between mt-4">
                            <div>
                                <div class="form-floating" :class="{invalidInput: !firstNameInvalid}">
                                    <input type="text" autofocus class="form-control" id="floatingInput" placeholder="Enter name" v-model.trim="firstName" @keyup="firstNameIsValid">
                                    <label for="floatingInput">First Name</label>
                                </div>
                                <p class="text-danger mt-4 mb-0" v-if="!firstNameInvalid"><i class="fa-solid fa-circle-exclamation"></i> Please enter first name.</p>
                            </div>
                            <div>
                                <div class="form-floating" :class="{invalidInput: !lastNameInvalid}">
                                    <input type="text" class="form-control" id="floatingInput" placeholder="Last name" v-model.trim="lastName" @keyup="lastNameIsValid">
                                    <label for="floatingInput">Last Name</label>
                                </div>
                                <p class="text-danger mt-4 mb-0" v-if="!lastNameInvalid"><i class="fa-solid fa-circle-exclamation"></i> Please enter last name.</p>
                            </div>
                        </div>
                        <div class="form-floating my-4" :class="{invalidInput: !emailIsInvalid}">
                            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model.trim="userEmail" @keyup="emailIsValid">
                            <label for="floatingInput">Email address</label>
                        </div>
                        <p class="text-danger mb-4" v-if="!emailIsInvalid"><i class="fa-solid fa-circle-exclamation"></i> Please enter valid email address.</p>
                        <div class="form-floating my-4" :class="{invalidInput: !passwordIsInvalid}">
                            <input :type="inputType" class="form-control" id="floatingPassword" placeholder="Password" v-model.trim="userPassword" @keyup="passwordIsValid">
                            <label for="floatingPassword">Password</label>
                            <span class="eye-icons">
                                <i class="fa-solid fa-eye-slash" v-if="inputType == 'password'" @click="passwordHideShow"></i>
                                <i class="fa-solid fa-eye" v-if="inputType == 'text'" @click="passwordHideShow"></i>
                            </span>
                        </div>
                        <p class="text-danger mb-4" v-if="!passwordIsInvalid"><i class="fa-solid fa-circle-exclamation"></i> Password must be 6 character.</p>
                        <base-button button-title="Sign Up" :disabled="isDisable"></base-button>
                    </form>
                </div>
                <div class="col-md-6">
                    <div class="logo">
                        <img src="../../assets/logo.png" class="img-fluid" alt="logo">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { getAuth, updateProfile, createUserWithEmailAndPassword } from "firebase/auth";

    export default {
        data() {
            return {
                emailIsInvalid: true,
                passwordIsInvalid: true,
                firstNameInvalid: true,
                lastNameInvalid: true,
                inputType: 'password',
                userEmail: '',
                userPassword: '',
                userName: '',
                lastName: '',
            }
        },
        methods: {
            // form validations
            emailIsValid() {
                this.emailIsInvalid = true;
                const mailFormat = /^[^@]+@\w+(\.\w+)+\w$/;
                if(!this.userEmail.match(mailFormat)) {
                    this.emailIsInvalid = false;
                }
                else {
                    this.emailIsInvalid = true;
                }
            },
            passwordIsValid() {
                this.passwordIsInvalid = true;
                if(!this.userPassword || this.userPassword.length < 6) {
                    this.passwordIsInvalid = false;
                }
                else {
                    this.passwordIsInvalid = true;
                }
            },
            firstNameIsValid() {
                const regName = /^[a-zA-Z]+$/;
                this.firstNameInvalid = true;
                if(!this.firstName || !this.firstName.match(regName)) {
                    this.firstNameInvalid = false;
                }
                else {
                    this.firstNameInvalid = true;
                }
            },
            lastNameIsValid() {
                const regName = /^[a-zA-Z]+$/;
                this.lastNameInvalid = true;
                if(!this.lastName || !this.lastName.match(regName)) {
                    this.lastNameInvalid = false;
                }
                else {
                    this.lastNameInvalid = true;
                }
            },
            // password hide/show
            passwordHideShow() {
                if(this.inputType == 'text') {
                    this.inputType = 'password';
                }
                else {
                    this.inputType = 'text';
                }
            },
            // submit user details and register
            submitAndSignup() {
                this.emailIsValid();
                this.passwordIsValid();
                this.firstNameIsValid();
                this.lastNameIsValid();
                if(!this.emailIsInvalid && !this.passwordIsInvalid) {
                    return false;
                }
                else {
                    const auth = getAuth();
                    createUserWithEmailAndPassword(auth, this.userEmail, this.userPassword)
                    .then(async (userCredential) => {
                        await updateProfile(auth.currentUser, { displayName: this.firstName + ' ' + this.lastName});
                        localStorage.setItem('userId', userCredential.user.uid);
                        this.$toast.open({
                            message: 'Successfully registered, Hello ' + this.firstName,
                            position: 'top-right',
                            duration: '5000',
                            type: 'success'
                        });

                    })
                    .catch((error) => {
                        this.$toast.open({
                            message: error,
                            position: 'top-right',
                            duration: '5000',
                            type: 'error'
                        });
                    });
                    this.$router.push('/signin');
                }
            },
        },
        computed: {
            isDisable() {
                return !this.emailIsInvalid || !this.passwordIsInvalid || !this.firstNameInvalid || !this.lastNameInvalid;
            }
        }
    }
</script>

<style scoped>
    .text-danger {
        color: red !important;
    }

    .signupform-back {
        width: 100%;
        height: 100vh;
        background-image: linear-gradient(45deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.4)), url(../../assets/img2.jpg);
        background-size: cover;
        background-position: center;
    }

    .signup-form {
        border-radius: 5px;
        padding: 40px 30px;
        color: white;
    }

    .signup-form h1 {
        font-weight: 700;
        letter-spacing: 2px !important;
        margin: 10px 0 30px;
    }

    .signup-form input {
        background-color: transparent;
        color: white;
    }

    .userNames input {
        width: 280px;
    }

    .signup-form input:focus {
        border-color: #ffb936;
        box-shadow: none;
    }

    .signup-form p a{
        color: #ffb62d;
        text-decoration: none;
    }

    .eye-icons {
        position: absolute;
        top: 18px;
        right: 15px;
    }

    .invalidInput input {
        border-color: red;
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus, 
    input:-webkit-autofill:active  {
        transition: background-color 5000s;
        -webkit-text-fill-color: white !important;
    }
    .hideButton{
        display: none;
    }

    .logo {
        position: absolute;
        bottom: 80px;
        right: 100px;
        width: 200px;
    }
</style>