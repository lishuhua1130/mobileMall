<template>
    <div>
        <div>main容器</div>
        <router-view/>
    </div>
</template>
<script>
export default {
    name:'Main',
    data(){
        return{

        }
    },
    created(){
        this.initData()
    },
    methods:{
        initData(){
            console.log('数据初始化')
            this.getRequest('homeApi').then(res=>{
                console.log('获取homeApi数据',res)
            })
        }
    }
}
</script>