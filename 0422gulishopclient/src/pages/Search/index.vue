<template>
  <div>
    <!-- Search params: {{ $route.params.keyWord }} query:{{
      $route.query.keyWord
    }}
    easy params:{{ keyWord }} easy query:{{ keyWord2 }} -->
    <Type-nav></Type-nav>
  </div>
</template>

<script>
export default {
  //路由设置那边的props属性如果为true的话,params里面传过来的值,会用props接收到

  props: ['keyWord', 'keyWord2'],
  name: 'Search',
};
</script>

<style lang="less" scoped></style>
