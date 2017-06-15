import Vue from 'vue';
import Router from 'vue-router';
import Index from '../views/homepage/Index.vue';
import Details from '../views/homepage/Details.vue';
import Home from '../views/homepage/Home.vue';
import ClassList from '../views/homepage/ClassList.vue';
import DetailsList from '../views/homepage/DetailsList.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: Index,
            redirect: '/home',
            children: [
                {
                    path: '/home',
                    component: Home
                },
                // {
                //     path: '/dy',
                //     component: Home
                // },
                // {
                //     path: '/dsj',
                //     component: Home
                // },
                {
                    path: '/:id/details',
                    component: Details
                },
                {
                    path: '/:id/classList',
                    component: ClassList
                },
                {
                    path: '/:id/detailsList',
                    component: DetailsList
                }
            ]
        }
    ]
})