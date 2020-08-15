<template>
  <div>
    <Type-nav></Type-nav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <!-- 写一个floor,然后用数据遍历 -->
    <Floor v-for="floor of floorList" :key="floor.id" :floor="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
//引入listContariner
import ListContainer from './ListContainer';
import Recommend from './Recommend';
import Rank from './Rank';
import Like from './Like';
import Floor from './Floor';
import Brand from './Brand';
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  name: 'Home',
  mounted() {
    this.getCategoryList();
    // this.getBannerList();
    this.getFloorList();
  },
  methods: {
    getCategoryList() {
      this.$store.dispatch('getCategoryList');
    },
    // getBannerList() {
    //   this.$store.dispatch('getbannerList');
    // },
    getFloorList() {
      this.$store.dispatch('getfloorList');
    },
  },
};
</script>

<style lang="less" scoped></style>
