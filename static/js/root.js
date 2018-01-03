
var router=new VueRouter({
    routes:[
        {path:'/', component:index},
        {
            path:'/add',
            component:add
        },
        {
            path:'/edit/:id',
            component:edit
        }
    ]
})
var root=new Vue({
    el:'#root',
    router,
})