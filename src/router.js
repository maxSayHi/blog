const routers = [
  {
      path: '/blog/',
      meta: {
          title: ''
      },
      component: (resolve) => require(['./components/BlogHome'], resolve)
  },
  {
    path: '/blog/:slug',
    meta: {
        title: ''
    },
    component: (resolve) => require(['./components/BlogPost'], resolve)
}
];
export default routers;