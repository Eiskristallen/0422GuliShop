<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <!-- 判断路由对象在那个组件,如果该组件不显示footer,则隐藏footer组件(比如login) -->
    <!-- <Footer
      v-if="$route.path !== '/Login' || $route.path === '/Search'"
    ></Footer> -->
    <!-- 从meta里面拿配置的布尔值,用来控制footer是否显示 -->
    <Footer v-if="!$route.meta.isHide"></Footer>
  </div>
</template>
<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
};
</script>
<style scoped></style>
