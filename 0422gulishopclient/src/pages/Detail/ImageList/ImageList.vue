<template>
  <div class="swiper-container" ref="imgList">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(image, index) of imgList"
        :key="image.id"
      >
        <!-- 单击某一张图片,把Index赋值给defaultIndex,然后如果当前图片的index等于defaultIndex
      ,则给一个active类,这样可以实现单击某一个图片则变成选中状态-->
        <img
          :src="image.imgUrl"
          :class="{ active: index === defaultIndex }"
          @click="changeDefaultIndex(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import swiper from 'swiper';
export default {
  data() {
    return {
      defaultIndex: 0,
    };
  },

  methods: {
    changeDefaultIndex(index) {
      this.defaultIndex = index;

      this.$bus.$emit('changeDefaultIndex', index);
    },
  },
  props: ['imgList'],
  name: 'ImageList',
  watch: {
    imgList: {
      immediate: true,
      handler(newVal, oldVal) {
        this.$nextTick(() => {
          // 等待页面最近的一次更新后,调用里面的回调
          //当watch发现bannerList数据传过来之后,nextTick会等到上面的
          //for循环吧所有的dom元素加载之后在调用new Swiper,这样就确保new Swiper的时候所有架构都已经加载完毕

          new swiper(this.$refs.imgList, {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项
            slidesPerView: 5,
            slidesPerGroup: 5,
            // 如果需要分页器

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

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      // &:hover {
      //   border: 2px solid #f60;
      //   padding: 1px;
      // }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
