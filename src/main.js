import Vue from 'vue';
import VueRouter from 'vue-router';
import Routers from './router';
import App from './app.vue';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});