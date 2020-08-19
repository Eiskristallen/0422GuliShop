<template>
  <div class="spec-preview">
    <img :src="defaultImage.imgUrl" />
    <!--  专门用来触发鼠标移动事件的div -->
    <div class="event" @mousemove="move"></div>
    <!-- 侧面的大图 -->
    <div class="big">
      <img :src="defaultImage.imgUrl" ref="bigImg" />
    </div>

    <!-- 鼠标移入大图的模板层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    //接受imageList传过来的index,改变上面的图片
    //全局事件总线,传过来的index是那边点击小图的index
    this.$bus.$on('changeDefaultIndex', this.changeDefaultIndex);
  },
  name: 'Zoom',
  props: ['imgList'],
  data() {
    return {
      defaultIndex: 0,
    };
  },
  methods: {
    //大图鼠标移动事件
    move(event) {
      let bigImg = this.$refs.bigImg;

      let mask = this.$refs.mask; //拿到mask
      let mouseX = event.offsetX; //offset位置是鼠标相对于包含元素的位置
      let mouseY = event.offsetY;
      let maskX = mouseX - mask.offsetWidth / 2; //真正需要的长度是offsetX减去包含元素宽度的一半
      let maskY = mouseY - mask.offsetHeight / 2;
      //卡临界值(要在设置之前)
      if (maskX < 0) {
        maskX = 0;
      } else if (maskX > mask.offsetWidth) {
        maskX = mask.offsetWidth;
      }
      if (maskY < 0) {
        maskY = 0;
      } else if (maskY > mask.offsetHeight) {
        maskY = mask.offsetHeight;
      }
      mask.style.left = maskX + 'px';
      mask.style.top = maskY + 'px';
      bigImg.style.left = -2 * maskX + 'px';
      bigImg.style.top = -2 * maskY + 'px';
    },
    changeDefaultIndex(index) {
      this.defaultIndex = index;
    },
  },
  computed: {
    defaultImage() {
      //数据传输要时间,如果a.b.c的形式拿取数据可能在拿去后面的数据的时候a还没有回来,所以会报错
      //a的数据可能一下就回来了,所以后续的页面还是会正常显示,但是错误已经出现了,所以说是假报错
      //拿到imgList后处理一波,直接拿到图片对象,避免上面出现a.b.c的假报错
      return this.imgList[this.defaultIndex] || {};
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
