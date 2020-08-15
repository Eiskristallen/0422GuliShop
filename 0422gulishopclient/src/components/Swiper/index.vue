<template>
  <div class="swiper-container" id="mySwiper" ref="banner">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="banner of bannerList" :key="banner.id">
        <img :src="banner.imgUrl" />
      </div>
      <!-- <div class="swiper-slide">
              <img src="./images/banner2.jpg" />
            </div>
            <div class="swiper-slide">
              <img src="./images/banner3.jpg" />
            </div>
            <div class="swiper-slide">
              <img src="./images/banner4.jpg" />
            </div> -->
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import swiper from 'swiper';
export default {
  name: 'Swiper',
  props: ['bannerList'],
  watch: {
    bannerList: {
      immediate: true,
      handler(newVal, oldVal) {
        this.$nextTick(() => {
          // 等待页面最近的一次更新后,调用里面的回调
          //当watch发现bannerList数据传过来之后,nextTick会等到上面的
          //for循环吧所有的dom元素加载之后在调用new Swiper,这样就确保new Swiper的时候所有架构都已经加载完毕

          new swiper(this.$refs.banner, {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            //检查父元素加载是否完成
            // observer: true,
            // observeParents: true,
            //       er:true,//修改swiper自己或子元素时，自动初始化swiper
            // observeParents:true,//修改swiper的父元素时，自动初始化swiper

            // 如果需要滚动条
          });
        });
      },
    },
  },
};
</script>

<style lang="less" scoped></style>
