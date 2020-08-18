<template>
  <div>
    <Type-nav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-show="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <li class="with-x" v-show="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <li class="with-x" v-show="searchParams.trademark">
              {{
                (searchParams.trademark ? searchParams.trademark : '').split(
                  ':'
                )[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            <li
              class="with-x"
              v-for="(item, index) of searchParams.props"
              :key="index"
              @click="removeProps(index)"
            >
              {{ item.split(':')[1] }}<i>×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <!-- 自定义事件解决通信问题,子组件返回按品牌搜索的信息过来 -->
        <SearchSelector
          @searchByBrand="searchByBrand"
          @searchByAttr="searchByAttr"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: orderId === '1' }">
                  <a href="javascript:;" @click="changeOrder('1')">
                    <i
                      class="iconfont"
                      :class="{
                        iconup: orderType === 'asc',
                        icondown: orderType === 'desc',
                      }"
                      v-if="orderId === '1'"
                    ></i>
                    综合</a
                  >
                </li>
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li :class="{ active: orderId === '2' }">
                  <a href="javascript:;" @click="changeOrder('2')">
                    <i
                      class="iconfont"
                      :class="{
                        iconup: orderType === 'asc',
                        icondown: orderType === 'desc',
                      }"
                      v-if="orderId === '2'"
                    ></i>
                    价格
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good of goodList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`Detail/${good.id}`">
                      <img :src="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="good.title">{{
                      good.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
              <!-- <li class="yui3-u-1-5">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/mobile02.png" />
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-5">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/mobile03.png" />
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-5">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/mobile04.png" />
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-5">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/mobile05.png" />
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-5">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/mobile06.png" />
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-5">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/mobile01.png" />
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-5">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/mobile02.png" />
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-5">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/mobile03.png" />
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-5">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/mobile04.png" />
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li> -->
            </ul>
          </div>
          <!-- 传入当前页和总数据量,和每页显示的数量 -->
          <Pagination
            :currentPageNum="searchParams.pageNo"
            :total="GoodList.total"
            :pageSize="searchParams.pageSize"
            :continueSize="3"
            @changePageNum="changePageNum"
          ></Pagination>
          <!-- <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted"><span>...</span></li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div><span>共10页&nbsp;</span></div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector';
import { mapGetters, mapState } from 'vuex';

