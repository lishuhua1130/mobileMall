<template>
    <div>首页</div>
</template>
<script>
export default {
    name:'home',
    created(){
        this.initData()
    },
    methods:{
        initData(){
            this.getRequest('homeApi').then(res=>{
                console.log('获取homeApi数据',res)
            })
        }
    }
}
</script>