<template>
    <div class="siginform-back">
        <div class="container">
            <div class="row align-items-center" style="height: 100vh">
                <div class="col-md-6">
                    <form class="signin-form my-auto" @submit.prevent="submitAndSignin">
                        <h6>START FOR FREE</h6>
                        <h1>Sign In Your Self</h1>
                        <p>Not Registered Yet? <router-link to="/signup">Sign Up</router-link></p>
                        <div class="form-floating my-4" :class="{invalidInput: !emailIsInvalid}">
                            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model.trim="userEmail" @blur="emailIsValid">
                            <label for="floatingInput">Email address</label>
                        </div>
                        <p class="text-danger mb-4" v-if="!emailIsInvalid"><i class="fa-solid fa-circle-exclamation"></i> Please enter valid email address.</p>
                        <div class="form-floating my-4" :class="{invalidInput: !passwordIsInvalid}">
                            <input :type="inputType" class="form-control" id="floatingPassword" placeholder="Password" v-model.trim="userPassword" @blur="passwordIsValid">
                            <label for="floatingPassword">Password</label>
                            <span class="eye-icons">
                                <i class="fa-solid fa-eye-slash" v-if="inputType == 'password'" @click="passwordHideShow"></i>
                                <i class="fa-solid fa-eye" v-if="inputType == 'text'" @click="passwordHideShow"></i>
                            </span>
                        </div>
                        <p class="text-danger mb-4" v-if="!passwordIsInvalid"><i class="fa-solid fa-circle-exclamation"></i> Password must be 6 character.</p>
                        <p>Reset Password? <a href="javascript:void(0)" @click="resetUserPassword">Here</a></p>
                        <base-button button-title="Sign In" :disabled="isDisable"></base-button>
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
    import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
    
    export default {
        data() {
            return {
                emailIsInvalid: true,
                passwordIsInvalid: true,
                inputType: 'password',
                userEmail: '',
                userPassword: '',
            }
        },
        methods: {
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
            passwordHideShow() {
                if(this.inputType == 'text') {
                    this.inputType = 'password';
                }
                else {
                    this.inputType = 'text';
                }
            },
            submitAndSignin() {
                this.emailIsValid();
                this.passwordIsValid();
                if(!this.emailIsInvalid && !this.passwordIsInvalid) {
                    return false;
                }
                else {
                    const auth = getAuth();
                    signInWithEmailAndPassword(auth, this.userEmail, this.userPassword)
                    .then((userCredential) => {
                        localStorage.setItem('userId', userCredential.user.uid);
                        this.$toast.open({
                            message: 'You are successfully loged-in with this email: ' + userCredential.user.email,
                            position: 'top-right',
                            duration: '5000',
                            type: 'success'
                        });
                        this.$router.push('/dashboard');
                    })
                    .catch((error) => {
                        if(error.code == 'auth/wrong-password') {
                            error.code = 'wrong password! please enter correct password.'
                        }
                        else{
                            error.code = 'user not found! please enter registered email.'
                        }
                        this.$toast.open({
                            message: error.code,
                            position: 'top-right',
                            duration: '5000',
                            type: 'error'
                        });
                    });
                }
            },
            resetUserPassword() {
                this.emailIsValid();
                const auth = getAuth();
                sendPasswordResetEmail(auth, this.userEmail)
                .then(() => {
                    this.$toast.open({
                        message: 'Reset Link Successfully Sent on Registered Email',
                        position: 'top-right',
                        duration: '5000',
                        type: 'success'
                    });
                })
                .catch((error) => {
                    console.log(error)
                });
            }
        },
        computed: {
            isDisable() {
                return !this.emailIsInvalid || !this.passwordIsInvalid;
            }
        }
    }
</script>

<style scoped>
    .text-danger {
        color: red !important;
    }

    .siginform-back {
        width: 100%;
        height: 100vh;
        background-image: linear-gradient(45deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.4)), url(../../assets/img2.jpg);
        background-size: cover;
        background-position: center;
    }

    .signin-form {
        border-radius: 5px;
        padding: 40px 30px;
        color: white;
    }

    .signin-form h1 {
        font-weight: 700;
        letter-spacing: 2px !important;
        margin: 10px 0 30px;
    }

    .signin-form input {
        background-color: transparent;
        color: white;
    }

    .signin-form input:focus {
        border-color: #ffb936;
        box-shadow: none;
    }

    .signin-form p a{
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