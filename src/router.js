const routers = [
    {
        path: '/',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/login.vue'], resolve)
    },
    /*
    {
        path: '/login',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/login.vue'], resolve),
    },
    以上配置后，http://0.0.0.0:8091/login ，这样能打开登录页面
    */
    {
        path: '/login',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/login.vue'], resolve),
    },
    {
        path: '/main',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/main.vue'], resolve),
        children: [
            {
                path: '/',
                name: 'list_publish',
                component: (resolve) => require(['./views/list_publish.vue'], resolve)
            },
            {
                path: '/create',
                name: 'create',
                component: (resolve) => require(['./views/create_release.vue'], resolve)
            },
            {
                path: '/releaselist',
                name: 'releaselist',
                component: (resolve) => require(['./views/releaseList.vue'], resolve)
            },
            {
                path: '/reaseDetail',
                name: 'reaseDetail',
                component: (resolve) => require(['./views/releaseDetail.vue'], resolve)
            },
            {
                path: '/selectUsers',
                name: 'selectUsers',
                component: (resolve) => require(['./views/selectUsers.vue'], resolve)
            },
             
            {
                path: '/test',
                name: 'test',
                component: (resolve) => require(['./views/test.vue'], resolve)
            },
            {
                path:'/chooseFunction',
                name:'chooseFunction',
                component:(resolve)=> require(['./views/chooseFunction.vue'],resolve)
            },
            {
                path:'/function_manage',
                name:'function_manage',
                component:(resolve)=> require(['./views/function_manage.vue'],resolve)
            },
             
           { 
                path:'/functionList',
                name:'functionList',
                component:(resolve)=> require(['./views/functionList.vue'],resolve)
            }, 
            {
                path: '/',
                name: 'login',
                component: (resolve) => require(['./views/login.vue'], resolve)
            },

            {
                path: '/upload',
                name: 'upload',
                component: (resolve) => require(['./views/upload.vue'], resolve)
            },
            {
                path: '/log',
                name: 'log',
                component: (resolve) => require(['./views/log.vue'], resolve)
            },
            {
                path:'/selecttest',
                name:'selecttest',
                component: (resolve) => require(['./views/selecttest.vue'], resolve)
                
            },
            {
                path:'/addFunction',
                name:'addFunction',
                component: (resolve) => require(['./views/addfunction.vue'], resolve)
                
            },
            {
                path: '/addGroup',
                meta: {
                    title: ''
                },
                component: (resolve) => require(['./views/addGroup.vue'], resolve),
            },
            {
                path: '/mangGroup',
                meta: {
                    title: ''
                },
                component: (resolve) => require(['./views/mangGroup.vue'], resolve),
            },
            {
                path: '/editGroup',
                meta: {
                    title: ''
                },
                component: (resolve) => require(['./views/editGroup.vue'], resolve),
            },
            {
                path: '/weex_list',
                meta: {
                    title: ''
                },
                component: (resolve) => require(['./views/weex/list_publish.vue'], resolve),
            },
            {
                path: '/weex_publish',
                meta: {
                    title: ''
                },
                component: (resolve) => require(['./views/weex/upload.vue'], resolve),
            },
             
        ]
    }
];
export default routers;