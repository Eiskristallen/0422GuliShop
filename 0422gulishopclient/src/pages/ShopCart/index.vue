<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart of shopCartList" :key="cart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked === 1"
              @click="updateSingle(cart)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <!-- 当改变购物车里面商品的数量,要发送请求调用函数,加减和输入框都要调用这个方法,参数要传改变的数量和cart对象-->
            <a
              href="javascript:void(0)"
              class="mins"
              @click="upDateCartNum(cart, -1)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="upDateCartNum(cart, +$event.target.value)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="upDateCartNum(cart, 1)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ +cart.skuPrice * +cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCart(cart)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isCheckAll" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ checkedNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/Trade" class="sum-btn" target="_blank"
            >结算</router-link
          >
          <!-- <a class="sum-btn" href="###" target="_blank">结算</a> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'ShopCart',
  mounted() {
    this.getShopCartList();
  },
  methods: {
    async updateSingle(cart) {
      await this.$store.dispatch('updateIsChecked', {
        skuId: cart.skuId,
        isChecked: cart.isChecked === 1 ? 0 : 1,
      });
      this.getShopCartList();
    },
    async deleteCart(cart) {
      try {
        await this.$store.dispatch('deleteCart', cart.skuId);
        this.getShopCartList();
      } catch (error) {}
    },

    getShopCartList() {
      this.$store.dispatch('getShopCart');
    },
    async deleteAllChecked() {
      try {
        await this.$store.dispatch('deleteAllChecked');
        this.getShopCartList();
      } catch (error) {}
    },
    async upDateCartNum(cart, num) {
      //判断原数量
      //确保你减少的数量不能大于已有的数量
      if (cart.skuNum + num < 1) {
        disNum = 1 - cart.skuNum;
      }
      try {
        await this.$store.dispatch('addOrUpdateShoppingCart', {
          skuId: cart.skuId,
          skuNum: num,
        });
        this.getShopCartList(); //修改数量,然后再次发送请求
      } catch (error) {
        alert(error);
      }

      //发送请求去修改数量
    },
  },
  computed: {
    ...mapState({ shopCartList: (state) => state.shopCart.shopCartList }),
    isCheckAll: {
      get() {
        if (this.shopCartList.length === 0) return;
        //如果每个check都选中了,返回true
        return this.shopCartList.every((item) => {
          return item.isChecked === 1;
        });
      },
      async set(isCheckAll) {
        try {
          await this.$store.dispatch('updateAllChecked', isCheckAll ? 1 : 0);
          this.getShopCartList();
        } catch (error) {}
      },
    },
    checkedNum() {
      return this.shopCartList.reduce((a, c) => {
        if (c.isChecked === 1) {
          a += c.skuNum;
        }
        return a;
      }, 0);
    },
    cartCheckedNum: {
      get() {
        return this.shopCartList.reduce((a, c) => {
          a += +c.isChecked;

          return a;
        }, 0);
      },
      set() {},
    },

    totalPrice() {
      return this.shopCartList.reduce((a, c) => {
        if (c.isChecked === 1) {
          a += c.skuNum * c.skuPrice;
        }
        return a;
      }, 0);
    },
  },
  watch: {
    // cartCheckedNum() {
    //   this.checkedNum === this.shopCartList.length ? alert(12) : alert(123);
    // },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
