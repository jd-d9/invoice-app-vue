import { createRouter, createWebHistory } from 'vue-router';
import SignIn from '../src/components/Auth/SignIn.vue';
import SignUp from '../src/components/Auth/SignUp.vue';
import InvoiceDashboard from '../src/components/Invoice/InvoiceDashboard.vue';
import InvoiceForm from '../src/components/Invoice/InvoiceForm.vue';
import PaymentDetails from '../src/components/Invoice/PaymentDetails.vue';
import PreviewDetails from '../src/components/Invoice/PreviewDetails.vue';
import NotFound from '../src/components/UI/NotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', redirect: '/dashboard'},
        {path: '/signin', component: SignIn},
        {path: '/signup', component: SignUp},
        {path: '/dashboard', component: InvoiceDashboard, meta: {auth: true}},
        {path: '/create-invoice', component: InvoiceForm, meta: {auth: true}},
        {path: '/create-invoice/:id', component: InvoiceForm, meta: {auth: true}},
        {path: '/preview/:id', component: PreviewDetails, meta: {auth: true}},
        {path: '/payment/:id', component: PaymentDetails, meta: {auth: true}},
        {path: '/:notFound(.*)', component: NotFound},
        // {path: '/preview', 
        //     component: PreviewDetails, 
        //     meta: {auth: true},
        
        // },
    ]
});

router.beforeEach((to, from, next) => {
    if(to.meta.auth) {
        const registeredUserId = localStorage.getItem('userId');
        if(registeredUserId) {
            next();
        }
        else {
            next('/signin');
        }
    }
    else {
        next();
    }
})

export default router;