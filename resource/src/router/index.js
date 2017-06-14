import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../views/HomePage.vue';
import Details from '../components/Details.vue';
import Home from '../components/Home.vue';
import ClassList from '../components/ClassList.vue';
import DetailsList from '../components/DetailsList.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: HomePage,
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