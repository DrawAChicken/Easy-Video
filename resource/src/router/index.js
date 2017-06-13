import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../views/HomePage.vue';
import Details from '../components/Details.vue';
import Home from '../components/Home.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: HomePage,
            children: [
                {
                    path: '/home',
                    component: Home
                },
                {
                    path: '/dy',
                    component: Home
                },
                {
                    path: '/dsj',
                    component: Home
                },
                {
                    path: '/details',
                    component: Details
                }
            ]
        }
    ]
});
