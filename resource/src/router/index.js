import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../views/HomePage.vue';
import Details from '../views/Details.vue';
import More from '../views/More.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: HomePage
        },
        {
            path: '/details',
            component: Details
        },
        {
            path: '/more',
            component: More
        }
    ]
});
