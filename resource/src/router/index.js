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
                {
                    path: '/dy',
                    redirect: '/dy/classList?url=/?s=vod-show-id-1.html'
                },
                {
                    path: '/dsj',
                    redirect: '/dsj/classList?url=/?s=vod-show-id-2.html'
                },
                {
                    path: '/dm',
                    redirect: '/dm/detailsList?url=/?s=vod-show-id-3.html'
                },
                {
                    path: '/zy',
                    redirect: '/zy/detailsList?url=/?s=vod-show-id-4.html'
                },
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