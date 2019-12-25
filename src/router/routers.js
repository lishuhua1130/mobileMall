export default [
    {
        path:'/',
        name:'main',
        redirect:'/home',
        component:()=>import('@/views/Main.vue'),
        children:[
            {
                path:'/home',
                name:'home',
                component:()=>import('@/views/home/Home.vue')
            }
        ]
    }
]