export default {
  data() {
    return {
      //初始化用户搜索参数,里面放的是所有用户可能搜索的所有条件,但是初始为空
      searchParams: {
        category1id: '',
        category2id: '',
        category3id: '',
        categoryName: '',
        keyword: '',
        order: '2:desc',
        pageNo: 6,
        pageSize: 2,
        props: [],
        trademark: '',
      },
    };
  },
  name: 'Search',
  //根据类别和关键字搜索(当用户是从三级分类或者搜索东西来到search页面,这样就已经带有参数了,这时候要获取到这些参数)
  //beforeMount用来同步处理数据(参数)
  beforeMount() {
    //拿去路由当中的keyword和相关的类别名称和ID获取到添加到searchParams当中
    // let { keyWord } = this.$route.params;
    // let {
    //   categoryName,
    //   category1Id,
    //   category2Id,
    //   category3Id,
    // } = this.$route.query;
    // //解包上面的搜索参数,然后把这些东西添加进去直接覆盖
    // let searchParams = {
    //   ...this.searchParams,
    //   keyword: keyWord,
    //   categoryName,
    //   category1Id,
    //   category2Id,
    //   category3Id,
    // };
    // //如果这个参数是的空对象,就没必要,直接不搞
    // //节省带宽,如果searchParams里面某个属性是空串,直接删了
    // Object.keys(searchParams).forEach((item) => {
    //   if (searchParams[item] === '') {
    //     delete searchParams[item];
    //   }
    // });
    // //把搜索后的参数变为处理过的这个对象
    // this.searchParams = searchParams;
    this.handleSearchParams();
  },
  //这个搜索请求只有第一次跳转到search页面的时候会发请求,因为mounted之执行一次
  //所以为了解决后续在search页面搜索的问题,要用watch监视$route对象,如果搜索的
  //params和query变了,则重新获取搜索参数然后再发一次请求
  mounted() {
    //用户传过来的search参数
    this.getInfor();
  },

  methods: {
    changePageNum(page) {
      this.searchParams.pageNo = page;
      this.getInfor();
    },
    //点击综合或价格排序的切换方法
    changeOrder(orderId) {
      let originOrderId = this.searchParams.order.split(':')[0];
      let originOrderType = this.searchParams.order.split(':')[1];

      let newOrderId = '';
      //如果这俩相等,代表点的还是原来的标签
      if (orderId === originOrderId) {
        //此时只需要改变排序类型
        newOrderId = `${orderId}:${
          originOrderType === 'desc' ? 'asc' : 'desc'
        }`;
      } else {
        //代表点击的不是原来的标签,需要根据传过来的orderID改变要排序的类型,后面的排序类型默认为降序
        newOrderId = `${orderId}:desc`;
      }
      this.searchParams.order = newOrderId;
      this.getInfor();
    },
    getInfor() {
      this.$store.dispatch('getGoodListInfo', this.searchParams);
    },

    searchByAttr(attr, attrValue) {
      this.searchParams.pageNo = 1;
      // if (
      //   this.searchParams.props.some(
      //     (item) => item === `${attr.attrId}:${attrValue}:${attr.attrName}`
      //   )
      // )
      //   return;
      if (
        !!!this.searchParams.props.indexOf(
          (item) => item === `${attr.attrId}:${attrValue}:${attr.attrName}`
        )
      )
        return;

      this.searchParams.props.push(
        //判断props中是否存在已经点击这个属性的值
        `${attr.attrId}:${attrValue}:${attr.attrName}`
      );
      this.handleSearchParams();
    },

    searchByBrand(trademark) {
      this.searchParams.pageNo = 1;
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.handleSearchParams();
    },
    handleSearchParams() {
      let { keyWord } = this.$route.params;
      let {
        categoryName,
        category1id,
        category2id,
        category3id,
      } = this.$route.query;

      //解包上面的搜索参数,然后把这些东西添加进去直接覆盖
      let searchParams = {
        ...this.searchParams,
        keyword: keyWord,
        categoryName,
        category1id,
        category2id,
        category3id,
      };

      //如果这个参数是的空对象,就没必要,直接不搞
      //节省带宽,如果searchParams里面某个属性是空串,直接删了
      Object.keys(searchParams).forEach((item) => {
        if (searchParams[item] === '') {
          delete searchParams[item];
        }
      });
      //把搜索后的参数变为处理过的这个对象
      this.searchParams = searchParams;
      this.getInfor();
    },
    removeCategoryName() {
      this.searchParams.pageNo = 1;
      //删除上面的面包线内容
      this.searchParams.categoryName = '';
      this.handleSearchParams();
      this.$router.replace({ name: 'Search', params: this.$route.params });
    },
    //删除上面的属性选择结果
    removeProps(index) {
      this.searchParams.pageNo = 1;
      //直接从props数组里面移除index位置的数据
      this.searchParams.props.splice(index, 1);
      this.handleSearchParams();
    },
    removeKeyword() {
      this.searchParams.pageNo = 1;
      this.$bus.$emit('clearKeyWord');
      //删除面包线当中的关键字
      this.searchParams.keyword = '';
      this.handleSearchParams();
      this.$router.replace({ name: 'Search', query: this.$route.query });
    },
    removeTrademark() {
      this.searchParams.pageNo = 1;
      //删除面包线里面的品牌
      this.searchParams.trademark = '';
      this.handleSearchParams();
    },
  },
  components: {
    SearchSelector,
  },

  computed: {
    ...mapState({
      GoodList: (state) => state.search.goodListInfo,
    }),
    ...mapGetters(['goodList']),
    orderId() {
      return this.searchParams.order.split(':')[0];
    },
    orderType() {
      return this.searchParams.order.split(':')[1];
    },
  },
  watch: {
    $route() {
      //重复度太高,封装个函数做
      // let { keyWord } = this.$route.params;
      // let {
      //   categoryName,
      //   category1Id,
      //   category2Id,
      //   category3Id,
      // } = this.$route.query;
      // //解包上面的搜索参数,然后把这些东西添加进去直接覆盖
      // let searchParams = {
      //   ...this.searchParams,
      //   keyword: keyWord,
      //   categoryName,
      //   category1Id,
      //   category2Id,
      //   category3Id,
      // };
      // //如果这个参数是的空对象,就没必要,直接不搞
      // //节省带宽,如果searchParams里面某个属性是空串,直接删了
      // Object.keys(searchParams).forEach((item) => {
      //   if (searchParams[item] === '') {
      //     delete searchParams[item];
      //   }
      // });
      // //把搜索后的参数变为处理过的这个对象
      // this.searchParams = searchParams;
      // this.getInfor();

      this.handleSearchParams();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
