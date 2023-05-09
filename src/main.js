window.Popper = require('popper.js').default;
window.$ = window.jQuery = require('jquery');
require('bootstrap');

import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';
import { auth } from './firebase/index.js';
import BaseButton from './components/UI/BaseButton.vue';
import BaseDialog from './components/UI/BaseDialog.vue';
import PageStepper from './components/UI/PageStepper.vue';
import NavigationBar from './components/UI/NavigationBar.vue';
import ImageModal from './components/Invoice/ImageModal.vue';
import VueToast from 'vue-toast-notification';
import VueSignature from 'vue-signature-pad';
import 'jodit/build/jodit.min.css';
import JoditVue from 'jodit-vue';
import 'vue-toast-notification/dist/theme-default.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';

const app = createApp(App);
app.use(router);
app.use(auth);
app.use(VueToast);
app.use(JoditVue);
app.use(VueSignature);

app.component('base-button', BaseButton);
app.component('base-dialog', BaseDialog);
app.component('page-stepper', PageStepper);
app.component('navigation-bar', NavigationBar);
app.component('image-modal', ImageModal);
app.mount('#app');
