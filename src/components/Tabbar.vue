<template>
  <div>
    <van-tabbar v-model="active" @change="onChange" active-color="#3bba63">
      <van-tabbar-item v-for="(item,index) in menuList" :key="index">
        <van-icon class="iconfont" class-prefix="icon" :name="item.icon"></van-icon>
        <span class="menuName">{{item.name}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      menuList:[{icon:'home',name:'首页',routeName:'home'},{icon:'category',name:'分类',routeName:'category'},{icon:'eat',name:'吃什么',routeName:'eat'},{icon:'cart',name:'购物车',routeName:'cart'},{icon:'mine',name:'我的',routeName:'mine'}]
    };
  },
  methods: {
    onChange(active) {
      this.$router.push({name:this.menuList[active].routeName})
    }
  }
};
</script>
<style scoped>
.menuName{
    margin-top: 3px;
    display: block;
    font-size: 8px;
}
</style>