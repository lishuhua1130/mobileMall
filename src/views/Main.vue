<template>
    <div>
        <!-- 页面全部进行缓存 -->
        <keep-alive>
            <router-view/>
        </keep-alive>
        <Tabbar></Tabbar>
    </div>
</template>
<script>
import Tabbar from '@/components/Tabbar'
export default {
    name:'Main',
    components:{
        Tabbar
    },
    data(){
        return{

        }
    }
}
</script>